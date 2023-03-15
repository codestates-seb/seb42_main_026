package seb42_main_026.mainproject.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ExceptionCode {


    MEMBER_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 아이디입니다."),

    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "회원 정보가 없습니다."),

<<<<<<< HEAD
<<<<<<< HEAD
    NICKNAME_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 별명입니다."),

<<<<<<< HEAD
<<<<<<< HEAD
    ANSWER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 질문입니다.");
=======
    NICKNAME_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 별명입니다.");

>>>>>>> 7e3e41f (feat: global exception 구현)
=======
    NICKNAME_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 별명입니다."),

    ANSWER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 질문입니다.");
>>>>>>> ca62e98 (feat: 필요 ExceptionCode 추가)
=======
    ANSWER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 질문입니다."),
=======
    ANSWER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 답변입니다."),
>>>>>>> 74f06b9 (Fix: commit 내용 수정)

<<<<<<< HEAD
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 댓글입니다.");
>>>>>>> 411a03a (feat: 질문, 댓글 관련 예외 Enum 추가)
=======
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 댓글입니다."),
<<<<<<< HEAD
    UNAUTHORIZED_USER(HttpStatus.UNAUTHORIZED, "해당 회원은 권한이 없습니다.");
>>>>>>> 7b5d68e (Feat: Member Score 추가)
=======

    UNAUTHORIZED_USER(HttpStatus.UNAUTHORIZED, "해당 회원은 권한이 없습니다."),

    QUESTION_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 질문입니다.");

>>>>>>> 74f06b9 (Fix: commit 내용 수정)


    @Getter
    private HttpStatus httpStatus;

    @Getter
    private String message;


    ExceptionCode(HttpStatus httpStatus, String message){
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
