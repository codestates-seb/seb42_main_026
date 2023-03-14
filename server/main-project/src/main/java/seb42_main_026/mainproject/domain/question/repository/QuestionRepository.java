package seb42_main_026.mainproject.domain.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seb42_main_026.mainproject.domain.question.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
