package seb42_main_026.mainproject.security.Oauth2;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.domain.member.service.MemberService;
import seb42_main_026.mainproject.security.jwt.JwtTokenizer;
import seb42_main_026.mainproject.security.userdetails.PrincipalDetails;
import seb42_main_026.mainproject.security.utils.CustomAuthorityUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException{
        var oAuth2User = (OAuth2User)authentication.getPrincipal();


        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String nickname = String.valueOf(oAuth2User.getName());
        System.out.println("유저의 닉네임입니다:  "+nickname);
        List<String> authorities = authorityUtils.createRoles(email);


        redirect(request, response, email, nickname, authorities);
    }

    private void saveMember(String email, String name ,List<String> roles){              // 서버 리파지토리에 유저 정보 저장
        Member member = new Member();
        member.setEmail(email);
        member.setNickname(name);
        member.setPassword("!As134679");  // 추후 삭제할거 일단 테스트를 위해
        memberRepository.save(member);

        /*memberService.verifyExistsEmail(member.getEmail());                // 미래 대비
        memberService.verifyExistsNickName(member.getNickname());


        member.setRoles(roles); // DB에 User Role 저장

        memberRepository.save(member);

        memberService.setScore(member.getMemberId());*/
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, String nickname, List<String> authorities) throws IOException{
        String accessToken = delegateAccessToken(username,nickname ,authorities);
        String refreshToken = delegateRefreshToken(username);

        response.setHeader("Authorization", "Bearer " + accessToken); // Access Token은 클라이언트 측에서 백엔드 애플리케이션 측에 요청을 보낼 때마다 request header에 추가해서 클라이언트 측의 자격을 증명하는 데 사용된다.
        response.setHeader("Refresh", refreshToken);

        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);

    }

    private String delegateAccessToken(String username, String nickname, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("nickname", nickname);
        claims.put("roles", authorities);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder //  Port 설정을 하지 않으면 기본값은 80 포트
                .newInstance()
                .scheme("http")
                .host("localhost")
                .path("/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
