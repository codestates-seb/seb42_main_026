package seb42_main_026.mainproject.security.userdetails;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.security.utils.CustomAuthorityUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class PrincipalDetails implements UserDetails, OAuth2User {



    private Member member;
    private Map<String, Object> attibutes;

    // 일반 로그인
    public PrincipalDetails(Member member){
        this.member = member;
    }

    // OAuth2 로그인
    public PrincipalDetails(Member member, Map<String, Object> attibutes){
        this.member = member;
        this.attibutes = attibutes;
    }
    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public String getUsername() {
        return member.getEmail();
    }


    // 해당 유저의 권한을 리턴하는 method
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = this.member.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_"+ role))
                .collect(Collectors.toList());

        return authorities;
    }

    @Override
    // 만료 여부
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    // 잠금 여부
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    // 만료 여부
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    // 회원 사용 여부
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attibutes;
    }

    @Override
    public <A> A getAttribute(String name) {
        return OAuth2User.super.getAttribute(name);
    }

    @Override
    public String getName() {
        return member.getNickname();
    }
}
