package seb42_main_026.mainproject.domain.question.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
<<<<<<< HEAD
<<<<<<< HEAD
import seb42_main_026.mainproject.audit.Auditable;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import seb42_main_026.mainproject.audit.Auditable;
>>>>>>> a78f2f0 (Feat: Auditable 추상 클래스 구현)
=======
import seb42_main_026.mainproject.domain.like.entity.Like;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.tag.Tag;
>>>>>>> 74f06b9 (Fix: commit 내용 수정)
=======
import seb42_main_026.mainproject.domain.like.Like;
=======
import seb42_main_026.mainproject.domain.like.entity.Like;
>>>>>>> 954e762 (Feat: 게시글 조회 기능 구현(홈))
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.tag.Tag;
>>>>>>> d1bc2d9 (Refactor: API 명세서 내용에 맞게 createQuestion 리팩토링)

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
<<<<<<< HEAD
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

    @Column(nullable = true)
    private String questionImageName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
=======
public class Question {
=======
public class Question extends Auditable {
>>>>>>> a78f2f0 (Feat: Auditable 추상 클래스 구현)
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

<<<<<<< HEAD
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
=======
=======
>>>>>>> d1bc2d9 (Refactor: API 명세서 내용에 맞게 createQuestion 리팩토링)
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Answer> answers = new ArrayList<>();

    @OneToOne(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Tag tag;

    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Like> likes = new ArrayList<>();
<<<<<<< HEAD
>>>>>>> 74f06b9 (Fix: commit 내용 수정)
=======
>>>>>>> d1bc2d9 (Refactor: API 명세서 내용에 맞게 createQuestion 리팩토링)
}
