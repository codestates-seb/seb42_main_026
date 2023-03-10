package seb42_main_026.mainproject.domain.member.controller;


import lombok.RequiredArgsConstructor;
<<<<<<< HEAD
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
=======
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
>>>>>>> c3405f4 (feat: 멤버 구현)
import seb42_main_026.mainproject.domain.member.dto.MemberDto;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.mapper.MemberMapper;
import seb42_main_026.mainproject.domain.member.service.MemberService;
<<<<<<< HEAD
import seb42_main_026.mainproject.dto.SingleResponseDto;
=======
>>>>>>> c3405f4 (feat: 멤버 구현)


import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
<<<<<<< HEAD
<<<<<<< HEAD
@RequestMapping("/api/members")
=======
@RequestMapping("/members")
>>>>>>> c3405f4 (feat: 멤버 구현)
=======
@RequestMapping("/members")
>>>>>>> a99fee6 (Fix: Member Controller url 수정 및 SecurityConfiguration CorsConfigurationSource 수정)
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberMapper memberMapper;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPostDto) {

        Member member = memberMapper.memberPostToMember(memberPostDto);
<<<<<<< HEAD
        Member createdMember = memberService.createMember(member);

       return ResponseEntity.created(URI.create("/members/" + createdMember.getMemberId())).build();
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive Long memberId){
        Member member = memberService.getMember(memberId);
        MemberDto.Response response = memberMapper.memberToMemberResponse(member);

        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);

    }
=======
        Member createdMember = memberService.createdMember(member);

       return ResponseEntity.created(URI.create("/members/" + createdMember.getMemberId())).build();
    }
>>>>>>> c3405f4 (feat: 멤버 구현)
}
