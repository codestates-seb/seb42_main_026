package seb42_main_026.mainproject.domain.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb42_main_026.mainproject.domain.member.dto.ScoreDto;
import seb42_main_026.mainproject.domain.member.entity.Score;

import java.util.List;


@Mapper(componentModel = "spring")
public interface ScoreMapper{


    //@Mapping(source = "member.memberId", target = "memberId")
    ScoreDto.Response scoreToScoreResponseDto(Score score);

    List<ScoreDto.Response> scoresToScoreResponseDto(List<Score> scores);
}
