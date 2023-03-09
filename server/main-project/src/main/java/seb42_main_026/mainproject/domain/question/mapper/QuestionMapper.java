package seb42_main_026.mainproject.domain.question.mapper;

import org.mapstruct.Mapper;
import seb42_main_026.mainproject.domain.question.dto.QuestionDto;
import seb42_main_026.mainproject.domain.question.entity.Question;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto);

    QuestionDto.Response questionToQuestionResponseDto(Question question);
}
