package seb42_main_026.mainproject.domain.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class QuestionDto {
    public static class Post {
        private Long memberId;
        private String title;
        private String content;
    }

    public static class Patch {
        private Long questionId;
        private String title;
        private String content;
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private Long questionId;
        private String title;
        private String content;
        private String questionStatus;
    }
}
