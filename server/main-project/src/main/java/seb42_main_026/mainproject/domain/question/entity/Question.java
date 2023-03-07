package seb42_main_026.mainproject.domain.question.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
<<<<<<< HEAD
import seb42_main_026.mainproject.audit.Auditable;
import seb42_main_026.mainproject.domain.answer.entity.Answer;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
=======

import javax.persistence.*;
>>>>>>> f038ba0 (Feat: Question Entity 구현)

@NoArgsConstructor
@Getter
@Setter
@Entity
<<<<<<< HEAD
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = true)
    private String questionImageName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
=======
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(nullable = true)
    private String questionImageName;
    @Enumerated(EnumType.STRING)
>>>>>>> f038ba0 (Feat: Question Entity 구현)
    private QuestionStatus questionStatus = QuestionStatus.QUESTION_REQUEST;

    @Getter
    @AllArgsConstructor
    public enum QuestionStatus {
        QUESTION_REQUEST("갱생 중"),
        QUESTION_COMPLETE("갱생 완료");
        private final String description;
    }
<<<<<<< HEAD

    // Todo: 연관관계 매핑
//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
//
//    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Answer> answers = new ArrayList<>();
//
//    @OneToOne(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private Tag tag;
//
//    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Like> likes = new ArrayList<>();
=======
>>>>>>> f038ba0 (Feat: Question Entity 구현)
}
