package seb42_main_026.mainproject.domain.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
@Transactional
@RequiredArgsConstructor
public class AnswerService {

    //todo DI
    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final QuestionService questionService;
    private final CustomBeanUtils<Answer> customBeanUtils;
    private final S3StorageService s3StorageService;

    /**
     * 잔소리(답변) POST 비즈니스 로직_230307
     * NOTE : 활동 점수 증가 기능 추가_230316
     * NOTE : 오디오 파일 업로드 기능 추가_230317
     * NOTE : AnswerCount 증가 기능 추가_230320
     * NOTE : Controller 에서 인가(Authorization) 처리 하기때문에 불필요한 로직 삭제_230325
     */
    public Answer createAnswer(Answer answer, MultipartFile voiceFile) {

        // Answer 에 질문 추가, 존재하는 질문인지 확인
        Question foundQuestion = questionService.findVerifiedQuestion(answer.getQuestion().getQuestionId());

        //mediaFile 이 null 이 아닐시, answer 에 이름 저장, S3 버킷에 업로드
        if (voiceFile != null){
            storeVoiceFile(answer, voiceFile);
        }

        // 해당 질문의 답변 개수 증가
        upAnswerCount(foundQuestion);

        memberService.updateScore(answer.getMember().getMemberId(), 10L);

        return answerRepository.save(answer);
    }

    /**
     * 잔소리(답변) 수정(PATCH) 비즈니스 로직_230308
     * NOTE : CustomBeanUtils 을 이용한 리팩토링_230316
     * NOTE : 오디오 파일(URL) 수정 기능 추가_230321
     * NOTE : 오디오 파일(URL) 수정 기능 분리_230325
     * NOTE : Controller 에서 인가(Authorization) 처리 하기때문에 불필요한 로직 삭제_230325
     */
    public void updateAnswer(Answer answer) {
        Answer foundAnswer = findAnswer(answer.getAnswerId());

        //수정하려는 회원이 같은 회원인지 검증
        memberService.verifyMemberByMemberId(foundAnswer.getMember().getMemberId(),
                answer.getMember().getMemberId());

        customBeanUtils.copyNonNullProperties(answer, foundAnswer);

    }

    /**
     * 오디오 파일(URL) 수정 기능 분리_230325
     * NOTE : Controller 에서 인가(Authorization) 처리 하기때문에 불필요한 로직 삭제_230325
     */
    public void updateVoiceFile(long answerId, long memberId, MultipartFile voiceFile) {
        Answer foundAnswer = findAnswer(answerId);

        //수정하려는 회원이 같은 회원인지 검증
        memberService.verifyMemberByMemberId(foundAnswer.getMember().getMemberId(), memberId);

        storeVoiceFile(foundAnswer, voiceFile);
    }

    /**
     * 잔소리(답변) 채택(PATCH) 비즈니스 로직_230308
     * NOTE : 채택 시, 질문 상태 변경 기능 추가_230316
     * NOTE : 채택 인가 처리 기능 추가_230321
     * NOTE : Controller 에서 인가(Authorization) 처리 하기때문에 불필요한 로직 삭제_230325
     */
    public void selectAnswer(long memberId, long questionId, long answerId) {

        //questionId 와 작성자 Id 같은지 검증
        Question question = questionService.findQuestion(questionId);
        memberService.verifyMemberByMemberId(memberId, question.getMember().getMemberId());

        //answer 작성자에 대한 검증
        Answer answer = findAnswer(answerId);

        if (memberId == answer.getMember().getMemberId())
            throw new CustomException(ExceptionCode.CANNOT_SELECT_OWN_ANSWER);

        //answerStatus 검증
        if (answer.getAnswerStatus().getStatus().equals("채택 질문")){
            throw new CustomException(ExceptionCode.SELECT_ONLY_ONCE);
        }

        //answer 상태 채택으로 변경 -> 저장
        answer.setAnswerStatus(Answer.AnswerStatus.ANSWER_SELECTED);

        //질문 상태 변경
        question.setQuestionStatus(Question.QuestionStatus.QUESTION_COMPLETE);

        //answer 작성자 점수 + 30 -> 저장
        Member answerMember = memberService.findVerifiedMember(answer.getMember().getMemberId());

        memberService.updateScore(answerMember.getMemberId(), 30L);
    }

    /**
     * 잔소리(답변) DELETE 비즈니스 로직_230309
     * NOTE : 삭제 시, 인가 처리 기능 추가_230316
     * NOTE : 삭제 시, 답변개수 차감기능 추가_230320
     * NOTE : 삭제 시, 점수 차감기능 추가_230324
     * NOTE : Controller 에서 인가(Authorization) 처리 하기때문에 불필요한 로직 삭제_230325
     */
    public void deleteAnswer(long answerId, long memberId) {

        Answer answer = findAnswer(answerId);
        memberService.verifyMemberByMemberId(answer.getMember().getMemberId(), memberId);

        Question foundQuestion = questionService.findVerifiedQuestion(answer.getQuestion().getQuestionId());

        downAnswerCount(foundQuestion);

        memberService.updateScore(memberId, -10L);

        answerRepository.delete(answer);
    }

    @Transactional(readOnly = true)
    public Answer findAnswer(long answerId) {
        return findVerifiedAnswer(answerId);
    }

    //존재하는 질문인지 확인 메서드
    private Answer findVerifiedAnswer(long answerId){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);

        return optionalAnswer.orElseThrow(() -> new CustomException(ExceptionCode.ANSWER_NOT_FOUND));
    }

    public void upAnswerCount(Question question){
        question.setAnswerCount(question.getAnswerCount()+1);
    }

    public void downAnswerCount(Question question){
        question.setAnswerCount(question.getAnswerCount()-1);
    }

    /**
     * create(),update() 에서 공통 사용 메서드 리팩토링_230321
     * NOTE : 미디어 파일 구분 업로드 처리 수정_230323
     */
    private void storeVoiceFile(Answer answer, MultipartFile mediaFile){
        String encodedFileName = s3StorageService.encodeFileName(mediaFile);
        answer.setVoiceFileUrl(s3StorageService.getFileUrl(encodedFileName));
        s3StorageService.voiceStore(mediaFile, encodedFileName);
    }
}
