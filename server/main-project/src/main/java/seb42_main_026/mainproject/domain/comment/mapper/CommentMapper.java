package seb42_main_026.mainproject.domain.comment.mapper;

import org.mapstruct.Mapper;
import seb42_main_026.mainproject.domain.comment.dto.CommentDto;
import seb42_main_026.mainproject.domain.comment.entity.Comment;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.Post commentPostDto);

    Comment commentPatchDtoToComment(CommentDto.Patch commentPatchDto);

    CommentDto.Response commentToCommentResponse(Comment comment);

    List<CommentDto.Response> commentsToCommentResponses(List<Comment> comments);
}
