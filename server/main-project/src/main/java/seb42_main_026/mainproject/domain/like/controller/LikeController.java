package seb42_main_026.mainproject.domain.like.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import seb42_main_026.mainproject.domain.like.entity.Like;
import seb42_main_026.mainproject.domain.like.service.LikeService;
import seb42_main_026.mainproject.security.utils.UriCreator;

import java.net.URI;

@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
public class LikeController {
    private final static String LIKE_DEFAULT_URL = "/likes";

    private final LikeService likeService;

    @PostMapping("/{question-id}")
    public ResponseEntity<?> postLike(@PathVariable("question-id") long questionId) {
        Like like = new Like();

        Like createdLike = likeService.createLike(like, questionId);

        URI location = UriCreator.createUri(LIKE_DEFAULT_URL, createdLike.getLikeId());

        return ResponseEntity.created(location).build();
    }
}
