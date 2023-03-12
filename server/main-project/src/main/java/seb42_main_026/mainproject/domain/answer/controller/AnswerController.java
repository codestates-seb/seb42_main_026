package seb42_main_026.mainproject.domain.answer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb42_main_026.mainproject.domain.answer.dto.AnswerDto;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.answer.mapper.AnswerMapper;
import seb42_main_026.mainproject.domain.answer.service.AnswerService;
import seb42_main_026.mainproject.dto.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@Validated
public class AnswerController {

    //todo DI
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    @PostMapping("/{question-id}/answers")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive long questionId,
            @Valid @RequestBody AnswerDto.Post answerPostDto){
        answerPostDto.addQuestionId(questionId);
        Answer answer = answerService.createAnswer(
                mapper.answerPostDtoToAnswer(answerPostDto), questionId, answerPostDto.getMemberId());


        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAnswerResponse(answer)), HttpStatus.CREATED
        );
    }
    /**
     * Patch 매서드로 수정기능 - done
     *  ㄴ Service 단에서 questionId와 answerId 모두 사용해야함?
     * Patch 매서드로 채택기능 - done
     */
    @PatchMapping("/{question-id}/answers/{answer-id}") //todo 프론트와 협의 후 엔드포인트 결정
    public ResponseEntity patchAnswer(@PathVariable("question-id") @Positive long questionId,
                                      @PathVariable("answer-id") @Positive long answerId,
                                      @Valid @RequestBody AnswerDto.Patch answerPatchDto){
        answerPatchDto.setAnswerId(answerId);
        Answer answer = answerService.updateAnswer(mapper.answerPatchDtoToAnswer(answerPatchDto), answerPatchDto.getMemberId());

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAnswerResponse(answer)),HttpStatus.OK);
    }

    // 채택 버튼 누르면 클라이언트에서 requestParam 으로 memberId 가져오기 [프론트와 협의 필요]- todo
    @PatchMapping("/{question-id}/answers/{answer-id}/select")
    public ResponseEntity selectAnswer(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("answer-id") @Positive long answerId,
                                       @Positive @RequestParam long memberId){
        //answerService 에서 Status 바꿔주는 메서드
        answerService.selectAnswer(memberId,questionId,answerId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 삭제 버튼 누르면 클라이언트에서 requestParam 으로 memberId 가져오기 [프론트와 협의 필요]- todo
    @DeleteMapping("/{question-id}/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("answer-id") @Positive long answerId,
                                       @Positive @RequestParam long memberId){
        answerService.deleteAnswer(answerId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
