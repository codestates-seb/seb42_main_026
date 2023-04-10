package seb42_main_026.mainproject.domain.like.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_main_026.mainproject.domain.like.entity.QuestionLike;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.entity.Question;

public interface QuestionLikeRepository extends JpaRepository<QuestionLike, Long> {
    QuestionLike findByQuestionAndMember(Question question, Member member);
    boolean existsByQuestionAndMember(Question question, Member member);
}
