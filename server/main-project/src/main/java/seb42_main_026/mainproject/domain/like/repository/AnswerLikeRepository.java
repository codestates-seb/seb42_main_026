package seb42_main_026.mainproject.domain.like.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.like.entity.AnswerLike;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.entity.Question;

public interface AnswerLikeRepository extends JpaRepository<AnswerLike, Long> {
    AnswerLike findByAnswerAndMember(Answer answer, Member member);
    boolean existsByAnswerAndMember(Answer answer, Member member);
}
