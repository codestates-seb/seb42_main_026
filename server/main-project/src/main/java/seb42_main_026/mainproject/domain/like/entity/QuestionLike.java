package seb42_main_026.mainproject.domain.like.entity;

import lombok.*;
import seb42_main_026.mainproject.domain.member.entity.Member;
import seb42_main_026.mainproject.domain.question.entity.Question;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class QuestionLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
}
