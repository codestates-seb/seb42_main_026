package seb42_main_026.mainproject.domain.answer.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class AnswerDto {
    @Getter
    public static class Post{
        private long memberId;
        private long questionId;
        @NotNull
        private String content;

        public void addQuestionId(long questionId){
            this.questionId = questionId;
        }
    }

    //todo Patch,Response 작성
    @Getter
    public static class Patch{}

    @AllArgsConstructor
    @Getter
    public static class Response{

    }
}
