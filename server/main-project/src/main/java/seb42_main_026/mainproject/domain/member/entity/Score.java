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
public class Score extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scoreId;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = true)
    private String profileImageUrl;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Long score;
}
