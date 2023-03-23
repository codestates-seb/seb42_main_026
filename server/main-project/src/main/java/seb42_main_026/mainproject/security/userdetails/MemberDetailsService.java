package seb42_main_026.mainproject.security.userdetails;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
import seb42_main_026.mainproject.security.utils.CustomAuthorityUtils;

import java.util.Collection;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new CustomException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);

    }
    // 이렇게 구성하면 데이터베이스에서 조회한 회원 정보를 Spring Security의 User 정보로 변환하는 과정과 User의 권한 정보를 생성하는 과정을 캡슐화 할 수 있다.

    // MemberDetails 클래스는 Member 엔티티 클래스를 상속하고 있기 때문에 MemberDetails를 리턴 받아 사용하는 측에서는 두 개 클래스의 객체를 모두 다 손쉽게 캐스팅해서 사용 가능하다는 장점이 있다.
    private final class MemberDetails extends Member implements UserDetails {

        MemberDetails(Member member){
            setMemberId(member.getMemberId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
            setNickname(member.getNickname());

        }


        @Override
        public Collection<? extends GrantedAuthority> getAuthorities(){ //  User의 권한 정보를 생성한다.
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername(){
            return getEmail();
        }



        @Override
        public boolean isAccountNonExpired(){
            return true;
        }

        @Override
        public boolean isAccountNonLocked(){
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired(){
            return true;
        }

        @Override
        public boolean isEnabled(){
            return true;
        }
    }

}

