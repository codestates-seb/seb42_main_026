package seb42_main_026.mainproject.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_main_026.mainproject.domain.member.entity.Refresh;

import java.util.Optional;

public interface RefreshRepository extends JpaRepository<Refresh, Long> {

    Optional<Refresh> findById(Long Id);

    Optional<Refresh> findByMember_MemberId(Long Id);

}