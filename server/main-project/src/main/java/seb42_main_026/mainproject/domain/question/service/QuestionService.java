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

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionService {
    private final MemberService memberService;
    private final QuestionRepository questionRepository;

    // Todo: 태그, 이미지 파일 저장 추가
    public Question createQuestion(Question question) {
        // 가입된 회원인지 체크
        memberService.findVerifiedMember(question.getMember().getMemberId());

        return questionRepository.save(question);
    }

//    public Question updateQuestion(Question question) {
//
//    }
//
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
        List<Question> myQuestions = questionRepository.findMyQuestions(memberId);

        return new PageImpl<>(myQuestions, PageRequest.of(page, size), myQuestions.size());
    }

//    public void deleteQuestion(long questionId) {
//
//    }

    public Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion =
                questionRepository.findById(questionId);

        return optionalQuestion.orElseThrow(() ->
                new CustomException(ExceptionCode.QUESTION_NOT_FOUND));
    }
}
