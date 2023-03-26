package seb42_main_026.mainproject.domain.like.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb42_main_026.mainproject.domain.like.dto.LikeDto;
import seb42_main_026.mainproject.domain.like.entity.AnswerLike;
import seb42_main_026.mainproject.domain.like.entity.QuestionLike;
import seb42_main_026.mainproject.domain.like.mapper.LikeMapper;
import seb42_main_026.mainproject.domain.like.service.LikeService;
import seb42_main_026.mainproject.domain.member.entity.Member;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@Validated
public class LikeController {
    private final LikeService likeService;
    private final LikeMapper likeMapper;

    @PostMapping("/{question-id}/likes")
    public ResponseEntity<?> postQuestionLike(@PathVariable("question-id") @Positive long questionId,
                                              @AuthenticationPrincipal Member auth) {
        LikeDto.QuestionPost likeQuestionPostDto = new LikeDto.QuestionPost();
        likeQuestionPostDto.setMemberId(auth.getMemberId());
        likeQuestionPostDto.setQuestionId(questionId);

        QuestionLike questionLike = likeMapper.likeQuestionPostDtoToLike(likeQuestionPostDto);

        likeService.toggleQuestionLike(questionLike);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/{question-id}/answers/{answer-id}/likes")
    public ResponseEntity<?> postAnswerLike(@PathVariable("answer-id") @Positive long answerId,
                                            @AuthenticationPrincipal Member auth) {
        LikeDto.AnswerPost likeAnswerPostDto = new LikeDto.AnswerPost();
        likeAnswerPostDto.setMemberId(auth.getMemberId());
        likeAnswerPostDto.setAnswerId(answerId);

        AnswerLike answerLike = likeMapper.likeAnswerPostDtoToLike(likeAnswerPostDto);

        likeService.toggleAnswerLike(answerLike);

        return ResponseEntity.ok().build();
    }

//    @PostMapping("/{question-id}/likes")
//    public ResponseEntity<?> postQuestionLike(@RequestBody @Valid LikeDto.QuestionPost likePostDto,
//                                              @PathVariable("question-id") @Positive long questionId) {
//        likePostDto.setQuestionId(questionId);
//        QuestionLike like = likeMapper.questionLikeDtoToLike(likePostDto);
//
//        QuestionLike createdLike = likeService.createQuestionLike(like);
//
//        URI location = UriCreator.createUri(LIKE_DEFAULT_URL, createdLike.getLikeId());
//
//        return ResponseEntity.created(location).build();
//    }

//    @PostMapping("/{question-id}/{answer-id}/likes")
//    public ResponseEntity<?> postAnswerLike(@RequestBody @Valid LikeDto.AnswerPost answerLikeDto,
//                                            @PathVariable("answer-id") @Positive long answerId) {
//        answerLikeDto.setAnswerId(answerId);
//        QuestionLike like = likeMapper.answerLikeDtoToLike(answerLikeDto);
//
//        QuestionLike createdLike = likeService.createAnswerLike(like);
//
//        URI location = UriCreator.createUri(LIKE_DEFAULT_URL, createdLike.getLikeId());
//
//        return ResponseEntity.created(location).build();
//    }

//    @DeleteMapping("/{question-id}/likes/{like-id}")
//    public ResponseEntity<?> deleteQuestionLike(@PathVariable("question-id") @Positive long questionId,
//                                                @PathVariable("like-id") @Positive long likeId,
//                                                @RequestParam @Positive long memberId) {
//        likeService.deleteQuestionLike(questionId, likeId, memberId);
//
//        return ResponseEntity.noContent().build();
//    }

//    @DeleteMapping("/{question-id}/{answer-id}/likes/{like-id}")
//    public ResponseEntity<?> deleteAnswerLike(@PathVariable("answer-id") @Positive long answerId,
//                                              @PathVariable("like-id") @Positive long likeId,
//                                              @RequestParam @Positive long memberId) {
//        likeService.deleteQuestionLike(answerId, likeId, memberId);
//
//        return ResponseEntity.noContent().build();
//    }
}
