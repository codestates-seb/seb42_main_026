package seb42_main_026.mainproject.domain.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb42_main_026.mainproject.audit.Auditable;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import seb42_main_026.mainproject.domain.comment.entity.Comment;
>>>>>>> c6ea679 (refactor: Answer endpoint #15, #16, #17, #18)
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.entity.Question;
=======
>>>>>>> 8c8f3d4 (feat: answer Patch 추가(v1))
=======
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.entity.Question;
>>>>>>> 76bfecf (feat: Answer 채택 기능)

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Answer extends Auditable {

    //done - auditable extend

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

    //보이스 리플 작성하면 빈칸 허용?
    @Column(nullable = false)
    private String content;

    // voice file 이름만 DB에 저장해서 물리적 리소스는 S3에서 업로드 및 다운로드
<<<<<<< HEAD
//    @Column
//    private String profileImgUrl;
//
//    @Column
//    private String voiceFileUrl;
=======
    @Column
    private String fileName;
>>>>>>> ad507db (feat: Answer 미디어파일 업로드 기능#15)


    /**todo 연관관계 매핑 (회원,질문,댓글)
     * Member(ManyToOne) - done
     * Question(ManyToOne) - done
     * Comment(OneToMany) - done
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @OneToMany(mappedBy = "answer")
    private List<Comment> comments = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private AnswerStatus answerStatus = AnswerStatus.ANSWER_NORMAL;

    /**todo addMember, addQuestion
     * addMember - todo
     * addQuestion - todo
     */

    public enum AnswerStatus{
        ANSWER_NORMAL("일반 상태"),
        ANSWER_SELECTED("채택 질문");

        @Getter
        private String status;

        AnswerStatus(String status) {
            this.status = status;
        }
    }
}
