package seb42_main_026.mainproject.domain.comment.mapper;

import org.mapstruct.Mapper;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.comment.dto.CommentDto;
import seb42_main_026.mainproject.domain.comment.entity.Comment;
import seb42_main_026.mainproject.domain.member.entity.Member;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
//    Comment commentPostDtoToComment(CommentDto.Post commentPostDto);
    default Comment commentPostDtoToComment(CommentDto.Post commentPostDto){
        Comment comment = new Comment();

        Member member = new Member();
        member.setMemberId(commentPostDto.getMemberId());

        Answer answer = new Answer();
        answer.setAnswerId(commentPostDto.getAnswerId());

        comment.setMember(member);
        comment.setAnswer(answer);
        comment.setContent(commentPostDto.getContent());

        return comment;
    }

    Comment commentPatchDtoToComment(CommentDto.Patch commentPatchDto);

    CommentDto.Response commentToCommentResponse(Comment comment);

    List<CommentDto.Response> commentsToCommentResponses(List<Comment> comments);
}
