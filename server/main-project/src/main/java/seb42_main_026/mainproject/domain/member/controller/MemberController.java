package seb42_main_026.mainproject.domain.member.controller;


import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import seb42_main_026.mainproject.domain.member.dto.MemberDto;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.mapper.MemberMapper;
import seb42_main_026.mainproject.domain.member.mapper.ScoreMapper;
import seb42_main_026.mainproject.domain.member.dto.ScoreDto;
import seb42_main_026.mainproject.domain.member.entity.Score;
import seb42_main_026.mainproject.domain.member.service.MemberService;
import seb42_main_026.mainproject.dto.SingleResponseDto;
import seb42_main_026.mainproject.security.utils.UriCreator;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberMapper memberMapper;
    private final MemberService memberService;
    private final ScoreMapper scoreMapper;

    @PostMapping("/signUp")
    public ResponseEntity<?> postMember(@Valid @RequestBody MemberDto.Post memberPostDto) {
        Member member = memberMapper.memberPostToMember(memberPostDto);

        Member createdMember = memberService.createMember(member);

        URI location = UriCreator.createUri("/members", createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/members/nickname")
    public ResponseEntity<?> patchNickname(@AuthenticationPrincipal Member auth,
                                           @RequestBody @Valid MemberDto.Patch memberPatchDto) {
        memberPatchDto.setMemberId(auth.getMemberId());

        Member member = memberMapper.memberPatchToMember(memberPatchDto);

        Member updatedMember = memberService.updateNickname(member);

        String updatedNickname = updatedMember.getNickname();

        return ResponseEntity.ok(updatedNickname);
    }

    @PatchMapping(value = "/members/profileImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> patchProfileImage(@AuthenticationPrincipal Member auth,
                                               @RequestPart MultipartFile profileImage) {
        memberService.updateProfileImage(auth.getMemberId(), profileImage);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/members/password")
    public ResponseEntity<?> patchPassword(@AuthenticationPrincipal Member auth,
                                           @RequestBody @Valid MemberDto.PatchPassword passwordDto) {
        memberService.updatePassword(auth.getMemberId(), passwordDto);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/members")
    public ResponseEntity<?> getMember(@AuthenticationPrincipal Member auth) {
        Member member = memberService.findMember(auth.getMemberId());

        MemberDto.Response response = memberMapper.memberToMemberResponse(member);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/home/rank")
    public ResponseEntity<?> getRank() {
        List<Score> scoreRank = memberService.findRank();

        List<ScoreDto.Response> scoreRanks = scoreMapper.scoresToScoreResponseDto(scoreRank);

        return new ResponseEntity<>(new SingleResponseDto<>(scoreRanks), HttpStatus.OK);
    }

    @DeleteMapping("/members")
    public ResponseEntity<?> deleteMember(@AuthenticationPrincipal Member auth) {
        memberService.deleteMember(auth.getMemberId());

        return ResponseEntity.noContent().build();
    }
}