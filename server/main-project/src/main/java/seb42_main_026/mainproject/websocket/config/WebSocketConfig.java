package seb42_main_026.mainproject.websocket.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import seb42_main_026.mainproject.websocket.handler.AlarmHandler;
import seb42_main_026.mainproject.websocket.interceptor.JwtHandshakeInterceptor;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {
    private final AlarmHandler alarmHandler;
    private final JwtHandshakeInterceptor jwtHandshakeInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(alarmHandler, "/alarm") // 클라이언트와의 통신을 처리할 핸들러 등록
                .setAllowedOrigins("*") // Cors 설정
                .addInterceptors(jwtHandshakeInterceptor)// JWT 사용을 위한 사용자 지정 핸드쉐이크 인터샙터 등록
                .withSockJS(); // 웹소켓을 지원하지 않는 브라우저 환경에서도 비슷한 경험을 할 수 있는 기능을 제공, 프론트에서도 코드 추가해줘야함
    }
}
