package seb42_main_026.mainproject.domain.member.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
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
@RequestMapping("/members")
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberMapper memberMapper;
    private final MemberService memberService;

    private final ScoreMapper scoreMapper;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPostDto) {

        Member member = memberMapper.memberPostToMember(memberPostDto);
        Member createdMember = memberService.createMember(member);

       return ResponseEntity.created(URI.create("/members/" + createdMember.getMemberId())).build();
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive Long memberId){
        Member member = memberService.getMember(memberId);
        MemberDto.Response response = memberMapper.memberToMemberResponse(member);

        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);

    }

    @GetMapping("/rank")
    public ResponseEntity getRank(){

        List<Score> scoreRank = memberService.getRank();

        List<ScoreDto.Response> scoreRanks = scoreMapper.scoresToScoreResponseDto(scoreRank);

        return new ResponseEntity<>(new SingleResponseDto(scoreRanks), HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive Long memberId,
                                      MemberDto.Patch memberPatchDto){
        Member member = memberMapper.memberPatchToMember(memberPatchDto);
        member.setMemberId(memberId);
        Member updateMember = memberService.updateMember(member);

        MemberDto.Response response = memberMapper.memberToMemberResponse(updateMember);

        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);

    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive Long memberId){

        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();

    }

}
