import styled from "styled-components";
import ICON_PROFILE from "../assets/ic_mypage_profile.svg";

interface ImgCardProps {
  imgUrl?: string;
  mainText: string;
  subText: string;
  lang: string;
}

const ImageBox = ({ imgUrl, mainText, subText, lang }: ImgCardProps) => {
  return (
    <ImageBoxWrapper>
      <img src={imgUrl === "" ? ICON_PROFILE : imgUrl} alt="profile_image" />
      <InfoBoxWrapper>
        <MainText lang={lang}>{mainText}</MainText>
        <SubText>{subText}</SubText>
      </InfoBoxWrapper>
    </ImageBoxWrapper>
  );
};

export default ImageBox;

const ImageBoxWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  align-items: center;
  img {
    /* 글로벌로 나중에 바꾸기 */
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
`;
const InfoBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const MainText = styled.div`
  text-align: left;
  font-family: ${(props) => (props.lang === "EN" ? "Roboto" : "Noto Sans KR")};
  color: var(--color-black01);
  font-size: var(--font-size18);
`;
const SubText = styled.div`
  text-align: left;
  font-size: var(--font-size12);
  font-family: ${(props) => (props.lang === "EN" ? "Roboto" : "Noto Sans KR")};
  letter-spacing: -0.05em;
  color: var(--color-gray02);
`;
