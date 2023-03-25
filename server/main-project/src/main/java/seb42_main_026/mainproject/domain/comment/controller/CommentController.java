package seb42_main_026.mainproject.domain.comment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb42_main_026.mainproject.domain.comment.dto.CommentDto;
import seb42_main_026.mainproject.domain.comment.entity.Comment;
import seb42_main_026.mainproject.domain.comment.mapper.CommentMapper;
import seb42_main_026.mainproject.domain.comment.service.CommentService;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.dto.SingleResponseDto;
import seb42_main_026.mainproject.security.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping //todo endpoint 작성
@RequiredArgsConstructor
@Validated
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;

    @PostMapping("/questions/{question-id}/answers/{answer-id}")
    public ResponseEntity<?> postComment(@AuthenticationPrincipal Member auth,
                                         @PathVariable("answer-id") @Positive long answerId,
                                         @Valid @RequestBody CommentDto.Post commentPostDto){
        commentPostDto.setAnswerId(answerId);
        commentPostDto.setMemberId(auth.getMemberId());

        Comment comment = commentService.createComment(
                mapper.commentPostDtoToComment(commentPostDto));

        URI location = UriCreator.createUri("/comments", comment.getCommentId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/questions/{question-id}/answers/{answer-id}/comments/{comment-id}")
    public ResponseEntity<?> patchComment(@AuthenticationPrincipal Member auth,
                                          @PathVariable("comment-id") @Positive long commentId,
                                          @Valid @RequestBody CommentDto.Patch commentPatchDto){
        commentPatchDto.setCommentId(commentId);
        commentPatchDto.setMemberId(auth.getMemberId());

        commentService.updateComment(
                mapper.commentPatchDtoToComment(commentPatchDto), commentPatchDto.getMemberId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/questions/{question-id}/answers/{answer-id}/comments/{comment-id}")
    public ResponseEntity<?> deleteComment(@AuthenticationPrincipal Member auth,
                                           @PathVariable("comment-id") @Positive long commentId){
        commentService.deleteComment(commentId, auth.getMemberId());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
