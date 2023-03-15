package seb42_main_026.mainproject.domain.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

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

    public static class Patch {
        private Long questionId;
        private String title;
        private String content;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Responses {
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
