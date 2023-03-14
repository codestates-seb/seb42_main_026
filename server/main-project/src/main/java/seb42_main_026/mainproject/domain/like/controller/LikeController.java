package seb42_main_026.mainproject.domain.like.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb42_main_026.mainproject.domain.like.dto.LikeDto;
import seb42_main_026.mainproject.domain.like.entity.Like;
import seb42_main_026.mainproject.domain.like.mapper.LikeMapper;
import seb42_main_026.mainproject.domain.like.service.LikeService;
import seb42_main_026.mainproject.security.utils.UriCreator;

import javax.validation.Valid;
=======
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
=======
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb42_main_026.mainproject.domain.like.dto.LikeDto;
>>>>>>> ea5a806 (Refactor: 좋아요 기능 리팩터링)
import seb42_main_026.mainproject.domain.like.entity.Like;
import seb42_main_026.mainproject.domain.like.mapper.LikeMapper;
import seb42_main_026.mainproject.domain.like.service.LikeService;
import seb42_main_026.mainproject.security.utils.UriCreator;

<<<<<<< HEAD
>>>>>>> 954e762 (Feat: 게시글 조회 기능 구현(홈))
=======
import javax.validation.Valid;
>>>>>>> ea5a806 (Refactor: 좋아요 기능 리팩터링)
import java.net.URI;

@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
<<<<<<< HEAD
<<<<<<< HEAD
@Validated
=======
>>>>>>> 954e762 (Feat: 게시글 조회 기능 구현(홈))
=======
@Validated
>>>>>>> ea5a806 (Refactor: 좋아요 기능 리팩터링)
public class LikeController {
    private final static String LIKE_DEFAULT_URL = "/likes";

    private final LikeService likeService;

<<<<<<< HEAD
<<<<<<< HEAD
    private final LikeMapper likeMapper;

    @PostMapping
    public ResponseEntity<?> postLike(@RequestBody @Valid LikeDto.Post likePostDto) {
        Like like = likeMapper.likePostDtoToLike(likePostDto);

        Like createdLike = likeService.createLike(like);
=======
    @PostMapping("/{question-id}")
    public ResponseEntity<?> postLike(@PathVariable("question-id") long questionId) {
        Like like = new Like();

        Like createdLike = likeService.createLike(like, questionId);
>>>>>>> 954e762 (Feat: 게시글 조회 기능 구현(홈))
=======
    private final LikeMapper likeMapper;

    @PostMapping
    public ResponseEntity<?> postLike(@RequestBody @Valid LikeDto.Post likePostDto) {
        Like like = likeMapper.likePostDtoToLike(likePostDto);

        Like createdLike = likeService.createLike(like);
>>>>>>> ea5a806 (Refactor: 좋아요 기능 리팩터링)

        URI location = UriCreator.createUri(LIKE_DEFAULT_URL, createdLike.getLikeId());

        return ResponseEntity.created(location).build();
    }
}
