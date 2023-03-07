package seb42_main_026.mainproject.domain.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
<<<<<<< HEAD
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

public class QuestionDto {
    @Getter
    @Setter
    public static class Post {
//        @Positive
//        private Long memberId;
        @NotBlank(message = "제목은 필수로 작성해야 합니다.")
        private String title;
        @NotBlank(message = "내용은 필수로 작성해야 합니다.")
        private String content;
    }

=======

public class QuestionDto {
    public static class Post {
        private String title;
        private String content;
    }
>>>>>>> 4324089 (Feat: QuestionController Stub data 적용)
    public static class Patch {
        private Long questionId;
        private String title;
        private String content;
    }
<<<<<<< HEAD

    @AllArgsConstructor
    @Getter
    @Setter
=======
    @AllArgsConstructor
    @Getter
>>>>>>> 4324089 (Feat: QuestionController Stub data 적용)
    public static class Response {
        private Long questionId;
        private String title;
        private String content;
        private String questionStatus;
    }
}
