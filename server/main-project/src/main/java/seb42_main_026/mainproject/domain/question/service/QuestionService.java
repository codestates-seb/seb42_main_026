package seb42_main_026.mainproject.domain.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb42_main_026.mainproject.domain.question.entity.Question;
import seb42_main_026.mainproject.domain.question.repository.QuestionRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    // Todo: 이미지 파일 저장 추가
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question) {

    }

    // 특정 질문 조회
    public Question findQuestion(long questionId) {

    }

    // 마이페이지에서 자신이 작성한 질문 목록 조회
    public List<Question> findQuestionsOfMember(long memberId) {

    }

    // 홈에서 인기글 목록 조회
    public List<Question> findQuestionsAtHome() {

    }

    // 게시판에서 질문 목록 조회
    public Page<Question> findQuestionsAtBoard(int page, int size) {

    }

    public void deleteQuestion(long questionId) {

    }

    private Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion =
                questionRepository.findById(questionId);

        return optionalQuestion.orElseThrow(() ->
                new RuntimeException("QUESTION_NOT_FOUND"));
    }
}
