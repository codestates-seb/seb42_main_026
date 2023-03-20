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

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final QuestionService questionService;

    private final AnswerService answerService;

    public Like createQuestionLike(Like like) {
        Question matchedQuestion =
                questionService.findVerifiedQuestion(like.getQuestion().getQuestionId());

        matchedQuestion.setLikeCount(matchedQuestion.getLikeCount() + 1);

        return likeRepository.save(like);
    }

    public Like createAnswerLike(Like like){
        Answer matchedAnswer =
                answerService.findAnswer(like.getAnswer().getAnswerId());

        matchedAnswer.setLikeCount(matchedAnswer.getLikeCount() + 1);

        return likeRepository.save(like);
    }
}
