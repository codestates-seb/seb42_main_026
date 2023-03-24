package seb42_main_026.mainproject.domain.member.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
//@RequestMapping("/members")
@RequiredArgsConstructor
@Validated
public class MemberController {
    private final MemberMapper memberMapper;
    private final MemberService memberService;
    private final ScoreMapper scoreMapper;

    @PostMapping("/signup")
    public ResponseEntity<?> postMember(@Valid @RequestBody MemberDto.Post memberPostDto) {
        Member member = memberMapper.memberPostToMember(memberPostDto);

        Member createdMember = memberService.createMember(member);

        URI location = UriCreator.createUri("/members", createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/members/{member-id}")
    public ResponseEntity<?> getMember(@PathVariable("member-id") @Positive Long memberId) {
        Member member = memberService.findMember(memberId);

        MemberDto.Response response = memberMapper.memberToMemberResponse(member);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/home/rank")
    public ResponseEntity<?> getRank() {
        List<Score> scoreRank = memberService.getRank();

        List<ScoreDto.Response> scoreRanks = scoreMapper.scoresToScoreResponseDto(scoreRank);

        return new ResponseEntity<>(new SingleResponseDto<>(scoreRanks), HttpStatus.OK);
    }

/*<<<<<<< HEAD
    @PatchMapping(value = "/members/{member-id}", consumes =
            {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive Long memberId,
                                      @RequestPart @Valid MemberDto.Patch memberPatchDto,
                                      @RequestPart(required = false) MultipartFile profileImage){
=======*/
    @PatchMapping("/members/{member-id}")
    public ResponseEntity<?> patchNickname(@PathVariable("member-id") @Positive Long memberId,
                                        @RequestBody @Valid MemberDto.Patch memberPatchDto) {
        memberPatchDto.setMemberId(memberId);

        Member member = memberMapper.memberPatchToMember(memberPatchDto);

        memberService.updateNickname(member);

        return ResponseEntity.ok().build();
    }


    @PatchMapping(value = "/members/change-profile/{member-id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> patchProfileImage(@PathVariable("member-id") @Positive Long memberId,
                                               @RequestPart MultipartFile profileImage) {
        memberService.updateProfileImage(memberId, profileImage);

        return ResponseEntity.ok().build();
    }

//    @PatchMapping("/members/changepassword/{member-id}")
//    public ResponseEntity patchMemberPassword(@PathVariable("member-id") @Positive Long memberId,
//                                      @RequestBody MemberDto.PatchPassword memberPatchDto){
//
//
//        List<Member> members = memberMapper.memberPasswordPatchToMember(memberPatchDto, memberId);
//
//
//        Member updateMember = memberService.changePaaswordMember(members);
//
//        MemberDto.Response response = memberMapper.memberToMemberResponse(updateMember);
//
//        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
//
//    }

    @PatchMapping("/members/change-password/{member-id}")
    public ResponseEntity<?> patchPassword(@PathVariable("member-id") @Positive Long memberId,
                                        @RequestBody @Valid MemberDto.PatchPassword passwordDto) {
        memberService.updatePassword(memberId, passwordDto);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/members/{member-id}")
    public ResponseEntity<?> deleteMember(@PathVariable("member-id") @Positive Long memberId){

        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }
}
