package seb42_main_026.mainproject.domain.member.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb42_main_026.mainproject.audit.Auditable;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(indexes = {@Index(name = "idx_score_createdAt", columnList = "score, createdAt")})
public class Score extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scoreId;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Column(nullable = true)
    private String profileImageUrl;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Long score;

}
