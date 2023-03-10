package seb42_main_026.mainproject.domain.member.service;


import lombok.RequiredArgsConstructor;
<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.context.ApplicationEventPublisher;
=======
>>>>>>> 573b47a (Fix: Security 수정)
import org.springframework.security.crypto.password.PasswordEncoder;
=======
>>>>>>> c3405f4 (feat: 멤버 구현)
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
<<<<<<< HEAD
<<<<<<< HEAD
import seb42_main_026.mainproject.security.security.utils.CustomAuthorityUtils;
=======
import seb42_main_026.mainproject.security.utils.CustomAuthorityUtils;
>>>>>>> 573b47a (Fix: Security 수정)

import java.util.List;
=======

>>>>>>> c3405f4 (feat: 멤버 구현)
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
<<<<<<< HEAD
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;


    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());
        verifyExistsNickName(member.getNickname());

        String encryptedPassword = passwordEncoder.encode(member.getPassword()); // Password 암호화
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail()); // DB에 User Role 저장
        member.setRoles(roles);

        member.setScore(0L);
        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    @Transactional(readOnly = true)
    public Member getMember(Long memberId){
        Member member = findVerifiedMember(memberId);

        return member;
    }

    public void verifyExistsEmail(String email){
=======

    public Member createdMember(Member member){
        veryfyExistsEmail(member.getEmail());
        veryfyExistsNickName(member.getNickname());

        Member createdMember = memberRepository.save(member);

        return createdMember;
    }

    public void veryfyExistsEmail(String email){
>>>>>>> c3405f4 (feat: 멤버 구현)
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()){
            throw new CustomException(ExceptionCode.MEMBER_EXISTS);
        }
    }

<<<<<<< HEAD
    public void verifyExistsNickName(String nickname){
=======
    public void veryfyExistsNickName(String nickname){
>>>>>>> c3405f4 (feat: 멤버 구현)
        Optional<Member> member = memberRepository.findByNickname(nickname);

        if (member.isPresent()){
            throw new CustomException(ExceptionCode.NICKNAME_EXISTS);
        }
    }

<<<<<<< HEAD
    public Member findVerifiedMember(Long memberId){
        Optional<Member> member = memberRepository.findById(memberId);
        Member verifiedMember = member.orElseThrow(() -> new CustomException(ExceptionCode.MEMBER_NOT_FOUND));

        return verifiedMember;
    }

=======
>>>>>>> c3405f4 (feat: 멤버 구현)

}
