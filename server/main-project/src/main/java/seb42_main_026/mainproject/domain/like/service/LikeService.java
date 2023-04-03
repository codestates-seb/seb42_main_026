package seb42_main_026.mainproject.domain.like.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.answer.service.AnswerService;
import seb42_main_026.mainproject.domain.like.dto.LikeDto;
import seb42_main_026.mainproject.domain.like.entity.AnswerLike;
import seb42_main_026.mainproject.domain.like.entity.QuestionLike;
import seb42_main_026.mainproject.domain.like.repository.AnswerLikeRepository;
import seb42_main_026.mainproject.domain.like.repository.QuestionLikeRepository;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.service.MemberService;
import seb42_main_026.mainproject.domain.question.entity.Question;
import seb42_main_026.mainproject.domain.question.service.QuestionService;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {
    private final QuestionLikeRepository questionLikeRepository;
    private final AnswerLikeRepository answerLikeRepository;
    private final MemberService memberService;
    private final QuestionService questionService;
    private final AnswerService answerService;

    public void toggleQuestionLike(QuestionLike questionLike) {
        // 좋아요를 하려는 질문
        Question question = questionService.findVerifiedQuestion(questionLike.getQuestion().getQuestionId());

        // 좋아요를 하려는 회원
        Member member = memberService.findVerifiedMember(questionLike.getMember().getMemberId());

        // 질문과 회원으로 매칭되는 좋아요
        QuestionLike foundQuestionLike = questionLikeRepository.findByQuestionAndMember(question, member);

        // 아직 좋아요가 없으면
        if (foundQuestionLike == null) {
            question.setLikeCount(question.getLikeCount() + 1); // 해당 질문의 좋아요 +1
            questionLikeRepository.save(questionLike); // 좋아요 저장
        } else { // 좋아요가 있으면
            question.setLikeCount(question.getLikeCount() - 1); // 해당 질문의 좋아요 -1
            questionLikeRepository.delete(foundQuestionLike); // 좋아요 삭제
        }
    }

    public void toggleAnswerLike(AnswerLike answerLike) {
        // 좋아요를 하려는 답변
        Answer answer = answerService.findAnswer(answerLike.getAnswer().getAnswerId());

        // 좋아요를 하려는 회원
        Member member = memberService.findVerifiedMember(answerLike.getMember().getMemberId());

        // 답변과 회원으로 매칭되는 좋아요
        AnswerLike foundAnswerLike = answerLikeRepository.findByAnswerAndMember(answer, member);

        // 아직 좋아요가 없으면
        if (foundAnswerLike == null) {
            answer.setLikeCount(answer.getLikeCount() + 1); // 해당 답변의 좋아요 +1
            answerLikeRepository.save(answerLike); // 좋아요 저장
        } else { // 좋아요가 있으면
            answer.setLikeCount(answer.getLikeCount() - 1); // 해당 답변의 좋아요 -1
            answerLikeRepository.delete(foundAnswerLike); // 좋아요 삭제
        }
    }

//    public QuestionLike createQuestionLike(QuestionLike like) {
//        // 로그인한 회원인지 체크
//        memberService.verifyLoginMember(like.getMember().getMemberId());
//
//        // 좋아요를 추가할 질문
//        Question matchedQuestion =
//                questionService.findVerifiedQuestion(like.getQuestion().getQuestionId());
//
//        // 해당 질문의 좋아요 리스트
//        List<QuestionLike> likes = matchedQuestion.getQuestionLikes();
//
//        // 회원이 이미 좋아요를 했는지 체크
//        verifyAlreadyLiked(like, likes);
//
//        // 처음 좋아요를 한다면
//        // 좋아요 리스트에 추가
//        likes.add(like);
//        // 질문의 좋아요 개수 업데이트
//        matchedQuestion.setLikeCount(matchedQuestion.getLikeCount() + 1);
//
//        return questionLikeRepository.save(like);
//    }

//    public QuestionLike createAnswerLike(QuestionLike like) {
//        // 로그인한 회원인지 체크
//        memberService.verifyLoginMember(like.getMember().getMemberId());
//
//        // 좋아요를 추가할 답변
//        Answer matchedAnswer =
//                answerService.findAnswer(like.getAnswer().getAnswerId());
//
//        // 해당 답변의 좋아요 리스트
//        List<QuestionLike> likes = matchedAnswer.getQuestionLikes();
//
//        // 회원이 이미 좋아요를 했는지 체크
//        verifyAlreadyLiked(like, likes);
//
//        // 처음 좋아요를 한다면
//        // 좋아요 리스트에 추가
//        likes.add(like);
//        // 답변의 좋아요 개수 업데이트
//        matchedAnswer.setLikeCount(matchedAnswer.getLikeCount() + 1);
//
//        return questionLikeRepository.save(like);
//    }

//    public void deleteQuestionLike(long questionId, long likeId, long memberId) {
//        // 로그인한 회원인지 체크
//        memberService.verifyLoginMember(memberId);
//
//        // 삭제 대상 QuestionLike
//        QuestionLike foundLike = findVerifiedLike(likeId);
//
//        // 자신의 좋아요인지 체크
//        memberService.verifyMemberByMemberId(foundLike.getMember().getMemberId(), memberId);
//
//        // 삭제 대상 Like의 질문
//        Question foundQuestion = questionService.findVerifiedQuestion(questionId);
//
//        // 해당 질문의 좋아요 수 감소
//        foundQuestion.setLikeCount(foundQuestion.getLikeCount() - 1);
//
//        questionLikeRepository.delete(foundLike);
//
////        // 좋아요를 취소할 질문
////        Question foundQuestion = questionService.findVerifiedQuestion(questionId);
////
////        // 해당 질문의 좋아요 리스트
////        List<QuestionLike> likes = foundQuestion.getQuestionLikes();
////
////        // 자신의 좋아요만 삭제 가능
////
////        // 좋아요 아이디랑 일치하는 좋아요 삭제
////        likes.stream()
////                .filter(like -> like.getLikeId() == likeId)
////                .forEach(like -> questionLikeRepository.deleteById(likeId));
//    }

//    public void deleteAnswerLike(long answerId, long likeId, long memberId) {
//        // 로그인한 회원인지 체크
//        memberService.verifyLoginMember(memberId);
//
//        // 삭제 대상 QuestionLike
//        QuestionLike foundLike = findVerifiedLike(likeId);
//
//        // 자신의 좋아요인지 체크
//        memberService.verifyMemberByMemberId(foundLike.getMember().getMemberId(), memberId);
//
//        // 삭제 대상 Like의 답변
//        Answer foundAnswer = answerService.findAnswer(answerId);
//
//        // 해당 답변의 좋아요 수 감소
//        foundAnswer.setLikeCount(foundAnswer.getLikeCount() - 1);
//
//        questionLikeRepository.delete(foundLike);
//    }

//    private QuestionLike findVerifiedLike(long likeId) {
//        Optional<QuestionLike> optionalLike =
//                questionLikeRepository.findById(likeId);
//
//        return optionalLike.orElseThrow(() ->
//                new CustomException(ExceptionCode.LIKE_NOT_FOUND));
//    }
//
//    private void verifyAlreadyLiked(QuestionLike questionLike, List<QuestionLike> questionLikes) {
//        // 이미 해당 질문에 좋아요를 등록한 멤버라면 true, 아니라면 false
//        boolean checkAlreadyLiked = questionLikes.stream()
//                .anyMatch(eachLike -> Objects.equals(eachLike.getMember().getMemberId(), questionLike.getMember().getMemberId()));
//
//        // 이미 좋아요를 등록했는데, 또 좋아요를 하려고 하면 예외 발생
//        if (checkAlreadyLiked) {
//            throw new CustomException(ExceptionCode.ALREADY_LIKED);
//        }
//    }
}
