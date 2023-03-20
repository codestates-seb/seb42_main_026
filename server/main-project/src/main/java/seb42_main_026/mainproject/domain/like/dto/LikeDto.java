package seb42_main_026.mainproject.domain.like.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

public class LikeDto {
    @Getter
    @Setter
    public static class QuestionPost {
        @Positive
        private Long memberId;
        private Long questionId;
    }

    @Getter
    @Setter
    public static class AnswerPost {
        @Positive
        private Long memberId;
        private Long answerId;
    }
}
