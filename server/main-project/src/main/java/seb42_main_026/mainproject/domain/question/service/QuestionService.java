package seb42_main_026.mainproject.domain.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import seb42_main_026.mainproject.cloud.service.S3StorageService;
import seb42_main_026.mainproject.domain.member.service.MemberService;
import seb42_main_026.mainproject.domain.question.entity.Question;
import seb42_main_026.mainproject.domain.question.repository.QuestionRepository;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
import seb42_main_026.mainproject.utils.CustomBeanUtils;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionService {
    private final MemberService memberService;
    private final QuestionRepository questionRepository;
    private final CustomBeanUtils<Question> customBeanUtils;
    private final S3StorageService s3StorageService;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    // Todo: 이미지 파일 저장
    public Question createQuestion(Question question, MultipartFile questionImage) {
        // 로그인된 회원인지 체크
        memberService.verifyLoginMember(question.getMember().getMemberId());

        // 이미지가 있으면 저장
        if (questionImage != null) {
            // 해당 이미지의 S3 버킷 URL을 Question 테이블에 저장
            String fileName = questionImage.getOriginalFilename();
            question.setQuestionImageUrl("https://" + bucketName + ".s3.ap-northeast-2.amazonaws.com/" + fileName);

            // S3 버킷에 해당 이미지 저장
            s3StorageService.store(questionImage);
        }

        // 잔소리 요청글 20점 부여
        memberService.updateScore(question.getMember().getMemberId(), 20L);

        return questionRepository.save(question);
    }

    // Todo: 이미지 파일 수정
    public void updateQuestion(Question question, MultipartFile questionImage) {
        // 로그인된 회원인지 체크
        memberService.verifyLoginMember(question.getMember().getMemberId());

        // 수정 대상 질문
        Question foundQuestion = findVerifiedQuestion(question.getQuestionId());

        // 자신의 질문만 수정 가능
        memberService.verifyMemberByMemberId(foundQuestion.getMember().getMemberId(),
                question.getMember().getMemberId());

        // 갱생 완료 상태일 때는 수정 불가능
        verifyQuestionStatus(foundQuestion);

        // 이미지가 있으면 저장
        if (questionImage != null) {
            // 수정하고 싶은 이미지의 S3 버킷 URL로 기존 URL을 교체
            String fileName = questionImage.getOriginalFilename();
            question.setQuestionImageUrl("https://" + bucketName + ".s3.ap-northeast-2.amazonaws.com/" + fileName);

            // S3 버킷에 해당 이미지 저장
            s3StorageService.store(questionImage);
        }

        // 질문 수정
        customBeanUtils.copyNonNullProperties(question, foundQuestion);
    }

    // 특정 질문 조회
    public Question findQuestion(long questionId) {
        return findVerifiedQuestion(questionId);
    }

    // 홈에서 인기 질문 목록 조회(좋아요 순, 동점일 때는 오래된 순, 10개만 조회)
    public List<Question> findQuestionsAtHome() {
        return questionRepository.findTop10ByOrderByLikeCountDescQuestionIdAsc();
    }

    // 게시판에서 질문 목록 조회(최신 순, 페이지네이션)
    public Page<Question> findQuestionsAtBoard(int page, int size, Question.Tag tag) {
        // 태그가 있으면 태그에 맞는 질문 목록만 조회
        if (tag != null) {
            List<Question> taggedQuestions = questionRepository.findQuestionsByTag(tag);

            return new PageImpl<>(taggedQuestions, PageRequest.of(page, size), taggedQuestions.size());
        }
        // 태그가 없으면 모든 질문 목록 조회
        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    // 게시판에서 태그에 맞는 질문 목록 조회(최신 순, 페이지네이션)
//    public Page<Question> findQuestionsAtBoardByTag(int page, int size, Question.Tag tag) {
//        List<Question> taggedQuestions = questionRepository.findQuestionsByTag(tag);
//
//        return new PageImpl<>(taggedQuestions, PageRequest.of(page, size), taggedQuestions.size());
//    }

    // 마이페이지에서 자신이 작성한 질문 목록 조회(최신 순, 페이지네이션)
    public Page<Question> findQuestionsAtMyPage(long memberId, int page, int size) {
        // 로그인된 회원인지 체크
        memberService.verifyLoginMember(memberId);

        List<Question> myQuestions = questionRepository.findMyQuestions(memberId);

        return new PageImpl<>(myQuestions, PageRequest.of(page, size), myQuestions.size());
    }

    public void deleteQuestion(long questionId, long memberId) {
        // 로그인된 회원인지 체크
        memberService.verifyLoginMember(memberId);

        // 삭제 대상 질문
        Question foundQuestion = findVerifiedQuestion(questionId);

        // 자신의 질문만 삭제 가능
        memberService.verifyMemberByMemberId(foundQuestion.getMember().getMemberId(), memberId);

        // DB에서 삭제
        questionRepository.deleteById(questionId);
    }

    public Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion =
                questionRepository.findById(questionId);

        return optionalQuestion.orElseThrow(() ->
                new CustomException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    private void verifyQuestionStatus(Question question) {
        if (question.getQuestionStatus().equals(Question.QuestionStatus.QUESTION_COMPLETE)) {
            throw new CustomException(ExceptionCode.ALREADY_COMPLETED_QUESTION);
        }
    }
}
