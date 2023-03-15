package seb42_main_026.mainproject.domain.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.dto.QuestionDto;
import seb42_main_026.mainproject.domain.question.entity.Question;

import java.util.List;

<<<<<<< HEAD
=======
>>>>>>> 81f9d3b628d79cb1146191fa216b3ff99d602ddc
@Mapper(componentModel = "spring")
public interface QuestionMapper {
    default Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto) {
        Question question = new Question();
        question.setTitle(questionPostDto.getTitle());
        question.setContent(questionPostDto.getContent());
<<<<<<< HEAD
<<<<<<< HEAD
=======

        Member member = new Member();
        member.setMemberId(questionPostDto.getMemberId());

        question.setMember(member);

        return question;
    };
>>>>>>> d1bc2d9 (Refactor: API 명세서 내용에 맞게 createQuestion 리팩토링)
=======
>>>>>>> 81f9d3b628d79cb1146191fa216b3ff99d602ddc

        Member member = new Member();
        member.setMemberId(questionPostDto.getMemberId());

        question.setMember(member);

        return question;
    };

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "questionStatus.description", target = "questionStatus")
    QuestionDto.Responses questionToQuestionResponseDto(Question question);

    List<QuestionDto.Responses> questionsToQuestionResponseDtos(List<Question> questions);
}
