package seb42_main_026.mainproject.security.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;


@RestController
@RequiredArgsConstructor
public class JwtController {
    private final JwtService jwtService;

    @Transactional
    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {

        ArrayList<String> tokenContainer = jwtService.verifyRefreshToken(request);

        return ResponseEntity.noContent()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenContainer.get(0))
                .header("Refresh", tokenContainer.get(1))
                .build();


    }
}


