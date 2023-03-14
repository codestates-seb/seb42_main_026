package seb42_main_026.mainproject.domain.member.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.lang.Nullable;
import seb42_main_026.mainproject.audit.Auditable;

import javax.persistence.*;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, length = 10, unique = true)
    private String nickname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(value = EnumType.STRING)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Column(nullable = false)
    private Long score;

    @Enumerated(EnumType.STRING)
    private HammerTier hammerTier = HammerTier.BASIC_HAMMER;

    @Column
    private String profileImageUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>(); // List, Set 같은 컬렉션 타입의 필드는 @ElementCollection 애너테이션을 추가하면 User 권한 정보와 관련된 별도의 엔티티 클래스를 생성하지 않아도 간단하게 매핑 처리가 됩니다.

    /*@OneToMany(mappedBy = "member")
    private List<Quesiton> quesitons = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Like> likes = new ArrayList<>();
*/



    public enum MemberStatus{

        MEMBER_ACTIVE("활동 회원"),
        MEMBER_SLEEP("휴먼 회원");


        @Getter
        private String status;

        MemberStatus(String status) {this.status = status;}

    }

    public enum HammerTier{

        BASIC_HAMMER("돌망치");


        @Getter
        private String tier;

        HammerTier(String tier) {this.tier = tier;}
    }


}
