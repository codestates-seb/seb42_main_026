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
        Map<String, Object> claims = jwtTokenizer.verifyRefreshJws(refreshToken);
        String username = claims.get("sub").toString();
        Member member = memberService.findVerifiedMemberByEmail(username);
        Refresh refresh = refreshRepository.findByMember_MemberId(member.getMemberId()).orElseThrow();

        // Refresh 토큰 멤버와 대조
        if (refreshToken.equals(refresh.getRefresh())  ) {

            String accessToken = jwtTokenizer.delegateAccessToken(member);
            String newRefreshToken = jwtTokenizer.delegateRefreshToken(member);

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
}
