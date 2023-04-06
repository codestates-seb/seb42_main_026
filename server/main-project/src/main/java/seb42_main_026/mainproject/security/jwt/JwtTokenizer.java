package seb42_main_026.mainproject.security.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import seb42_main_026.mainproject.domain.member.entity.Refresh;
import seb42_main_026.mainproject.domain.member.repository.RefreshRepository;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

@Getter
@Component
public class JwtTokenizer {
    @Value("${jwt.key}") //  JWT 생성 시 필요한 정보이며, 해당 정보는 application.yml 파일에서 로드한다.
    private String secretKey;

    @Value("${jwt.access-token-expiration-minutes}") //  JWT 생성 시 필요한 정보이며, 해당 정보는 application.yml 파일에서 로드한다.
    private int accessTokenExpirationMinutes;

    @Value("${jwt.refresh-token-expiration-minutes}") // JWT 생성 시 필요한 정보이며, 해당 정보는 application.yml 파일에서 로드한다.
    private int refreshTokenExpirationMinutes;


    // Plain Text 형태인 Secret Key의 byte[]를 Base64 형식의 문자열로 인코딩해준다.
    public String encodeBase64SecretKey(String secretKey){
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Instant expiration,
                                      String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey); // Base64 형식 Secret Key 문자열을 이용해 Key(java.security.Key) 객체를 얻는다.

        return Jwts.builder()
                .setClaims(claims) // Claims 에는 주로 인증된 사용자와 관련된 정보를 추가합니다.
                .setSubject(subject) //  JWT에 대한 제목을 추가한다.
                .setIssuedAt(Date.from(Instant.now())) // JWT 발행 일자를 설정한다. 파라미터 타입은 java.util.Date 타입이다.
                .setExpiration(Date.from(expiration)) // JWT의 만료일시를 지정한다. 파라미터 타입은 java.util.Date 타입이다.
                .signWith(key) // 서명을 위한 Key(java.security.key)객체를 설정한다.
                .compact(); // compact()를 통해 JWT 생성하고 직렬화한다.
    }

    public String generateRefreshToken(String subject,
                                       Instant expiration,
                                       String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(expiration))
                .signWith(key)
                .compact();
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public void verifySignature(String jws, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key) // 메서드로 서명에 사용된 Secret Key를 설정한다.
                .build()
                .parseClaimsJws(jws); //  JWT를 파싱해서 Claims를 얻는다.
    }

    // JWT의 만료 일시를 지정하기 위한 메서드로 JWT 생성 시 사용한다.
    public Instant getTokenExpiration(int expirationMinutes){
        return Instant.now().plus(Duration.ofMinutes(expirationMinutes));
    }

    // JWT의 서명에 사용할 Secret Key를 생성해준다.
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey){
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey); // Base64 형식으로 인코딩된 Secret Key를 디코딩한 후, byte array를 반환한다.

        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Optional<String> extractAccessToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader("Authorization"))
                .filter(accessToken -> accessToken.startsWith("Bearer"))
                .map(accessToken -> accessToken.replace("Bearer", ""));
    }

    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader("Refresh"));
        //.map(refreshToken -> refreshToken.replace("Bearer", ""));
    }

    public boolean isTokenValid(String token) {
        try {
            String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());
            Map<String, Object> claims = getClaims(token, base64EncodedSecretKey).getBody();
            System.out.println("True +++++++++++++++++++++");
            return true;
        } catch (Exception e) {
            System.out.println(("유효하지 않은 토큰입니다. {}" + e.getMessage()));
            return false;
        }
    }

    @Transactional
    public void updateRefresh(Long memberId , RefreshRepository refreshRepository, String refreshToken) {
        Refresh updateRefresh = refreshRepository.findByMember_MemberId(memberId).orElseThrow();
        updateRefresh.setRefresh(refreshToken);
    }
}
