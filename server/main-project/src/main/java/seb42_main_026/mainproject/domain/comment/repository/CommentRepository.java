package seb42_main_026.mainproject.domain.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_main_026.mainproject.domain.comment.entity.Comment;

public interface CommentRepository extends JpaRepository <Comment, Long> {
}
