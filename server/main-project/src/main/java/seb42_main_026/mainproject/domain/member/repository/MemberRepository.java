package seb42_main_026.mainproject.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_main_026.mainproject.domain.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String Nickname);

    //List<Member> findTop10ByOrderByScoreAsc();

<<<<<<< HEAD
}
=======
}
>>>>>>> 7aae6283483c3e1590577f9e18fae9443185338a
