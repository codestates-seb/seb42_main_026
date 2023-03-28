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
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
//@Table(indexes = @Index(name = "idx_member_nickname", columnList = "nickname"))
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, length = 30, unique = true)
    private String nickname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(value = EnumType.STRING)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Enumerated(EnumType.STRING)
    private HammerTier hammerTier = HammerTier.STONE_HAMMER;

    @Column(nullable = true)
    private String profileImageUrl;



    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>(); // List, Set 같은 컬렉션 타입의 필드는 @ElementCollection 애너테이션을 추가하면 User 권한 정보와 관련된 별도의 엔티티 클래스를 생성하지 않아도 간단하게 매핑 처리가 됩니다.

    @OneToMany(mappedBy = "member")
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<QuestionLike> questionLikes = new ArrayList<>();


    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private Score score;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private Refresh refreshToken;

    public enum MemberStatus {

        MEMBER_ACTIVE("활동 회원"),
        MEMBER_SLEEP("휴먼 회원"),
        MEMBER_DELETE("삭제 대기");

        @Getter
        private String status;

        MemberStatus(String status) {this.status = status;}

    }


    public enum HammerTier {

        STONE_HAMMER("돌"),
        BRONZE_HAMMER("동"),
        SILVER_HAMMER("은"),
        GOLD_HAMMER("금"),
        PPONG_HAMMER("뿅");

        @Getter
        private String tier;

        HammerTier(String tier) {this.tier = tier;}

    }

}
