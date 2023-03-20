package seb42_main_026.mainproject.domain.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb42_main_026.mainproject.audit.Auditable;
import seb42_main_026.mainproject.domain.comment.entity.Comment;
import seb42_main_026.mainproject.domain.like.entity.Like;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.entity.Question;

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

    @Column(nullable = false)
    private int likeCount;

    // todo voice file 이름만 DB에 저장해서 물리적 리소스는 S3에서 업로드 및 다운로드
//    @Column
//    private String profileImgUrl;

    @Column
    private String voiceFileUrl;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @OneToMany(mappedBy = "answer", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "answer", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Like> likes = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private AnswerStatus answerStatus = AnswerStatus.ANSWER_NORMAL;



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
