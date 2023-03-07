package seb42_main_026.mainproject.domain.question.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb42_main_026.mainproject.domain.question.dto.QuestionDto;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @PostMapping
    public ResponseEntity<?> postQuestion() {
        QuestionDto.Response response =
                new QuestionDto.Response(1L, "잔소리 요청글 제목", "잔소리 요청글 내용", "갱생 중");

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("{question-id}")
    public ResponseEntity<?> patchQuestion() {
        QuestionDto.Response response =
                new QuestionDto.Response(2L, "수정된 제목", "수정된 내용", "갱생 중");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("{question-id}")
    public ResponseEntity<?> getQuestion() {
        QuestionDto.Response response =
                new QuestionDto.Response(3L, "잔소리 요청글 제목", "잔소리 요청글 내용", "갱생 중");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getQuestions() {
        QuestionDto.Response response1 =
                new QuestionDto.Response(4L, "잔소리 요청글 제목1", "잔소리 요청글 내용1", "갱생 중");
        QuestionDto.Response response2 =
                new QuestionDto.Response(5L, "잔소리 요청글 제목2", "잔소리 요청글 내용2", "갱생 완료");

        return new ResponseEntity<>(List.of(response1, response2), HttpStatus.OK);
    }

    @DeleteMapping("{question-id}")
    public ResponseEntity<?> deleteQuestion() {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
