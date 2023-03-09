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
@RequestMapping //todo endpoint 작성
@RequiredArgsConstructor
@Validated
public class AnswerController {

    //todo DI
    private final AnswerService answerService;
    private final AnswerMapper mapper;

<<<<<<< HEAD
<<<<<<< HEAD
    @PostMapping("/{question-id}") //todo 프론트와 협의 후 엔드포인트 결정
=======
    @PostMapping
>>>>>>> 7ccffca (refactor: 생성자 리팩토링)
=======
    @PostMapping("/{question-id}") //todo 프론트와 협의 후 엔드포인트 결정
>>>>>>> 8c8f3d4 (feat: answer Patch 추가(v1))
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
     * Patch 매서드로 수정기능 - todo
     *  ㄴ Service 단에서 questionId와 answerId 모두 사용해야함?
     * Patch 매서드로 채택기능 - todo
     */
    @PatchMapping("/{question-id}/{answer-id}") //todo 프론트와 협의 후 엔드포인트 결정
    public ResponseEntity patchAnswer(@PathVariable("question-id") @Positive long questionId,
                                      @PathVariable("answer-id") @Positive long answerId,
                                      @Valid @RequestBody AnswerDto.Patch answerPatchDto){
        answerPatchDto.setAnswerId(answerId);
        Answer answer = answerService.updateAnswer(mapper.answerPatchDtoToAnswer(answerPatchDto), answerPatchDto.getMemberId());

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAnswerResponse(answer)),HttpStatus.OK);
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 76bfecf (feat: Answer 채택 기능)

    // 채택 버튼 누르면 클라이언트에서 requestParam 으로 memberId 가져오기 [프론트와 협의 필요]- todo
    @PatchMapping("/{question-id}/{answer-id}/select")
    public ResponseEntity selectAnswer(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("answer-id") @Positive long answerId,
                                       @Positive @RequestParam long memberId){
        //answerService 에서 Status 바꿔주는 메서드
        answerService.selectAnswer(memberId,questionId,answerId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 733ae29 (feat: Answer 삭제 기능)

    // 삭제 버튼 누르면 클라이언트에서 requestParam 으로 memberId 가져오기 [프론트와 협의 필요]- todo
    @DeleteMapping("/{question-id}/{answer-id}/delete")
    public ResponseEntity deleteAnswer(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("answer-id") @Positive long answerId,
                                       @Positive @RequestParam long memberId){
        answerService.deleteAnswer(answerId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
<<<<<<< HEAD
=======
>>>>>>> 8c8f3d4 (feat: answer Patch 추가(v1))
=======
>>>>>>> 76bfecf (feat: Answer 채택 기능)
=======
>>>>>>> 733ae29 (feat: Answer 삭제 기능)
}
