package seb42_main_026.mainproject.domain.member.controller;


import io.jsonwebtoken.io.Decoders;
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

    @PostMapping(value = "/signup", consumes =
            {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPostDto,
                                     @RequestPart(required = false) MultipartFile mediaFile) {

        Member member = memberMapper.memberPostToMember(memberPostDto);
        Member createdMember = memberService.createMember(member, mediaFile);

       return ResponseEntity.created(URI.create("/members/" + createdMember.getMemberId())).build();
    }

    @GetMapping("/members/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive Long memberId){
        Member member = memberService.getMember(memberId);
        MemberDto.Response response = memberMapper.memberToMemberResponse(member);

        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);

    }

    @GetMapping("/home/rank")
    public ResponseEntity getRank(){

        List<Score> scoreRank = memberService.getRank();

        List<ScoreDto.Response> scoreRanks = scoreMapper.scoresToScoreResponseDto(scoreRank);

        return new ResponseEntity<>(new SingleResponseDto(scoreRanks), HttpStatus.OK);
    }

    @PatchMapping(value = "/members/{member-id}", consumes =
            {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive Long memberId,
                                      @RequestBody MemberDto.Patch memberPatchDto,
                                      @RequestPart(required = false) MultipartFile mediaFile){

        Member member = memberMapper.memberPatchToMember(memberPatchDto);
        member.setMemberId(memberId);
        Member updateMember = memberService.updateMember(member, mediaFile);

        MemberDto.Response response = memberMapper.memberToMemberResponse(updateMember);

        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);

    }

    @PatchMapping("/members/changepassword/{member-id}")
    public ResponseEntity patchMemberPassword(@PathVariable("member-id") @Positive Long memberId,
                                      @RequestBody MemberDto.PatchPassword memberPatchDto){


        List<Member> members = memberMapper.memberPasswordPatchToMember(memberPatchDto, memberId);


        Member updateMember = memberService.changePaaswordMember(members);

        MemberDto.Response response = memberMapper.memberToMemberResponse(updateMember);

        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);

    }

    @DeleteMapping("/members/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive Long memberId){

        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();

    }

}
