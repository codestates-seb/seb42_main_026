package seb42_main_026.mainproject.domain.member.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public Member createMember(Member member){
        veryfyExistsEmail(member.getEmail());
        veryfyExistsNickName(member.getNickname());

        Member createdMember = memberRepository.save(member);

        return createdMember;
    }

    public void veryfyExistsEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()){
            throw new CustomException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    public void veryfyExistsNickName(String nickname){
        Optional<Member> member = memberRepository.findByNickname(nickname);

        if (member.isPresent()){
            throw new CustomException(ExceptionCode.NICKNAME_EXISTS);
        }
    }


}
