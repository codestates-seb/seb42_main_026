package seb42_main_026.mainproject.security.Oauth2;


import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
import seb42_main_026.mainproject.security.userdetails.PrincipalDetails;
import seb42_main_026.mainproject.security.utils.CustomAuthorityUtils;

import java.util.*;
import java.util.List;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;


    private final CustomAuthorityUtils authorityUtils;

    public CustomOAuth2UserService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
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

            return new PrincipalDetails(verifiedMember, attributes.getAttributes());

        }





    }


    private Member save(OAuthAttributes attributes){

        Member member = new Member();

        member.setEmail(attributes.getEmail());
        member.setNickname(attributes.getName());
        System.out.println(member.getNickname());
        member.setPassword(UUID.randomUUID().toString());

        List<String> authorities = authorityUtils.createRoles(member.getEmail());
        member.setRoles(authorities);

        return memberRepository.save(member);
    }


}