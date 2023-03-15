package seb42_main_026.mainproject.domain.answer.mapper;

import org.mapstruct.Mapper;
import seb42_main_026.mainproject.domain.answer.dto.AnswerDto;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.comment.dto.CommentDto;
import seb42_main_026.mainproject.domain.comment.entity.Comment;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.dto.QuestionDto;
import seb42_main_026.mainproject.domain.question.entity.Question;

import javax.validation.groups.Default;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
//    Answer answerPostDtoToAnswer(AnswerDto.Post answerPostDto);
    default Answer answerPostDtoToAnswer(AnswerDto.Post answerPostDto){
        Answer answer = new Answer();

        Member member = new Member();
        member.setMemberId(answerPostDto.getMemberId());

        Question question = new Question();
        question.setQuestionId(answerPostDto.getQuestionId());

        answer.setMember(member);
        answer.setQuestion(question);
        answer.setContent(answerPostDto.getContent());
//        answer.setVoiceFileUrl(answerPostDto.getVoiceFileUrl());

        return answer;
    }
    Answer answerPatchDtoToAnswer(AnswerDto.Patch answerPatchDto);

    //todo 필요한가?
//    AnswerDto.Response answerToAnswerResponse(Answer answer);
    default AnswerDto.Response answerToAnswerResponse(Answer answer){
        if (answer == null){return null;}

        AnswerDto.Response answerResponseDto = new AnswerDto.Response();

        answerResponseDto.setMemberId(answer.getMember().getMemberId());
        answerResponseDto.setNickname(answer.getMember().getNickname());
        answerResponseDto.setAnswerId(answer.getAnswerId());
        answerResponseDto.setContent(answer.getContent());
        answerResponseDto.setAnswerStatus(answer.getAnswerStatus());
        answerResponseDto.setCreatedAt(answer.getCreatedAt());
//        answerResponseDto.setProfileImgUrl(answer.getProfileImgUrl());
//        answerResponseDto.setVoiceFileUrl(answer.getVoiceFileUrl());
//        answerResponseDto.setLikeCount(answer.getLikeCount());

        List<Comment> comments = answer.getComments();

        List<CommentDto.Response> commentResponseList = comments.stream().map(comment -> {
            CommentDto.Response commentResponse = new CommentDto.Response();
            commentResponse.setCommentId(comment.getCommentId());
            commentResponse.setAnswerId(comment.getAnswer().getAnswerId());
            commentResponse.setMemberId(comment.getMember().getMemberId());
            commentResponse.setContent(comment.getContent());
            commentResponse.setNickname(comment.getMember().getNickname());
            commentResponse.setCreatedAt(comment.getCreatedAt());
//            commentResponse.setProfileImgUrl(comment.getProfileImgUrl());
            return commentResponse;
        }).collect(Collectors.toList());

        answerResponseDto.setComments(commentResponseList);

        return answerResponseDto;
    }

    List<AnswerDto.Response> answersToAnswerResponses(List<Answer> answers);
}
