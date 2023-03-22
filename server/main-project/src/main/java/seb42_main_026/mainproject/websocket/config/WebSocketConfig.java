package seb42_main_026.mainproject.websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import seb42_main_026.mainproject.websocket.handler.AlarmHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new AlarmHandler(), "/alarm") // 클라이언트와의 통신을 처리할 핸들러 등록
                .setAllowedOrigins("*") // Cors 설정
                .withSockJS(); // 웹소켓을 지원하지 않는 브라우저 환경에서도 비슷한 경험을 할 수 있는 기능을 제공, 프론트에서도 코드 추가해줘야함
    }
}
