package seb42_main_026.mainproject.domain.member.service;


import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import seb42_main_026.mainproject.cloud.service.S3StorageService;
import seb42_main_026.mainproject.domain.member.dto.MemberDto;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.entity.Score;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.domain.member.repository.ScoreRepository;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
import seb42_main_026.mainproject.security.utils.CustomAuthorityUtils;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final ScoreRepository scoreRepository;
    private final S3StorageService s3StorageService;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        verifyExistsNickName(member.getNickname());

        return saveMember(member);
    }

    private Member saveMember(Member member){
        member.setPassword(encryptedPassword(member.getPassword()));

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);
        setScore(savedMember.getMemberId());

        return savedMember;
    }

    public void setScore(Long memberId) {
        Member verifiedMember = findVerifiedMember(memberId);

        Score score = new Score();
        score.setScore(0L);
        score.setMember(verifiedMember);
        score.setNickname(verifiedMember.getNickname());

        if (verifiedMember.getProfileImageUrl() != null) {
            score.setProfileImageUrl(verifiedMember.getProfileImageUrl());
        }
        scoreRepository.save(score);
    }

    public Member updateNickname(Member member) {
        Member updatedMemberNickname = updateMemberNickname(member);
        updateScoreNickname(member);

        return updatedMemberNickname;
    }

    private Member updateMemberNickname(Member member){
        Member verifiedMember = findVerifiedMember(member.getMemberId());
        verifyExistsNickName(member.getNickname());
        verifiedMember.setNickname(member.getNickname());

        return verifiedMember;
    }

    private void updateScoreNickname(Member member){
        Score score = scoreRepository.findByMember_MemberId(member.getMemberId());
        score.setNickname(member.getNickname());
    }

    public void updateProfileImage(long memberId, MultipartFile profileImage) {
        Member member = findVerifiedMember(memberId);
        Score score = scoreRepository.findByMember_MemberId(memberId);

        String encodedFileName = s3StorageService.encodeFileName(profileImage);
        String profileImageUrl = s3StorageService.getFileUrl(encodedFileName);

        member.setProfileImageUrl(profileImageUrl);
        score.setProfileImageUrl(profileImageUrl);

        s3StorageService.imageStore(profileImage, encodedFileName);
    }

    public void updatePassword(Long memberId, MemberDto.PatchPassword passwordDto) {
        verifyCurrentPassword(memberId, passwordDto);
        updateCurrentPassword(memberId, passwordDto);
    }

    private void verifyCurrentPassword(Long memberId, MemberDto.PatchPassword passwordDto){
        if(!passwordEncoder.matches(passwordDto.getPassword(), findVerifiedMember(memberId).getPassword())){
            throw new CustomException(ExceptionCode.PASSWORD_NOT_MATCH);
        }
    }

    private void updateCurrentPassword(Long memberId, MemberDto.PatchPassword passwordDto){
        Member foundMember = findVerifiedMember(memberId);
        foundMember.setPassword(encryptedPassword(passwordDto.getChangePassword()));
    }

    public void updateScore(Long memberId, Long score) {
        Member verifiedMember = findVerifiedMember(memberId);
        Score updateScore = scoreRepository.findByMember_MemberId(memberId);
        Long changedScore = updateScore.getScore() + score;

        // 회원 망치티어 갱신
        verifiedMember.setHammerTier(updateHammerTier(changedScore));

        // 점수 갱신
        updateScore.setScore(changedScore);
    }

    private Member.HammerTier updateHammerTier(Long score) {
        if (50 > score && score >= 0) {
            return Member.HammerTier.STONE_HAMMER;
        } else if (100 > score && score >= 50) {
            return Member.HammerTier.BRONZE_HAMMER;
        } else if (200 > score && score >= 100) {
            return Member.HammerTier.SILVER_HAMMER;
        } else if (400 > score && score >= 200) {
            return Member.HammerTier.GOLD_HAMMER;
        } else {
            return Member.HammerTier.PPONG_HAMMER;
        }
    }

    @Transactional(readOnly = true)
    public Member findMember(Long memberId) {

        return findVerifiedMember(memberId);
    }

    @Transactional(readOnly = true)
    public List<Score> findRank() {

        return scoreRepository.findTop10ByOrderByScoreDescModifiedAtAscCreatedAtAsc();
    }

    public void deleteMember(Long memberId) {

        memberRepository.deleteById(memberId);
    }

    public void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            throw new CustomException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    private void verifyExistsNickName(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
        if (member.isPresent()) {
            throw new CustomException(ExceptionCode.NICKNAME_EXISTS);
        }
    }

    public Member findVerifiedMember(Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);

        return member.orElseThrow(() -> new CustomException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Member findVerifiedMemberByEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);

        return member.orElseThrow(() -> new CustomException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public void verifyMemberByMemberId(long sourceMemberId, long updateMemberId) {
        if (sourceMemberId != updateMemberId) {
            throw new CustomException(ExceptionCode.UNAUTHORIZED_USER);
        }
    }

    private String encryptedPassword(String password){

        return passwordEncoder.encode(password);
    }

}
