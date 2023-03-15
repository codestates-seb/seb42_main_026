package seb42_main_026.mainproject.domain.like.mapper;

import org.mapstruct.Mapper;
import seb42_main_026.mainproject.domain.like.dto.LikeDto;
import seb42_main_026.mainproject.domain.like.entity.Like;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.entity.Question;

@Mapper(componentModel = "spring")
public interface LikeMapper {
    default Like likePostDtoToLike(LikeDto.Post likePostDto) {
        Like like = new Like();

        Member member = new Member();
        member.setMemberId(likePostDto.getMemberId());

        Question question = new Question();
        question.setQuestionId(likePostDto.getQuestionId());

        like.setMember(member);
        like.setQuestion(question);

        return like;
    }
}
