package seb42_main_026.mainproject.domain.question.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seb42_main_026.mainproject.domain.question.entity.Question;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    // 홈에서 인기 질문 목록 조회(좋아요 순, 동점일 때는 오래된 순, 10개만 조회)
    List<Question> findTop10ByOrderByLikeCountDescQuestionIdAsc();

    // 마이페이지에서 자신이 작성한 질문 목록 조회(최신 순, 페이지네이션)
    Page<Question> findByMember_MemberId(long memberId, Pageable pageable);

    // 게시판에서 태그에 맞는 질문 목록 조회(최신 순, 페이지네이션)
    Page<Question> findByTag(Question.Tag tag, Pageable pageable);

    // 게시판에서 제목에 키워드가 포함된 질문 목록 조회(최신 순, 페이지네이션)
    Page<Question> findByTitleContaining(String searchKeyword, Pageable pageable);
}
