package seb42_main_026.mainproject.domain.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.answer.repository.AnswerRepository;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.domain.member.service.MemberService;
import seb42_main_026.mainproject.domain.question.entity.Question;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {

    //todo DI

    private final AnswerRepository answerRepository;

    private final MemberService memberService;

    private final MemberRepository memberRepository;



    /**
     * answer 에 회원 추가, 등록된 회원인지 확인 - todo
     * answer 에 질문 추가, 존재하는 질문인지 확인 - todo
     * 질문 작성한 회원인지 확인 - todo
     * 점수 증가 메서드(+10점) - done
     */
    //memberId Request 에 포함되는지?
    public Answer createAnswer(Answer answer, long questionId, long memberId){
        //answer 에 회원 추가, 등록된 회원인지 확인
//        answer.setMember(memberService.findMember(memberId));
        //answer 에 질문 추가, 존재하는 질문인지 확인
//        answer.setQuestion(questionService.findQuestion(questionId));
        //답변등록자 == 질문등록자 -> 예외
//        if (memberId == answer.getQuestion().getMemberId())throw new ExceptionCode.???;
        //점수 증가 메서드(+10점)
        answer.getMember().setScore(answer.getMember().getScore() + 10);

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer, long memberId){
        Answer foundAnswer = findAnswer(answer.getAnswerId());

        //수정하려는 회원이 같은 회원인지 검증
//        memberService.verifyMemberByMemberId(memberId, foundAnswer.getMember().getMemberId());

        //람다식 문제 있을지??
        Optional.ofNullable(answer.getContent())
                .ifPresent(foundAnswer::setContent);

        return answerRepository.save(foundAnswer);
    }

    /** 필요 메서드
     * questionService.findQuestion() - todo
     * memberService.verifyMemberByMemberId() - todo
     * memberService.findMember() - todo
     */
    public void selectAnswer(long memberId, long questionId, long answerId){
//        //questionId 와 작성자 Id 같은지 검증
//        Question question = questionService.findQuestion(questionId);
//        memberService.verifyMemberByMemberId(memberId, question.getMember().getMemberId());
//
//        //answer 상태 채택으로 변경 -> 저장
//        Answer answer = findAnswer(answerId);
//        answer.setAnswerStatus(Answer.AnswerStatus.ANSWER_SELECTED);
//
//        //answer 작성자 점수 + 30 -> 저장
//        Member answerMember = memberService.findMember(answer.getMember().getMemberId());
//        answerMember.setScore(answerMember.getScore() + 30);
//
//        answerRepository.save(answer);
//        memberRepository.save(answerMember); // -> 이 과정 필요 없다.
    }

    // memberService.verifyMemberByMemberId() 메서드 필요 - todo
    public void deleteAnswer(long answerId, long memberId){
        Answer answer = findAnswer(answerId);
//        memberService.verifyMemberByMemberId(answer.getMember().getMemberId(), memberId);

        answerRepository.delete(answer);
    }

    public Answer findAnswer(long answerId){
        return findVerifiedAnswer(answerId);
    }

    //존재하는 질문인지 확인 메서드
    private Answer findVerifiedAnswer(long answerId){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer foundAnswer = optionalAnswer.orElseThrow(() -> new CustomException(ExceptionCode.ANSWER_NOT_FOUND));

        return foundAnswer;
    }
}
