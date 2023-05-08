package seb42_main_026.mainproject.security.Oauth2;


import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.entity.Score;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.domain.member.repository.ScoreRepository;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
import seb42_main_026.mainproject.security.userdetails.PrincipalDetails;
import seb42_main_026.mainproject.security.utils.CustomAuthorityUtils;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;

    private final ScoreRepository scoreRepository;
    private final CustomAuthorityUtils authorityUtils;

    public CustomOAuth2UserService(MemberRepository memberRepository, ScoreRepository scoreRepository, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.scoreRepository = scoreRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());


        verifyOAuth2MemberByEmail(attributes.getEmail());
        verifyOAuth2MemberByNickname(attributes.getName());


        Member verifiedMember = save(attributes);
        setScore(verifiedMember);

        return new PrincipalDetails(verifiedMember, attributes.getAttributes());

    }


    private Member save(OAuthAttributes attributes){

        Member member = new Member();

        member.setEmail(attributes.getEmail());
        member.setNickname(attributes.getName());

        member.setPassword("GoogleNaverKakaoOauthGoodNakJun9999" + makeRandomString());
        member.setRoles(getAuthorities(member.getEmail()));

        return memberRepository.save(member);
    }

    private void setScore(Member member){
        Score score = new Score();

        Optional<Member> findmember = memberRepository.findById(member.getMemberId());
        Member verifiedMember = findmember.orElseThrow(() -> new CustomException(ExceptionCode.MEMBER_NOT_FOUND));


        score.setScore(0L);
        score.setMember(verifiedMember);
        score.setNickname(verifiedMember.getNickname());



        scoreRepository.save(score);
    }

    private String makeRandomString(){
        // 비밀 번호
        // OAuth2 가입 유저인지 기본 회원 가입 유저인지 판별하기 위해 비밀번호에 추가한다.
        UUID uuid = UUID.randomUUID();
        String cut = uuid.toString().substring(0,5);

        return cut;
    }

    private List<String> getAuthorities(String email){

        return authorityUtils.createRoles(email);
    }

    private Optional<Member> verifyOAuth2MemberByEmail(String email){

        Optional<Member> verifiedByEmail = memberRepository.findByEmail(email);
        if (verifiedByEmail.isPresent()) {
            throw new CustomException(ExceptionCode.MEMBER_EXISTS);
        }else {
            return verifiedByEmail;
        }

    }

    private Optional<Member> verifyOAuth2MemberByNickname(String nickname){

        Optional<Member> verifiedByNickName = memberRepository.findByNickname(nickname);
        if (verifiedByNickName.isPresent()) {
            throw new CustomException(ExceptionCode.MEMBER_EXISTS);
        }else {
            return verifiedByNickName;
        }
    }

}