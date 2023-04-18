package seb42_main_026.mainproject.security.filter;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.security.jwt.JwtTokenizer;
import seb42_main_026.mainproject.security.utils.CustomAuthorityUtils;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
        Map<String, Object> claims = verifyJws(request);

        setAuthenticationToContext(claims);

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }


    // JWT를 검증하는데 사용되는 private 메서드이다.
    private Map<String, Object> verifyJws(HttpServletRequest request){

        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims){

        String username = (String) claims.get("name");
        Integer memberId = (Integer) claims.get("memberId");

        Member member = new Member();
        member.setEmail(username);
        member.setMemberId(Long.valueOf(memberId));

        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(member, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


}