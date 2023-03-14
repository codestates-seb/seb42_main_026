package seb42_main_026.mainproject.domain.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 12d2c58 (Feat: 게시글 조회 기능 구현(마이페이지))
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
=======
>>>>>>> 954e762 (Feat: 게시글 조회 기능 구현(홈))
=======
import org.springframework.data.domain.PageRequest;
>>>>>>> bbf2a8d (Feat: 게시글 조회 기능 구현(게시판))
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb42_main_026.mainproject.domain.member.service.MemberService;
import seb42_main_026.mainproject.domain.question.entity.Question;
import seb42_main_026.mainproject.domain.question.repository.QuestionRepository;
<<<<<<< HEAD
<<<<<<< HEAD
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
=======
import seb42_main_026.mainproject.domain.tag.Tag;
>>>>>>> d1bc2d9 (Refactor: API 명세서 내용에 맞게 createQuestion 리팩토링)
=======
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
>>>>>>> 954e762 (Feat: 게시글 조회 기능 구현(홈))

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
<<<<<<< HEAD
    public Question findQuestion(long questionId) {
        return findVerifiedQuestion(questionId);
    }
=======
//    public Question findQuestion(long questionId) {
//        return findVerifiedQuestion(questionId);
//    }
>>>>>>> 954e762 (Feat: 게시글 조회 기능 구현(홈))

    // 홈에서 인기 질문 목록 조회(좋아요 순, 10개만)
    public List<Question> findQuestionsAtHome() {
        return questionRepository.findPopularQuestions();
    }

    // 게시판에서 질문 목록 조회(최신 순, 페이지네이션)
<<<<<<< HEAD
<<<<<<< HEAD
    public Page<Question> findQuestionsAtBoard(int page, int size) {
        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    // 마이페이지에서 자신이 작성한 질문 목록 조회(최신 순, 페이지네이션)
    public Page<Question> findQuestionsAtMyPage(long memberId, int page, int size) {
        List<Question> myQuestions = questionRepository.findMyQuestions(memberId);

        return new PageImpl<>(myQuestions, PageRequest.of(page, size), myQuestions.size());
    }
<<<<<<< HEAD
=======
//    public Page<Question> findQuestionsAtBoard(int page, int size) {
//
//    }
=======
    public Page<Question> findQuestionsAtBoard(int page, int size) {
        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }
>>>>>>> bbf2a8d (Feat: 게시글 조회 기능 구현(게시판))

    // 마이페이지에서 자신이 작성한 질문 목록 조회(최신 순, 페이지네이션)
//    public Page<Question> findQuestionsAtMyPage(long memberId, int page, int size) {
//
//    }
>>>>>>> 954e762 (Feat: 게시글 조회 기능 구현(홈))
=======
>>>>>>> 12d2c58 (Feat: 게시글 조회 기능 구현(마이페이지))

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
