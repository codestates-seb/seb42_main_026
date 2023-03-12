package seb42_main_026.mainproject.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

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
    @AllArgsConstructor
    public static class Patch{
        private long memberId;
        private long answerId;
        private String content;

    }

    public static class Response{
        private long answerId;
        private String content;
        private String nickname;

    }
}
