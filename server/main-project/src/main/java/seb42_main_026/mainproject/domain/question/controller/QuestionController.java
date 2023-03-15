package seb42_main_026.mainproject.domain.question.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
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

    // Todo: 태그, 이미지 파일 업로드
    @PostMapping("questions/{member-id}")
    public ResponseEntity<?> postQuestion(@RequestBody @Valid QuestionDto.Post questionPostDto,
                                          @PathVariable("member-id") @Positive long memberId) {
        questionPostDto.setMemberId(memberId);

        Question question = questionMapper.questionPostDtoToQuestion(questionPostDto);
//        question.setTag(new Tag());

        Question createdQuestion = questionService.createQuestion(question);

        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, createdQuestion.getQuestionId());

        return ResponseEntity.created(location).build();
    }

    // Todo: 태그, 이미지 파일 수정
    @PatchMapping("questions/{question-id}")
    public ResponseEntity<?> patchQuestion(@RequestBody @Valid QuestionDto.Patch questionPatchDto,
                                           @PathVariable("question-id") @Positive long questionId) {
        questionPatchDto.setQuestionId(questionId);

        Question question = questionMapper.questionPatchDtoToQuestion(questionPatchDto);

        questionService.updateQuestion(question);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 특정 질문조회
    @GetMapping("/questions/{question-id}")
    public ResponseEntity<?> getQuestion(@PathVariable("question-id") @Positive long questionId) {
        Question foundQuestion = questionService.findQuestion(questionId);

        QuestionDto.DetailResponse response = questionMapper.questionToQuestionDetailResponseDto(foundQuestion);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
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
                                                 @RequestParam @Positive int size) {
        Page<Question> pageQuestions = questionService.findQuestionsAtBoard(page - 1, size);

        List<Question> questions = pageQuestions.getContent();

        List<QuestionDto.Response> responses = questionMapper.questionsToQuestionResponseDtos(questions);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageQuestions), HttpStatus.OK);
    }

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

//    @DeleteMapping("{question-id}")
//    public ResponseEntity<?> deleteQuestion() {
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}
