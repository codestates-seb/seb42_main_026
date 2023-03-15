package seb42_main_026.mainproject.domain.question.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import seb42_main_026.mainproject.domain.question.entity.Question;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    // 홈에서 인기 질문 목록 조회(좋아요 순, 10개만)
    @Query(value = "SELECT * FROM QUESTION ORDER BY like_count DESC LIMIT 10", nativeQuery = true)
    List<Question> findPopularQuestions();

    // 마이페이지에서 자신이 작성한 질문 목록 조회(최신 순, 페이지네이션)
    @Query(value = "SELECT * FROM QUESTION WHERE member_id = :memberId", nativeQuery = true)
    List<Question> findMyQuestions(long memberId);
}