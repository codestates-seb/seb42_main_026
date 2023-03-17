package seb42_main_026.mainproject.domain.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    // Todo: 이미지 파일 저장
    public Question createQuestion(Question question) {
        // 로그인된 회원인지 체크
        memberService.verifyLoginMember(question.getMember().getMemberId());

//        question.getMember().getScore().setScore(
//                question.getMember().getScore().getScore() + 20); // 기존 점수를 가져와 20점 추가

        // 잔소리 요청글 20점 부여
        memberService.updateScore(question.getMember().getMemberId(), 20L);

        return questionRepository.save(question);
    }

    // Todo: 이미지 파일 수정
    public void updateQuestion(Question question) {
        // 로그인된 회원인지 체크
        memberService.verifyLoginMember(question.getMember().getMemberId());

        // 수정 대상 질문
        Question foundQuestion = findVerifiedQuestion(question.getQuestionId());

        // 자신의 질문만 수정 가능
        memberService.verifyMemberByMemberId(foundQuestion.getMember().getMemberId(),
                question.getMember().getMemberId());

        // 갱생 완료 상태일 때는 수정 불가능
        verifyQuestionStatus(foundQuestion);

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
    public Page<Question> findQuestionsAtBoard(int page, int size) {
        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

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
