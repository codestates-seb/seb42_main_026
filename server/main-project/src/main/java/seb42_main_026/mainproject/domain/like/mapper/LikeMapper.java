package seb42_main_026.mainproject.domain.like.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb42_main_026.mainproject.domain.like.dto.LikeDto;
import seb42_main_026.mainproject.domain.like.entity.Like;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.entity.Question;

@Mapper(componentModel = "spring")
public interface LikeMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "questionId", target = "question.questionId")
    Like likePostDtoToLike(LikeDto.Post likePostDto);

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "answerId", target = "answer.answerId")
    Like answerLikeDtoToLike(LikeDto.AnswerPost answerLikeDto);
}
