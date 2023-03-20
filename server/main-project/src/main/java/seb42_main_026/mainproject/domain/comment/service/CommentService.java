package seb42_main_026.mainproject.domain.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb42_main_026.mainproject.domain.answer.service.AnswerService;
import seb42_main_026.mainproject.domain.comment.entity.Comment;
import seb42_main_026.mainproject.domain.comment.repository.CommentRepository;
import seb42_main_026.mainproject.domain.member.service.MemberService;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final MemberService memberService;
    private final AnswerService answerService;
    private final CommentRepository commentRepository;

    public Comment createComment(Comment comment){
        //comment 에 회원 연결
        memberService.findVerifiedMember(comment.getMember().getMemberId());
        //comment 에 답변 연결
        answerService.findAnswer(comment.getAnswer().getAnswerId());

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment, long memberId){
        Comment foundComment = findComment(comment.getCommentId());
        // todo MemberService verifyMemberByMemberId 메서드 추가
//        memberService.verifyMemberByMemberId(memberId, foundComment.getMember().getMemberId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(foundComment::setContent);

        return commentRepository.save(foundComment);
    }

    public void deleteComment(long commentId, long memberId){
        Comment comment = findComment(commentId);

        memberService.verifyMemberByMemberId(memberId, comment.getMember().getMemberId());

        commentRepository.delete(comment);
    }

    public Comment findComment(long commentId){
        return findVerifiedComment(commentId);
    }

    private Comment findVerifiedComment(long commentId){
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment foundComment = optionalComment.orElseThrow(() -> new CustomException(ExceptionCode.COMMENT_NOT_FOUND));

        return foundComment;
    }
}
