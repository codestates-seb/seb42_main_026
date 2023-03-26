package seb42_main_026.mainproject.domain.question.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.dto.QuestionDto;
import seb42_main_026.mainproject.domain.question.entity.Question;
import seb42_main_026.mainproject.domain.question.mapper.QuestionMapper;
import seb42_main_026.mainproject.domain.question.service.QuestionService;
import seb42_main_026.mainproject.dto.MultiResponseDto;
import seb42_main_026.mainproject.dto.SingleResponseDto;
import seb42_main_026.mainproject.security.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    @PostMapping(value = "/questions",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> postQuestion(@AuthenticationPrincipal Member auth,
                                          @RequestPart @Valid QuestionDto.Post questionPostDto,
                                          @RequestPart(required = false) MultipartFile questionImage) {
        questionPostDto.setMemberId(auth.getMemberId());

        Question question = questionMapper.questionPostDtoToQuestion(questionPostDto);

        Question createdQuestion = questionService.createQuestion(question, questionImage);

        URI location = UriCreator.createUri("/questions", createdQuestion.getQuestionId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/questions/{question-id}")
    public ResponseEntity<?> patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                           @AuthenticationPrincipal Member auth,
                                           @RequestBody @Valid QuestionDto.Patch questionPatchDto) {
        questionPatchDto.setQuestionId(questionId);
        questionPatchDto.setMemberId(auth.getMemberId());

        Question question = questionMapper.questionPatchDtoToQuestion(questionPatchDto);

        questionService.updateQuestion(question);

        return ResponseEntity.ok().build();
    }

    @PatchMapping(value = "/questions/{question-id}/questionImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                           @AuthenticationPrincipal Member auth,
                                           @RequestPart MultipartFile questionImage) {
        questionService.updateQuestionImage(questionId, auth.getMemberId(), questionImage);

        return ResponseEntity.ok().build();
    }

    // 특정 질문조회
    @GetMapping("/questions/{question-id}")
    public ResponseEntity<?> getQuestion(@PathVariable("question-id") @Positive long questionId) {
        Question foundQuestion = questionService.findQuestion(questionId);

        QuestionDto.DetailResponse detailResponse = questionMapper.questionToQuestionDetailResponseDto(foundQuestion);

        return new ResponseEntity<>(new SingleResponseDto<>(detailResponse), HttpStatus.OK);
    }

    // 홈에서 인기 질문 목록 조회(좋아요 순, 10개만)
    @GetMapping("/home/questions")
    public ResponseEntity<?> getQuestionsAtHome() {
        List<Question> questions = questionService.findQuestionsAtHome();

        List<QuestionDto.Response> responses = questionMapper.questionsToQuestionResponseDtos(questions);

        return new ResponseEntity<>(new SingleResponseDto<>(responses), HttpStatus.OK);
    }

    // 게시판에서 질문 목록 조회(최신 순, 페이지네이션)
    @GetMapping("/board/questions")
    public ResponseEntity<?> getQuestionsAtBoard(@RequestParam @Positive int page,
                                                 @RequestParam @Positive int size,
                                                 @RequestParam(required = false) Question.Tag tag,
                                                 @RequestParam(required = false) String searchKeyword) {
        Page<Question> pageQuestions = questionService.findQuestionsAtBoard(page - 1, size, tag, searchKeyword);

        List<Question> questions = pageQuestions.getContent();

        List<QuestionDto.Response> responses = questionMapper.questionsToQuestionResponseDtos(questions);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageQuestions), HttpStatus.OK);
    }

    // 마이페이지에서 자신이 작성한 질문 목록 조회(최신 순, 페이지네이션)
    @GetMapping("/members/questions")
    public ResponseEntity<?> getQuestionsAtMyPage(@AuthenticationPrincipal Member auth,
                                                  @RequestParam @Positive int page,
                                                  @RequestParam @Positive int size) {
        Page<Question> pageQuestions = questionService.findQuestionsAtMyPage(auth.getMemberId(), page - 1, size);

        List<Question> questions = pageQuestions.getContent();

        List<QuestionDto.Response> responses = questionMapper.questionsToQuestionResponseDtos(questions);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageQuestions), HttpStatus.OK);
    }

    @DeleteMapping("/questions/{question-id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable("question-id") @Positive long questionId,
                                            @AuthenticationPrincipal Member auth) {
        questionService.deleteQuestion(questionId, auth.getMemberId());

        return ResponseEntity.noContent().build();
    }
}
