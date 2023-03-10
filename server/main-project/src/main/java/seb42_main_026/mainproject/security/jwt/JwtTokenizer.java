package seb42_main_026.mainproject.security.security.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtTokenizer {
    @Getter
    @Value("${jwt.key}") //  JWT 생성 시 필요한 정보이며, 해당 정보는 application.yml 파일에서 로드한다.
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}") //  JWT 생성 시 필요한 정보이며, 해당 정보는 application.yml 파일에서 로드한다.
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}") // JWT 생성 시 필요한 정보이며, 해당 정보는 application.yml 파일에서 로드한다.
    private int refreshTokenExpirationMinutes;


    // Plain Text 형태인 Secret Key의 byte[]를 Base64 형식의 문자열로 인코딩해준다.
    public String encodeBase64SecretKey(String secretKey){
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey); // Base64 형식 Secret Key 문자열을 이용해 Key(java.security.Key) 객체를 얻는다.

        return Jwts.builder()
                .setClaims(claims) // Claims 에는 주로 인증된 사용자와 관련된 정보를 추가합니다.
                .setSubject(subject) //  JWT에 대한 제목을 추가한다.
                .setIssuedAt(Calendar.getInstance().getTime()) // JWT 발행 일자를 설정한다. 파라미터 타입은 java.util.Date 타입이다.
                .setExpiration(expiration) // JWT의 만료일시를 지정한다. 파라미터 타입은 java.util.Date 타입이다.
                .signWith(key) // 서명을 위한 Key(java.security.key)객체를 설정한다.
                .compact(); // compact()를 통해 JWT 생성하고 직렬화한다.
    }

    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();

    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);

        return claims;
    }

    public void verifySignature(String jws, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key) // 메서드로 서명에 사용된 Secret Key를 설정한다.
                .build()
                .parseClaimsJws(jws); //  JWT를 파싱해서 Claims를 얻는다.
    }

    // JWT의 만료 일시를 지정하기 위한 메서드로 JWT 생성 시 사용한다.
    public Date getTokenExpiration(int expirationMinutes){
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    // JWT의 서명에 사용할 Secret Key를 생성해준다.
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey){
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey); // Base64 형식으로 인코딩된 Secret Key를 디코딩한 후, byte array를 반환한다.
        Key key = Keys.hmacShaKeyFor(keyBytes); //  key byte array를 기반으로 적절한 HMAC 알고리즘을 적용한 Key(java.security.Key) 객체를 생성한다.

        return key;
    }
}
