package seb42_main_026.mainproject.domain.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import seb42_main_026.mainproject.domain.answer.dto.AnswerDto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {
    @Getter
    @Setter
    public static class Post {
        private Long memberId;
        @NotBlank(message = "제목은 필수로 작성해야 합니다.")
        private String title;
        @NotBlank(message = "내용은 필수로 작성해야 합니다.")
        private String content;
    }

    @Getter
    @Setter
    public static class Patch {
        private Long questionId;
        @Positive
        private Long memberId;
        private String title;
        private String content;
//        private String tagName;
    }

    @Getter
    @Setter
    public static class DetailResponse {
        private Long questionId;
        private Long memberId;
        private String title;
        private String content;
        private String nickname;
        private LocalDateTime createdAt;
        private String questionStatus;
        private int likeCount;
        private List<AnswerDto.Response> answers;
//        private int answerCount;
//        private String tagName;
//        private String profileImageUrl;
//        private String questionImageUrl;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response {
        private Long questionId;
        private Long memberId;
        private String title;
        private int likeCount;
//        private int answerCount;
//        private String tagName;
        private String questionStatus;
        private LocalDateTime createdAt;
    }
}
