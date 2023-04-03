package seb42_main_026.mainproject.dto;

import lombok.AllArgsConstructor;
import seb42_main_026.mainproject.domain.question.dto.QuestionDto;

@AllArgsConstructor
public class QuestionWithLikeStatusDto {
    private QuestionDto.DetailResponse detailResponse;
    private boolean likeStatus;
}
