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

import java.util.*;
import java.util.List;

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
        System.out.println("CustomOauth2UserServcie Success=========================================================");
        OAuth2User oAuth2User = delegate.loadUser(userRequest);


        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();



        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());


        // 중복 검사
        Optional<Member> verifiedByEmail = memberRepository.findByEmail(attributes.getEmail());
        Optional<Member> verifiedByNickName = memberRepository.findByNickname(attributes.getName());

        if(verifiedByEmail.isPresent()){
            Member verifiedMember = verifiedByEmail.orElseThrow(() -> new CustomException(ExceptionCode.MEMBER_NOT_FOUND));

            return new PrincipalDetails(verifiedMember, attributes.getAttributes());

        }else if (verifiedByNickName.isPresent()){
            Member verifiedMember = verifiedByNickName.orElseThrow(() -> new CustomException(ExceptionCode.MEMBER_NOT_FOUND));

            return new PrincipalDetails(verifiedMember, attributes.getAttributes());

        }else {
            Member verifiedMember = save(attributes);
            setScore(verifiedMember);

            return new PrincipalDetails(verifiedMember, attributes.getAttributes());

        }





    }


    private Member save(OAuthAttributes attributes){

        Member member = new Member();

        member.setEmail(attributes.getEmail());
        member.setNickname(attributes.getName());
        System.out.println(member.getNickname());
        member.setPassword(UUID.randomUUID().toString());

        // Score Defaoult 값 추가



        List<String> authorities = authorityUtils.createRoles(member.getEmail());
        member.setRoles(authorities);

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


}