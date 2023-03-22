package seb42_main_026.mainproject.websocket.interceptor;

import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import seb42_main_026.mainproject.security.jwt.JwtTokenizer;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtHandshakeInterceptor extends HttpSessionHandshakeInterceptor {
    private final JwtTokenizer jwtTokenizer;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        UriComponents uriComponents = UriComponentsBuilder.fromUri(request.getURI()).build();

        String authorization = uriComponents.getQueryParams().getFirst("Authorization");
        assert authorization != null;

        String jws = authorization.replace("Bearer ", "");

        Map<String, Object> claims = jwtTokenizer.getClaims(jws, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey())).getBody();
        Long memberId = (Long) claims.get("memberId");

        attributes.put("memberId", memberId);

        return true;
    }
}
