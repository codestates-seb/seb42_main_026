package seb42_main_026.mainproject.domain.member.service;


import lombok.RequiredArgsConstructor;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.context.ApplicationEventPublisher;
=======
>>>>>>> 573b47a (Fix: Security 수정)
=======
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
>>>>>>> 7b5d68e (Feat: Member Score 추가)
import org.springframework.security.crypto.password.PasswordEncoder;
=======
>>>>>>> c3405f4 (feat: 멤버 구현)
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.entity.Score;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.domain.member.repository.ScoreRepository;
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
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
<<<<<<< HEAD
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    private final ScoreRepository scoreRepository;


    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());
        verifyExistsNickName(member.getNickname());

        String encryptedPassword = passwordEncoder.encode(member.getPassword()); // Password 암호화
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail()); // DB에 User Role 저장

        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        setScore(member.getMemberId());




        return savedMember;
    }

    public List<Score> getRank(){

        List<Score> scores = scoreRepository.findTop10ByOrderByScoreDescModifiedAtAscCreatedAtAsc();


        return scores;
    }
    @Transactional(readOnly = true)
    public Member getMember(Long memberId){
        Member member = findVerifiedMember(memberId);

        return member;
    }

    public Member updateMember(Member member){

        // 로그인 멤버 권한 검사
        verifyLoginMember(member.getMemberId());

        // 멤버 확인
        Member verifiedMember = findVerifiedMember(member.getMemberId());

        // 바꾸려는 닉네임 중복 확인
        verifyExistsNickName(member.getNickname());

        Optional.ofNullable(member.getNickname()).ifPresent(name -> verifiedMember.setNickname(name));
        Optional.ofNullable(member.getPassword()).ifPresent(password -> verifiedMember.setNickname(password));

        return verifiedMember;

    }

    public void deleteMember(Long memberId){
        // 로그인 멤버 권한 검사
        verifyLoginMember(memberId);

        memberRepository.deleteById(memberId);
        // 멤버 상태 변경 (원래)
        // findVerifiedMember(memberId).setMemberStatus(Member.MemberStatus.MEMBER_DELETE);


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

    public void verifyLoginMember(Long memberId){
        if(! getTokenMemberId().equals(memberId)){
            throw new CustomException(ExceptionCode.UNAUTHORIZED_USER);
        }
    }

    private Long getTokenMemberId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberRepository.findByEmail(authentication.getName()).get(); //  If a value is present, returns the value, otherwise throws NoSuchElementException.

        return member.getMemberId();
    }



    public void verifyMemberByMemberId(long questionMemberId, long updateMemberId) {
        if (questionMemberId != updateMemberId) {
            throw new CustomException(ExceptionCode.UNAUTHORIZED_USER);
        }
    }

    private void setScore(Long memberId){
        Score score = new Score();

        // score 순 테스트
        Random random = new Random();

        score.setScore(2L);
        score.setMember(getMember(memberId));

        scoreRepository.save(score);

    }

    public Score updateScore(Long memberId, Long score){

        Score updateScore = scoreRepository.findByMember_MemberId(memberId);

        updateScore.setScore(updateScore.getScore() + score);

        return updateScore;

    }


}
