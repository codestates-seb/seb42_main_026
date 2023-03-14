package seb42_main_026.mainproject.security.utils;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils { // CustomAuthorityUtils 를 이용해 데이터베이스에서 조회한 회원의 이메일 정보를 이용해 Role 기반의 권한 정보(GrantedAuthority) 컬렉션을 생성한다.
    @Value("${mail.address.admin}") // application.yml에 추가한 프로퍼티를 가져오는 표현식이다.(1)과 같이 @Value("${프로퍼티 경로}")의 표현식 형태로 작성하면 application.yml에 정의되어 있는 프로퍼티의 값을 클래스 내에서 사용할 수 있다.
    private String adminMailAddress; // application.yml 파일에 정의한 관리자용 이메일 주소는 회원 등록 시, 특정 이메일 주소에 관리자 권한을 부여할 수 있는지를 결정하기 위해 사용된다.

    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER"); // Spring Security에서 지원하는 AuthorityUtils 클래스를 이용해서 관리자용 권한 목록을 List<GrantedAuthority> 객체로 미리 생성한다.
    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER"); // Spring Security에서 지원하는 AuthorityUtils 클래스를 이용해서 일반 사용 권한 목록을 List<GrantedAuthority> 객체로 미리 생성한다.
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");


    // 메모리 상의 Role을 기반으로 권한 정보를 생성한다.
    public List<GrantedAuthority> createAuthorities(String email){
        if (email.equals(adminMailAddress)){
            return ADMIN_ROLES;
        }

        return USER_ROLES;
    }

    // DB에 저장된 Role을 기반으로 권한 정보를 생성한다.
    public List<GrantedAuthority> createAuthorities(List<String> roles){
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_"+ role))
                .collect(Collectors.toList());
        return authorities;
    }

    // DB 저장용
    public List<String> createRoles(String email){
        if(email.equals(adminMailAddress)){
            return ADMIN_ROLES_STRING;
        }
        return USER_ROLES_STRING;
    }
}
