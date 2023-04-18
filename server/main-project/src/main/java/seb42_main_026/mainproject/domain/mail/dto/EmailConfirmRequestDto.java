package seb42_main_026.mainproject.domain.mail.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class EmailConfirmRequestDto {

    @NotBlank(message = "이메일을 입력해 주세요.")
    private String email;

}
