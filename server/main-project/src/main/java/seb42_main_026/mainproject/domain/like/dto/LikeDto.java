package seb42_main_026.mainproject.domain.like.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

public class LikeDto {
    @Getter
    public static class Post {
        @Positive
        private Long memberId;
        @Positive
        private Long questionId;
    }

    @Getter
    public static class AnswerPost {
        @Positive
        private Long memberId;
        @Positive
        private Long answerId;
    }
}
