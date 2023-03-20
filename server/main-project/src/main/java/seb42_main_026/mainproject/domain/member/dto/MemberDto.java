package seb42_main_026.mainproject.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {

    @Getter
    public static class Post{

        @NotBlank
        @Email
        private String email;

        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", message = "비밀번호는 영문과 특수문자(@, $, !, %, *, ?, &) 숫자를 포함하여, 8자 이상 20자 이하여야 합니다." )
        private String password;

        @Pattern(regexp = "^[a-zA-Z0-9가-힣]{2,10}$", message = "별명은 2자 이상 10자 이하, 영어 또는 한글 또는 숫자로 구성되어야 합니다.")
        private String nickname;

    }

    @Getter
    public static class Patch{

        @Pattern(regexp = "^[a-zA-Z0-9가-힣]{2,10}$", message = "별명은 2자 이상 10자 이하, 영어 또는 한글 또는 숫자로 구성되어야 합니다.")
        private String nickname;
    }

    @Getter
    public static class PatchPassword{

        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", message = "비밀번호는 영문과 특수문자(@, $, !, %, *, ?, &) 숫자를 포함하여, 8자 이상 20자 이하여야 합니다." )
        private String password;

        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", message = "비밀번호는 영문과 특수문자(@, $, !, %, *, ?, &) 숫자를 포함하여, 8자 이상 20자 이하여야 합니다." )
        private String changepassword;


    }

    @Getter
    @AllArgsConstructor
    public static class Response{

//        private Long memberId;

        private String email;

        private String nickname;

        private Long score;

        private String hammerTier;

//        private int rank;
//
//        private String profileImageUrl;


    }
}
