package seb42_main_026.mainproject.domain.question.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import seb42_main_026.mainproject.domain.question.entity.Question;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
//    @Query("SELECT q FROM Question q ORDER BY q.likeCount DESC")
//    List<Question> findPopularQuestions();

    // 홈에서 인기 질문 목록 조회(좋아요 순, 동점일 때는 오래된 순, 10개만 조회)
    List<Question> findTop10ByOrderByLikeCountDescQuestionIdAsc();

    // 마이페이지에서 자신이 작성한 질문 목록 조회(최신 순, 페이지네이션)
    @Query("SELECT q FROM Question q WHERE q.member.memberId = :memberId ORDER BY q.questionId DESC")
    List<Question> findMyQuestions(long memberId);

    // 게시판에서 태그에 맞는 질문 목록 조회(최신 순, 페이지네이션)
    @Query("SELECT q FROM Question q WHERE q.tag = :tag ORDER BY q.questionId DESC")
    List<Question> findQuestionsByTag(Question.Tag tag);
}
