package seb42_main_026.mainproject.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ExceptionCode {


    MEMBER_EXISTS(HttpStatus.CONFLICT, "MEMBER_EXIST", "email"),

    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "회원 정보가 없습니다.", null),

    NICKNAME_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 별명입니다.", "nickname"),

    ANSWER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 답변입니다.", null),

    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 댓글입니다.", null),

    QUESTION_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 질문입니다.", null),

    UNAUTHORIZED_USER(HttpStatus.UNAUTHORIZED, "권한이 없는 회원입니다.", null),

    PASSWORD_NOT_MATCH(HttpStatus.UNAUTHORIZED, "기존 비밀번호와 일치하지 않습니다.", null),

    ALREADY_COMPLETED_QUESTION(HttpStatus.CONFLICT, "이미 갱생된 질문입니다", null),

    ALREADY_LIKED(HttpStatus.CONFLICT, "이미 좋아요를 했습니다", null),

    LIKE_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 좋아요입니다.", null),

    CANNOT_SELECT_OWN_ANSWER(HttpStatus.BAD_REQUEST, "본인 글을 채택 할 수 없습니다.",null),


    EXCEED_MAX_FILE_SIZE(HttpStatus.BAD_REQUEST, "첨부 파일의 용량이 초과되었습니다.",null),

    ACCESS_TOKEN_EXPRIATION(HttpStatus.UNAUTHORIZED, "액세스 토큰이 만료되었습니다.",null),
    REFRESH_TOKEN_EXPRIATION(HttpStatus.UNAUTHORIZED, "리프레시 토큰이 만료되었습니다. 로그인이 필요합니다.",null),

    REFRESH_TOKEN_MISSMATCHED(HttpStatus.UNAUTHORIZED, "리프레시 토큰이 일치하지않습니다..",null),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "일치하는 리프레시 토큰이 없습니다.",null),

    SELECT_ONLY_ONCE(HttpStatus.BAD_REQUEST, "질문 당 채택은 한개씩 가능합니다.", null);





    @Getter
    private HttpStatus httpStatus;

    @Getter
    private String message;

    @Getter
    private String field;


    ExceptionCode(HttpStatus httpStatus, String message, String field){
        this.httpStatus = httpStatus;
        this.message = message;
        this.field = field;
    }
}
