package seb42_main_026.mainproject.domain.like.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.answer.service.AnswerService;
import seb42_main_026.mainproject.domain.like.entity.Like;
import seb42_main_026.mainproject.domain.like.repository.LikeRepository;
import seb42_main_026.mainproject.domain.question.entity.Question;
import seb42_main_026.mainproject.domain.question.service.QuestionService;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final QuestionService questionService;
    private final AnswerService answerService;

    public Like createQuestionLike(Like like) {
        // 좋아요를 추가할 질문
        Question matchedQuestion =
                questionService.findVerifiedQuestion(like.getQuestion().getQuestionId());

        // 해당 질문의 좋아요 리스트
        List<Like> likes = matchedQuestion.getLikes();

        // 회원이 이미 좋아요를 했는지 체크
        verifyAlreadyLiked(like, likes);

        // 처음 좋아요를 한다면
        // 좋아요 리스트에 추가
        likes.add(like);
        // 질문의 좋아요 개수 업데이트
        matchedQuestion.setLikeCount(matchedQuestion.getLikeCount() + 1);

        return likeRepository.save(like);
    }

    public Like createAnswerLike(Like like){
        Answer matchedAnswer =
                answerService.findAnswer(like.getAnswer().getAnswerId());

        // 해당 답변의 좋아요 리스트
        List<Like> likes = matchedAnswer.getLikes();

        // 회원이 이미 좋아요를 했는지 체크
        verifyAlreadyLiked(like, likes);

        // 처음 좋아요를 한다면
        // 좋아요 리스트에 추가
        likes.add(like);
        // 답변의 좋아요 개수 업데이트
        matchedAnswer.setLikeCount(matchedAnswer.getLikeCount() + 1);

        return likeRepository.save(like);
    }

    private void verifyAlreadyLiked(Like like, List<Like> likes) {
        // 이미 해당 질문에 좋아요를 등록한 멤버라면 true, 아니라면 false
        boolean checkAlreadyLiked = likes.stream()
                .anyMatch(eachLike -> Objects.equals(eachLike.getMember().getMemberId(), like.getMember().getMemberId()));

        // 이미 좋아요를 등록했는데, 또 좋아요를 하려고 하면 예외 발생
        if (checkAlreadyLiked) {
            throw new CustomException(ExceptionCode.ALREADY_LIKED);
        }
    }
}
