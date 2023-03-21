package seb42_main_026.mainproject.domain.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import seb42_main_026.mainproject.cloud.service.S3StorageService;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.answer.repository.AnswerRepository;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.domain.member.service.MemberService;
import seb42_main_026.mainproject.domain.question.entity.Question;
import seb42_main_026.mainproject.domain.question.service.QuestionService;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
import seb42_main_026.mainproject.utils.CustomBeanUtils;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AnswerService {

    //todo DI

    private final AnswerRepository answerRepository;

    private final MemberService memberService;


    private final QuestionService questionService;

    private final CustomBeanUtils<Answer> customBeanUtils;

    private final S3StorageService s3StorageService;

    @Value("${cloud.aws.s3.url}")
    private String bucketUrl;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


    /**
     * answer 에 회원 추가, 등록된 회원인지 확인 - done
     * answer 에 질문 추가, 존재하는 질문인지 확인 - done
     * 질문 작성한 회원인지 확인 - todo
     * 미디어파일 업로드 기능 - todo
     * 점수 증가 메서드(+10점) - done
     */
    //memberId Request 에 포함되는지?
    public Answer createAnswer(Answer answer, MultipartFile mediaFile){
        //answer 에 회원 추가, 등록된 회원인지 확인
        memberService.verifyLoginMember(answer.getMember().getMemberId());
        //answer 에 질문 추가, 존재하는 질문인지 확인
        Question foundQuestion = questionService.findVerifiedQuestion(answer.getQuestion().getQuestionId());


        //진짜 - > 주석해제
        //mediaFile 이 null 이 아닐시, answer 에 이름 저장, S3 버킷에 업로드
        if (mediaFile != null){
            String encodedFileName = s3StorageService.encodeFileName(mediaFile);
            answer.setVoiceFileUrl(s3StorageService.getFileUrl(encodedFileName));
            s3StorageService.store(mediaFile, encodedFileName);
        }

        upAnswerCount(foundQuestion);

        //점수 증가 메서드(+10점) -> 메서드 갖다 쓰기
//        answer.getMember().setScore(answer.getMember().getScore() + 10);
        memberService.updateScore(answer.getMember().getMemberId(), 10L);

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer, long memberId){
        Answer foundAnswer = findAnswer(answer.getAnswerId());

        //로그인된 회원인지 확인
        memberService.verifyLoginMember(answer.getMember().getMemberId());

        //수정하려는 회원이 같은 회원인지 검증
        memberService.verifyMemberByMemberId(memberId,answer.getMember().getMemberId());

        //람다식 문제 있을지??
//        Optional.ofNullable(answer.getContent())
//                .ifPresent(foundAnswer::setContent);
        customBeanUtils.copyNonNullProperties(answer, foundAnswer);

        return answerRepository.save(foundAnswer);
    }

    //todo answer.getMember().getMemberId() == question.getMember().getMemberId() throw Exception
    public void selectAnswer(long memberId, long questionId, long answerId){
        //questionId 와 작성자 Id 같은지 검증
        Question question = questionService.findQuestion(questionId);
        memberService.verifyMemberByMemberId(memberId, question.getMember().getMemberId());
        //answer 작성자에 대한 검증 - todo
        Answer answer = findAnswer(answerId);
        if (memberId == answer.getMember().getMemberId())
            throw new CustomException(ExceptionCode.CANNOT_SELECT_OWN_ANSWER);

        //answer 상태 채택으로 변경 -> 저장
        answer.setAnswerStatus(Answer.AnswerStatus.ANSWER_SELECTED);

        //질문 상태 변경
        question.setQuestionStatus(Question.QuestionStatus.QUESTION_COMPLETE);

        //answer 작성자 점수 + 30 -> 저장
        Member answerMember = memberService.findVerifiedMember(answer.getMember().getMemberId());
//        answerMember.setScore(answerMember.getScore() + 30);
        memberService.updateScore(answerMember.getMemberId(), 30L);
//
        answerRepository.save(answer);
//        memberRepository.save(answerMember); // -> 이 과정 필요 없다.
    }

    // memberService.verifyMemberByMemberId() 메서드 필요 - todo
    public void deleteAnswer(long answerId, long memberId){
        Answer answer = findAnswer(answerId);
        memberService.verifyMemberByMemberId(answer.getMember().getMemberId(), memberId);

        Question foundQuestion = questionService.findVerifiedQuestion(answer.getQuestion().getQuestionId());

        downAnswerCount(foundQuestion);

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

    public void upAnswerCount(Question question){
        question.setAnswerCount(question.getAnswerCount()+1);
    }

    public void downAnswerCount(Question question){
        question.setAnswerCount(question.getAnswerCount()-1);
    }
}
