package seb42_main_026.mainproject.security.filter;

import com.nimbusds.jwt.JWT;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
import seb42_main_026.mainproject.security.jwt.JwtTokenizer;
import seb42_main_026.mainproject.security.utils.CustomAuthorityUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter { // OncePerRequestFilter를 확장해서 request 당 한 번만 실행되는 Security Filter를 구현할 수 있다.
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
        System.out.println(request.getHeader("sub")+"-------------------------------------------------------");

        // AccessToken 추출 및 유효성 검사
        String accessToken = jwtTokenizer.extractAccessToken(request)
                .filter(jwtTokenizer:: isTokenValid)
                .orElse(null);


        // AccessToken 이 만료라면?
        if (accessToken == null){

            //String refreshToken = jwtTokenizer.extractRefreshToken(request).orElseThrow(() -> new CustomException(ExceptionCode.REFRESH_TOKEN_EXPRIATION));
            // Refresh이 만료되면 프론트 쿠키에서 삭제된다.
            String refreshToken = jwtTokenizer.extractRefreshToken(request).orElseThrow();


            try {
                Map<String, Object> claims = verifyRefreshJws(refreshToken);
                System.out.println("Refresh Token Claims!  :"+claims);
                System.out.println("Refresh Token Claims sub!  :"+claims.get("sub"));

            }catch (Exception e){
                System.out.println("Refresh Token이 만료 되었습니다." + e.getMessage());
            }

        }else {
            Map<String, Object> claims = verifyJws(request);

            setAuthenticationToContext(claims); //  Authentication 객체를 SecurityContext에 저장하기 위한 private 메서드이다.


        }




        filterChain.doFilter(request, response);

    }

    //  조건에 부합하면(true이면) 해당 Filter의 동작을 수행하지 않고 다음 Filter로 건너뛰도록 해준다.
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
        String authorization = request.getHeader("Authorization"); // Authorization header의 값을 얻은 후

        return authorization == null || !authorization.startsWith("Bearer"); // Authorization header의 값이 null이거나 Authorization header의 값이 “Bearer”로 시작하지 않는다면 해당 Filter의 동작을 수행하지 않도록 정의한다.
    }


    // JWT를 검증하는데 사용되는 private 메서드이다.
    private Map<String, Object> verifyJws(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer ", ""); //  request의 header에서 JWT를 얻고 있다. ( jws로 지정한 이유는 서명된 JWT를 JWS(JSON Web Token Signed)라고 부르기 때문이다.)
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()); //  JWT 서명(Signature)을 검증하기 위한 Secret Key를 얻는다.
        try {
            Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody(); // JWT에서 Claims를 파싱한다.  JWT에서 Claims를 파싱할 수 있다는 의미는 내부적으로 서명(Signature) 검증에 성공했다는 의미이다.
            // verify() 같은 검증 메서드가 따로 존재하는 것이 아니라 Claims가 정상적으로 파싱이 되면 서명 검증 역시 자연스럽게 성공했다는 의미이다.
            System.out.println("AccessClaims : "+ claims);
            return claims;
        }catch (Exception e){
            System.out.println("AccessToken : "+ e.getMessage());
            throw new CustomException(ExceptionCode.ACCESS_TOKEN_EXPRIATION);
        }


    }

    private Map<String, Object> verifyRefreshJws(String  jws){
        try {
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
            System.out.println("Refresh : "+ claims);
            return claims;
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new CustomException(ExceptionCode.REFRESH_TOKEN_EXPRIATION);
        }
    }

    private void setAuthenticationToContext(Map<String, Object> claims){
        String username = (String) claims.get("username"); // 파싱한 Claims에서 username을 얻는다.
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles")); // Claims에서 얻은 권한 정보를 기반으로 List<GrantedAuthority 를 생성한다.
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities); // username과 List<GrantedAuthority 를 포함한 Authentication 객체를 생성한다.
        SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContext에 Authentication 객체를 저장한다.

    }




}
