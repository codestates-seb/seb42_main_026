package seb42_main_026.mainproject.domain.like.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

<<<<<<< HEAD
    public Like createLike(Like like) {
        Question matchedQuestion =
                questionService.findVerifiedQuestion(like.getQuestion().getQuestionId());
=======
    public Like createLike(Like like, long questionId) {
        Question matchedQuestion = questionService.findVerifiedQuestion(questionId);
>>>>>>> 954e762 (Feat: 게시글 조회 기능 구현(홈))

        matchedQuestion.setLikeCount(matchedQuestion.getLikeCount() + 1);

        return likeRepository.save(like);
    }
}
