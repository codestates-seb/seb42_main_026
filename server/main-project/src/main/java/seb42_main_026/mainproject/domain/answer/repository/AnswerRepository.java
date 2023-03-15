package seb42_main_026.mainproject.domain.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_main_026.mainproject.domain.answer.entity.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
