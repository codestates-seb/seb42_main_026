package seb42_main_026.mainproject.domain.like.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb42_main_026.mainproject.domain.like.dto.LikeDto;
import seb42_main_026.mainproject.domain.like.entity.Like;
import seb42_main_026.mainproject.domain.like.mapper.LikeMapper;
import seb42_main_026.mainproject.domain.like.service.LikeService;
import seb42_main_026.mainproject.security.utils.UriCreator;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
@Validated
public class LikeController {
    private final static String LIKE_DEFAULT_URL = "/likes";

    private final LikeService likeService;

    private final LikeMapper likeMapper;

    @PostMapping
    public ResponseEntity<?> postLike(@RequestBody @Valid LikeDto.Post likePostDto) {
        Like like = likeMapper.likePostDtoToLike(likePostDto);

        Like createdLike = likeService.createLike(like);

        URI location = UriCreator.createUri(LIKE_DEFAULT_URL, createdLike.getLikeId());

        return ResponseEntity.created(location).build();
    }
}