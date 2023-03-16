package seb42_main_026.mainproject.domain.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb42_main_026.mainproject.domain.answer.dto.AnswerDto;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.comment.dto.CommentDto;
import seb42_main_026.mainproject.domain.comment.entity.Comment;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.dto.QuestionDto;
import seb42_main_026.mainproject.domain.question.entity.Question;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto);

    @Mapping(source = "memberId", target = "member.memberId")
    Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatchDto);

    default QuestionDto.DetailResponse questionToQuestionDetailResponseDto(Question question) {
        QuestionDto.DetailResponse detailResponse = new QuestionDto.DetailResponse();
        detailResponse.setQuestionId(question.getQuestionId());
        detailResponse.setMemberId(question.getMember().getMemberId());
        detailResponse.setTitle(question.getTitle());
        detailResponse.setContent(question.getContent());
        detailResponse.setNickname(question.getMember().getNickname());
        detailResponse.setCreatedAt(question.getCreatedAt());
        detailResponse.setQuestionStatus(question.getQuestionStatus().getDescription());
        detailResponse.setLikeCount(question.getLikeCount());

        List<Answer> answers = question.getAnswers();
        List<AnswerDto.Response> answerResponses = answers.stream()
                        .map(answer -> {
                            AnswerDto.Response answerResponse = new AnswerDto.Response();
                            answerResponse.setAnswerId(answer.getAnswerId());
                            answerResponse.setMemberId(answer.getMember().getMemberId());
                            answerResponse.setNickname(answer.getMember().getNickname());
                            answerResponse.setContent(answer.getContent());
                            answerResponse.setAnswerStatus(answer.getAnswerStatus().getStatus());
                            answerResponse.setCreatedAt(answer.getCreatedAt());
////                            answerResponseDto.setProfileImgUrl(answer.getProfileImgUrl());
////                            answerResponseDto.setVoiceFileUrl(answer.getVoiceFileUrl());
                            answerResponse.setLikeCount(answer.getLikeCount());
                            List<Comment> comments = answer.getComments();
                            List<CommentDto.Response> commentResponses = comments.stream()
                                    .map(comment -> {
                                        CommentDto.Response commentResponse = new CommentDto.Response();
                                        commentResponse.setCommentId(comment.getCommentId());
                                        commentResponse.setAnswerId(comment.getAnswer().getAnswerId());
                                        commentResponse.setMemberId(comment.getMember().getMemberId());
                                        commentResponse.setContent(comment.getContent());
                                        commentResponse.setNickname(comment.getMember().getNickname());
                                        commentResponse.setCreatedAt(comment.getCreatedAt());

                                        return commentResponse;
                                    }).collect(Collectors.toList());

                            answerResponse.setComments(commentResponses);

                            return answerResponse;
                        }).collect(Collectors.toList());

        detailResponse.setAnswers(answerResponses);

        return detailResponse;
    };

    @Mapping(source = "member.memberId", target = "memberId")
    QuestionDto.Response questionToQuestionResponseDto(Question question);

    List<QuestionDto.Response> questionsToQuestionResponseDtos(List<Question> questions);
}
