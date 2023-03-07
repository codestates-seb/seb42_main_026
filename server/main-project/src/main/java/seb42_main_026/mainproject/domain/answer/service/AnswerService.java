package seb42_main_026.mainproject.domain.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.answer.repository.AnswerRepository;

@Service
@RequiredArgsConstructor
public class AnswerService {

    //todo DI

    private final AnswerRepository answerRepository;



    /**
     * answer 에 회원 추가, 등록된 회원인지 확인 - todo
     * answer 에 질문 추가, 존재하는 질문인지 확인 - todo
     * 질문 작성한 회원인지 확인 - todo
     * 점수 증가 메서드(+10점) - todo
     */
    //memberId Request 에 포함되는지?
    public Answer createAnswer(Answer answer, long questionId, long memberId){
        //answer 에 회원 추가, 등록된 회원인지 확인
//        answer.addMember(memberService.findMember(memberId));
        //answer 에 질문 추가, 존재하는 질문인지 확인
//        answer.addQuestion(questionService.findQuestion(questionId));
        //답변등록자 == 질문등록자 -> 예외
//        if (memberId == answer.getQuestion().getMemberId())throw new ExceptionCode.???;
        //점수 증가 메서드(+10점)
//        answer.getMember().setScore(answer.getMember().getScore() + 10);

        return answerRepository.save(answer);
    }
}
