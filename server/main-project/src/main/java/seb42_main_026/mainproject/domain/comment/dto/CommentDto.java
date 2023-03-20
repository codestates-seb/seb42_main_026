package seb42_main_026.mainproject.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class CommentDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post{
        private long answerId;

        private long memberId;

        private String content;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch{
        private long memberId;
        private long answerId;
        private long commentId;
        private String content;

    }

    @Getter
    @Setter
    public static class Response{
        private long commentId;
        private long answerId;
        private long memberId;
        private String content;
        private String nickname;
        private LocalDateTime createdAt;
        private String profileImageUrl;

    }
}
