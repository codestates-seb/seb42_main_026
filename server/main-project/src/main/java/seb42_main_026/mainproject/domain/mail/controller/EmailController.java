package seb42_main_026.mainproject.domain.mail.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import seb42_main_026.mainproject.domain.mail.dto.EmailConfirmRequestDto;
import seb42_main_026.mainproject.domain.mail.service.EmailService;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("emailConfirm")
    public String mailConfirm(@RequestBody EmailConfirmRequestDto emailConfirmRequestDto) throws MessagingException, UnsupportedEncodingException {
        String authCode = emailService.sendEmail(emailConfirmRequestDto.getEmail());

        return authCode;
    }

}
