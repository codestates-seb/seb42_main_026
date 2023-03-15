package seb42_main_026.mainproject.domain.tag;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb42_main_026.mainproject.domain.question.entity.Question;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TagType tagType = TagType.EXERCISE;

    @Getter
    @AllArgsConstructor
    public enum TagType {
        EXERCISE("운동"),
        WAKE_UP("기상"),
        STUDY("공부"),
        ETC("기타");

        private String tagName;
    }

    @OneToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
}
