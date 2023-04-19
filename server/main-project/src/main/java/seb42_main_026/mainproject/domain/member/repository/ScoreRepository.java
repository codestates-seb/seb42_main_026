package seb42_main_026.mainproject.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_main_026.mainproject.domain.member.entity.Score;

import java.util.List;


public interface ScoreRepository extends JpaRepository<Score, Long> {

    Score findByMember_MemberId(long memberId);

    List<Score> findTop10ByOrderByScoreDescModifiedAtAscCreatedAtAsc();

}
