package seb42_main_026.mainproject.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb42_main_026.mainproject.audit.Auditable;
import seb42_main_026.mainproject.domain.answer.entity.Answer;
import seb42_main_026.mainproject.domain.like.entity.QuestionLike;
import seb42_main_026.mainproject.domain.question.entity.Question;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
//@Table(indexes = @Index(name = "idx_member_nickname", columnList = "nickname"))
public class Refresh extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshId;

    private String refresh;


    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;




}
