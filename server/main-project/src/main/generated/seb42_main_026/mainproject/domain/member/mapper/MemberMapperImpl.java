package seb42_main_026.mainproject.domain.member.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb42_main_026.mainproject.domain.member.dto.MemberDto;
import seb42_main_026.mainproject.domain.member.entity.Member;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-08T14:29:21+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostToMember(MemberDto.Post memberPostDto) {
        if ( memberPostDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setNickname( memberPostDto.getNickname() );
        member.setEmail( memberPostDto.getEmail() );
        member.setPassword( memberPostDto.getPassword() );

        return member;
    }

    @Override
    public Member memberPatchToMember(MemberDto.Patch memberPatchDto) {
        if ( memberPatchDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setNickname( memberPatchDto.getNickname() );
        member.setPassword( memberPatchDto.getPassword() );

        return member;
    }

    @Override
    public MemberDto.Response memberToMemberResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        Long memberId = null;
        String email = null;
        String nickname = null;

        memberId = member.getMemberId();
        email = member.getEmail();
        nickname = member.getNickname();

        MemberDto.Response response = new MemberDto.Response( memberId, email, nickname );

        return response;
    }
}
