package seb42_main_026.mainproject.security.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.entity.Refresh;
import seb42_main_026.mainproject.domain.member.repository.RefreshRepository;
import seb42_main_026.mainproject.domain.member.service.MemberService;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
import seb42_main_026.mainproject.security.jwt.JwtTokenizer;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class JwtController {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final RefreshRepository refreshRepository;

    @Transactional
    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {

        // RefreshToken 추출
        String refreshToken = jwtTokenizer.extractRefreshToken(request).orElseThrow();

        // Claims 추출
        Map<String, Object> claims = verifyRefreshJws(refreshToken);
        System.out.println("Refresh Token Claims sub!  :" + claims.get("sub"));

        String username = claims.get("sub").toString();

        Member member = memberService.findVerifiedMemberByEmail(username);

        Refresh refresh = refreshRepository.findByMember_MemberId(member.getMemberId()).orElseThrow();
        // Refresh 토큰 멤버와 대조
        if (refreshToken.equals(refresh.getRefresh())  ) {

            String accessToken = delegateAccessToken(member);
            String newRefreshToken = delegateRefreshToken(member);

            // 새로운 Refresh 갱신
            Refresh updateRefresh = refreshRepository.findByMember_MemberId(member.getMemberId()).orElseThrow();
            updateRefresh.setRefresh(newRefreshToken);


            return ResponseEntity.noContent()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                    .header("Refresh",  newRefreshToken)
                    .build();


        } else {
            throw new CustomException(ExceptionCode.REFRESH_TOKEN_MISSMATCHED);
        }


    }

    private Map<String, Object> verifyRefreshJws(String jws) {
        try {
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
            System.out.println("Refresh : " + claims);
            return claims;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(ExceptionCode.REFRESH_TOKEN_EXPRIATION);
        }
    }


    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getMemberId());
        claims.put("name", member.getNickname());


        String subject = member.getEmail();
        Instant expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member){
        String subject = member.getEmail();
        Instant expiration =jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
        return refreshToken;
    }

}
