package seb42_main_026.mainproject.domain.like.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_main_026.mainproject.domain.like.entity.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {
}
