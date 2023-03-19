package seb42_main_026.mainproject.domain.question.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    // Todo: 이미지 파일 업로드
    @PostMapping(value = "/questions/{member-id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> postQuestion(@PathVariable("member-id") @Positive long memberId,
                                          @RequestPart @Valid QuestionDto.Post questionPostDto,
                                          @RequestPart(required = false) MultipartFile questionImage) {
        questionPostDto.setMemberId(memberId);

        Question question = questionMapper.questionPostDtoToQuestion(questionPostDto);

        Question createdQuestion = questionService.createQuestion(question, questionImage);

        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, createdQuestion.getQuestionId());

        return ResponseEntity.created(location).build();
    }

    // Todo: 이미지 파일 수정
    @PatchMapping(value = "/questions/{question-id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                           @RequestPart @Valid QuestionDto.Patch questionPatchDto,
                                           @RequestPart(required = false) MultipartFile questionImage) {
        questionPatchDto.setQuestionId(questionId);

        Question question = questionMapper.questionPatchDtoToQuestion(questionPatchDto);

        questionService.updateQuestion(question, questionImage);

        return new ResponseEntity<>(HttpStatus.OK);
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
                                                 @RequestParam(required = false) Question.Tag tag) {
        Page<Question> pageQuestions = questionService.findQuestionsAtBoard(page - 1, size, tag);

        List<Question> questions = pageQuestions.getContent();

        List<QuestionDto.Response> responses = questionMapper.questionsToQuestionResponseDtos(questions);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageQuestions), HttpStatus.OK);
    }

    // 게시판에서 태그에 맞는 질문 목록 조회(최신 순, 페이지네이션)
//    @GetMapping("/board/questions/tag")
//    public ResponseEntity<?> getQuestionsAtBoardByTag(@RequestParam @Positive int page,
//                                                      @RequestParam @Positive int size,
//                                                      @RequestParam Question.Tag tag) {
//        Page<Question> pageQuestions = questionService.findQuestionsAtBoardByTag(page - 1, size, tag);
//
//        List<Question> questions = pageQuestions.getContent();
//
//        List<QuestionDto.Response> responses = questionMapper.questionsToQuestionResponseDtos(questions);
//
//        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageQuestions), HttpStatus.OK);
//    }

    // 마이페이지에서 자신이 작성한 질문 목록 조회(최신 순, 페이지네이션)
    @GetMapping("/members/{member-id}/questions")
    public ResponseEntity<?> getQuestionsAtMyPage(@PathVariable("member-id") @Positive long memberId,
                                                  @RequestParam @Positive int page,
                                                  @RequestParam @Positive int size) {
        Page<Question> pageQuestions = questionService.findQuestionsAtMyPage(memberId, page - 1, size);

        List<Question> questions = pageQuestions.getContent();

        List<QuestionDto.Response> responses = questionMapper.questionsToQuestionResponseDtos(questions);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageQuestions), HttpStatus.OK);
    }

    @DeleteMapping("/questions/{question-id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable("question-id") @Positive long questionId,
                                            @RequestParam @Positive long memberId) {
        questionService.deleteQuestion(questionId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
