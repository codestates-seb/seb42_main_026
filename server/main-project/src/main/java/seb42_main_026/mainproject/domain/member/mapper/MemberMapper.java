package seb42_main_026.mainproject.domain.member.mapper;


import org.mapstruct.Mapper;
import seb42_main_026.mainproject.domain.member.dto.MemberDto;
import seb42_main_026.mainproject.domain.member.entity.Member;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostToMember(MemberDto.Post memberPostDto);

    Member memberPatchToMember(MemberDto.Patch memberPatchDto);

    default List<Member> memberPasswordPatchToMember(MemberDto.PatchPassword PatchPasswordDto, Long memberId){
        if ( PatchPasswordDto == null ) {
            return null;
        }

        List<Member> members = new ArrayList<>();

        Member member1 = new Member();
        member1.setPassword(PatchPasswordDto.getPassword());
        member1.setMemberId(memberId);
        Member member2 = new Member();
        member2.setPassword(PatchPasswordDto.getChangepassword());

        members.add(member1);
        members.add(member2);

        return members;
    };

    MemberDto.Response memberToMemberResponse(Member member);

    List<MemberDto.Response> membersToMemberResponseDto(List<Member> members);
}
