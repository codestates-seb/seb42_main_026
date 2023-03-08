package seb42_main_026.mainproject.domain.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb42_main_026.mainproject.audit.Auditable;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Answer extends Auditable {

    //done - auditable extend

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

    @Column(nullable = false)
    private String content;


    /**todo 연관관계 매핑 (회원,질문,댓글)
     * Member(ManyToOne) - todo
     * Question(ManyToOne) - todo
     * Comment(OneToMany) - todo
     */

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
