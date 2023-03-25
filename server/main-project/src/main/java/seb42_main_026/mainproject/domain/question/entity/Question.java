package seb42_main_026.mainproject.domain.question.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb42_main_026.mainproject.audit.Auditable;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.like.entity.QuestionLike;
import seb42_main_026.mainproject.domain.member.entity.Member;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(indexes = {@Index(name = "idx_question_tag", columnList = "tag"),
        @Index(name = "idx_question_likeCount_answerCount", columnList = "likeCount, answerCount")})
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int likeCount;

    @Column(nullable = false)
    private boolean likeCheck;

    @Column(nullable = false)
    private int answerCount;

    @Column(nullable = true)
    private String questionImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionStatus questionStatus = QuestionStatus.QUESTION_REQUEST;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tag tag;

    @Getter
    @AllArgsConstructor
    public enum QuestionStatus {
        QUESTION_REQUEST("갱생 중"),
        QUESTION_COMPLETE("갱생 완료");

        private final String status;
    }

    @Getter
    @AllArgsConstructor
    public enum Tag {
        EXERCISE("운동"),
        WAKE_UP("기상"),
        STUDY("공부"),
        ETC("기타");

        private final String name;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<QuestionLike> questionLikes = new ArrayList<>();
}
