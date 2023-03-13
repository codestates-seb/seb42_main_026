package seb42_main_026.mainproject.domain.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.dto.QuestionDto;
import seb42_main_026.mainproject.domain.question.entity.Question;
import seb42_main_026.mainproject.domain.tag.Tag;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    default Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto) {
        Question question = new Question();
        question.setTitle(questionPostDto.getTitle());
        question.setContent(questionPostDto.getContent());

        Member member = new Member();
        member.setMemberId(questionPostDto.getMemberId());

        question.setMember(member);

        return question;
    };

    QuestionDto.Response questionToQuestionResponseDto(Question question);
}
