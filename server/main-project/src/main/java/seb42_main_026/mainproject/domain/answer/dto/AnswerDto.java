package seb42_main_026.mainproject.domain.answer.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import seb42_main_026.mainproject.domain.answer.entity.Answer;

import javax.validation.constraints.NotBlank;

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
    @Setter
    public static class Patch{
        private long memberId;

        private long answerId;

        @NotBlank(message = "내용을 입력해 주세요.")
        private String content;

        //채택 시, 스테이스 변경도 Patch 로
        private Answer.AnswerStatus answerStatus;
    }

    @AllArgsConstructor
    @Getter
    public static class Response{

    }
}
