package seb42_main_026.mainproject.domain.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
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

    public Question createQuestion(Question question, MultipartFile questionImage) {
        // 로그인된 회원인지 체크
        memberService.verifyLoginMember(question.getMember().getMemberId());

        // 이미지가 있으면 저장
        if (questionImage != null) {
            storeQuestionImage(question, questionImage);
        }

        // 잔소리 요청글 20점 부여
        memberService.updateScore(question.getMember().getMemberId(), 20L);

        return questionRepository.save(question);
    }

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
            storeQuestionImage(question, questionImage);
        }

        // 질문 수정
        customBeanUtils.copyNonNullProperties(question, foundQuestion);
    }

    // 특정 질문 조회
    @Transactional(readOnly = true)
    public Question findQuestion(long questionId) {
        return findVerifiedQuestion(questionId);
    }

    // 홈에서 인기 질문 목록 조회(좋아요 순, 동점일 때는 답변 개수 순, 10개만 조회)
    @Transactional(readOnly = true)
    public List<Question> findQuestionsAtHome() {
        return questionRepository.findTop10ByOrderByLikeCountDescAnswerCountDesc();
    }

    // 게시판에서 질문 목록 조회(최신 순, 페이지네이션)
    @Transactional(readOnly = true)
    public Page<Question> findQuestionsAtBoard(int page, int size, Question.Tag tag, String searchKeyword) {
        // 태그가 있으면 태그에 맞는 질문 목록만 조회
        if (tag != null) {
            return questionRepository.findByTag(tag, PageRequest.of(page, size, Sort.by("questionId").descending()));
        }

        // 검색 키워드가 있으면 키워드에 맞는 질문 목록만 조회
        if (searchKeyword != null) {
            return questionRepository.findByTitleContaining(searchKeyword, PageRequest.of(page, size, Sort.by("questionId").descending()));
        }

        // 태그가 없으면 모든 질문 목록 조회
        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    // 마이페이지에서 자신이 작성한 질문 목록 조회(최신 순, 페이지네이션)
    @Transactional(readOnly = true)
    public Page<Question> findQuestionsAtMyPage(long memberId, int page, int size) {
        // 로그인된 회원인지 체크
        memberService.verifyLoginMember(memberId);

        return questionRepository.findByMember_MemberId(memberId, PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    public void deleteQuestion(long questionId, long memberId) {
        // 로그인된 회원인지 체크
        memberService.verifyLoginMember(memberId);

        // 삭제 대상 질문
        Question foundQuestion = findVerifiedQuestion(questionId);

        // 자신의 질문만 삭제 가능
        memberService.verifyMemberByMemberId(foundQuestion.getMember().getMemberId(), memberId);

        // DB에서 삭제
        questionRepository.delete(foundQuestion);
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

    private void storeQuestionImage(Question question, MultipartFile questionImage) {
        // 파일명을 인코딩(중복 방지)
        String encodedFileName = s3StorageService.encodeFileName(questionImage);
        // 파일 URL을 저장
        question.setQuestionImageUrl(s3StorageService.getFileUrl(encodedFileName));
        // S3 버킷에 해당 이미지 저장
        s3StorageService.imageStore(questionImage, encodedFileName);
    }
}
