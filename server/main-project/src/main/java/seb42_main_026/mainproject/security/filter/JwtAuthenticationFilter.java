package seb42_main_026.mainproject.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.entity.Refresh;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.domain.member.repository.RefreshRepository;
import seb42_main_026.mainproject.dto.LoginDto;
import seb42_main_026.mainproject.security.jwt.JwtTokenizer;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;


@RequiredArgsConstructor
@Transactional
// UsernamePasswordAuthenticationFilter는 폼 로그인 방식에서 사용하는 디폴트 Security Filter로써, 폼 로그인이 아니더라도 Username/Password 기반의 인증을 처리하기 위해 UsernamePasswordAuthenticationFilter를 확장해서 구현할 수 있다.
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager; // DI 받은 AuthenticationManager는 로그인 인증 정보(Username/Password)를 전달받아 UserDetailsService와 인터랙션 한 뒤 인증 여부를 판단합니다
    private final JwtTokenizer jwtTokenizer; // 클라이언트가 인증에 성공할 경우, JWT를 생성 및 발급하는 역할을 한다.
    private final MemberRepository memberRepository;
    private final RefreshRepository refreshRepository;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response){  // 메서드 내부에서 인증을 시도하는 로직
        ObjectMapper objectMapper = new ObjectMapper(); // DTO 클래스로 역직렬화(Deserialization)하기 위해 ObjectMapper 인스턴스를 생성한다.
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); //  ServletInputStream 을 LoginDto 클래스의 객체로 역직렬화(Deserialization)합니다.

        UsernamePasswordAuthenticationToken authenticationToken = // Username과 Password 정보를 포함한 UsernamePasswordAuthenticationToken을 생성한다.
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken); // UsernamePasswordAuthenticationToken을 AuthenticationManager에게 전달하면서 인증 처리를 위임한다.
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal(); // authResult.getPrincipal()로 Member 엔티티 클래스의 객체를 얻는다.
                                                            // AuthenticationManager 내부에서 인증에 성공하면 인증된 Authentication 객체가 생성되면서 principal 필드에 Member 객체가 할당 된다.

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        if (refreshRepository.findByMember_MemberId(member.getMemberId()).isPresent()) {
            jwtTokenizer.updateRefresh(member.getMemberId(), refreshRepository, refreshToken);
        } else {
            Refresh refresh = new Refresh();
            refresh.setRefresh(refreshToken);
            refresh.setMember(member);
            refreshRepository.save(refresh);
        }

        response.setHeader("Authorization", "Bearer " + accessToken); // Access Token은 클라이언트 측에서 백엔드 애플리케이션 측에 요청을 보낼 때마다 request header에 추가해서 클라이언트 측의 자격을 증명하는 데 사용된다.
        response.setHeader("Refresh", refreshToken); // Refresh Token은 Access Token이 만료될 경우, 클라이언트 측이 Access Token을 새로 발급받기 위해 클라이언트에게 추가적으로 제공될 수 있으며 Refresh Token을 Access Token과 함께 클라이언트에게 제공할지 여부는 애플리케이션의 요구 사항에 따라 달라질 수 있다.

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    // Access Token을 생성한다.
    private String delegateAccessToken(Member member){
        Map<String, Object> claims = new HashMap<>();

        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getMemberId());
        claims.put("name", member.getNickname());

        String subject = member.getEmail();

        Instant expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    // Refresh Token을 생성한다.
    private String delegateRefreshToken(Member member){
        String subject = member.getEmail();

        Instant expiration =jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }
}
