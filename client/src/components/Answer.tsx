import styled from "styled-components";
import ICON_PROFILE from "../assets/ic_mypage_profile.svg";
import ButtonStyled from "../components/ButtonStyled";
import ICON_MENUBUTTON from "../assets/ic_answer_menubutton.svg";

//필수 타입 ? 제거하기
interface AnswerCardProps {
  imgUrl?: string;
  nickname?: string;
  time?: string;
}

//임의로 넣어놓은 데이터값도 제거하기
const Answer = ({
  imgUrl = "",
  nickname = "닉네임",
  time = "23시간전",
}: AnswerCardProps) => {
  return (
    <>
      <AnswerWrapper>
        <ImageWrapper>
          <img
            src={imgUrl === "" ? ICON_PROFILE : imgUrl}
            alt="profile_image"
          />
        </ImageWrapper>
        <TextWrapper>
          <TopWrapper>
            <InfoWrapper>
              <NameWrapper>{nickname}</NameWrapper>
              <TimeWrapper>{time}</TimeWrapper>
            </InfoWrapper>
            <TopRightWrapper>
              <ButtonStyled color="pink" title="채택중"></ButtonStyled>
              <MenuButtonWrapper>
                <img src={ICON_MENUBUTTON} alt="메뉴버튼" />
              </MenuButtonWrapper>
            </TopRightWrapper>
          </TopWrapper>
          <MiddleWrapper>
            아이맥스, 2D 모두 마감되었어요! 2D는 포스터 이벤트 또 올라올 것
            같은데 급한게 아니면 한번 기다려보시는 것도 좋을 것 같아요b
          </MiddleWrapper>
          <BottomWrapper>
            <BottomLeftWrapper>
              <LikeWrapper>
                {/* <thumbsup></thumbsup>
                <likeNumber></likeNumber> */}
              </LikeWrapper>

              <SubComment>답글쓰기</SubComment>
            </BottomLeftWrapper>
          </BottomWrapper>
        </TextWrapper>
      </AnswerWrapper>
    </>
  );
};

export default Answer;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem; */
  /* background-color: #ffffff; */
  border: solid aqua;
  width: 100%;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* gap: 10px; */
  background-color: #ffffff;
  border: solid red;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid black;
  width: 100%;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const NameWrapper = styled.div``;

const TimeWrapper = styled.div``;

const MenuButtonWrapper = styled.div``;

const TopRightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
`;

const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  border: solid red;
`;
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  border: solid red;
`;

const LikeWrapper = styled.div``;

// const thumbsup = styled.div``;

// const likeNumber = styled.div``;

const SubComment = styled.div``;

const BottomLeftWrapper = styled.div``;

/* <MiddleWrapper>
          아이맥스, 2D 모두 마감되었어요! 2D는 포스터 이벤트 또 올라올 것 같은데
          급한게 아니면 한번 기다려보시는 것도 좋을 것 같아요b
        </MiddleWrapper>
        <BottomWrapper>
          <BottomLeftWrapper>
            <LikeWrapper>
              <thumbsup></thumbsup>
              <likeNumber></likeNumber>
            </LikeWrapper>

            <SubComment>답글쓰기</SubComment>
          </BottomLeftWrapper>
        </BottomWrapper> */
