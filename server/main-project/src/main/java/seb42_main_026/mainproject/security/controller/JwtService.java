package seb42_main_026.mainproject.security.controller;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.entity.Refresh;
import seb42_main_026.mainproject.domain.member.repository.RefreshRepository;
import seb42_main_026.mainproject.domain.member.service.MemberService;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
import seb42_main_026.mainproject.security.jwt.JwtTokenizer;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Map;

@Service
@AllArgsConstructor
public class JwtService {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final RefreshRepository refreshRepository;

    public ArrayList<String> verifyRefreshToken(HttpServletRequest request){

        String refreshToken = jwtTokenizer.extractRefreshToken(request).orElseThrow(() -> new CustomException(ExceptionCode.REFRESH_TOKEN_EXPRIATION));

        Member member = verifyMember(extractClaims(refreshToken));

        Refresh verifiedRefreshToken = verifyRefreshToken(member);

        refreshTokenMatches(refreshToken, verifiedRefreshToken.getRefresh());

        ArrayList<String> tokenContainer = new ArrayList<>();

        tokenContainer.add(updateAccessToken(member));
        tokenContainer.add(updateRefreshToken(member));

        return tokenContainer;

    }

    private Map<String, Object> extractClaims(String refreshToken){
        Map<String, Object> claims = jwtTokenizer.verifyRefreshJws(refreshToken);

        return claims;
    }

    private Refresh verifyRefreshToken(Member member){

        return refreshRepository.findByMember_MemberId(member.getMemberId()).orElseThrow(() -> new CustomException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND));
    }

    private void refreshTokenMatches(String requestRefresh, String savedRefresh){
        if (!requestRefresh.equals(savedRefresh)){
            throw new CustomException(ExceptionCode.REFRESH_TOKEN_MISSMATCHED);
        }
    }

    private Member verifyMember(Map<String, Object> claims){
        String username = claims.get("sub").toString();
        return memberService.findVerifiedMemberByEmail(username);
    }

    private String updateAccessToken(Member member){

        return jwtTokenizer.delegateAccessToken(member);
    }

    private String updateRefreshToken(Member member){
        Refresh updateRefresh = refreshRepository.findByMember_MemberId(member.getMemberId()).orElseThrow();
        String newRefreshToken = jwtTokenizer.delegateRefreshToken(member);
        updateRefresh.setRefresh(newRefreshToken);

        return newRefreshToken;

    }

}
