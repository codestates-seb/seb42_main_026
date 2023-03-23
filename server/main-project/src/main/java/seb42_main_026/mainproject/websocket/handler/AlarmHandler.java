package seb42_main_026.mainproject.websocket.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class AlarmHandler extends TextWebSocketHandler {
    private final ConcurrentHashMap<Long, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Long memberId = (Long) session.getAttributes().get("memberId");
        sessions.put(memberId, session);
        session.sendMessage(new TextMessage("connected!"));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        Long memberId = (Long) session.getAttributes().get("memberId");
        sessions.remove(memberId);
    }

    public void sendAlarmToMember(Long memberId, String message) throws IOException {
        WebSocketSession session = sessions.get(memberId);

        if (session != null && session.isOpen()) {
            session.sendMessage(new TextMessage(message));
        }
    }
}
