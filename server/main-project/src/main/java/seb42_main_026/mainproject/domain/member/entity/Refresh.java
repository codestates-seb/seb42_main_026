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
public class Refresh extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshId;

    @Column
    private String refresh;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID", unique = true)
    private Member member;

}
