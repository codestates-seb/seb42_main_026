package seb42_main_026.mainproject.domain.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
<<<<<<< HEAD
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
    @AllArgsConstructor
    @Getter
>>>>>>> 4324089 (Feat: QuestionController Stub data 적용)
    public static class Response {
=======
    public static class Responses {
>>>>>>> 74f06b9 (Fix: commit 내용 수정)
=======
    public static class Responses {
>>>>>>> 954e762 (Feat: 게시글 조회 기능 구현(홈))
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
