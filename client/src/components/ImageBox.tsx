import styled from "styled-components";
import ICON_PROFILE from "../assets/ic_mypage_profile.svg";

const ImageBox = (type: { props?: string }) => {
  return (
    <LoginWrapper>
      <ImageBoxWrapper>
        <img
          src={type.props === "" ? ICON_PROFILE : type.props}
          alt="profile_image"
        />
        <InfoBoxWrapper>
          <MainText>이메일이나티어나랭크넣어</MainText>
          <SubText>닉넴이나티어값랭크값넣어</SubText>
        </InfoBoxWrapper>
      </ImageBoxWrapper>
    </LoginWrapper>
  );
};

export default ImageBox;

const LoginWrapper = styled.div`
  /* top: 92px; */
  width: 720px;
  user-select: none;
  /* align-self: stretch; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ImageBoxWrapper = styled.div`
  display: flex;
  width: 100%;
  align-self: stretch;
  gap: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InfoBoxWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 1px;
`;
const MainText = styled.div`
  align-self: stretch;
  text-align: left;
  /* vertical-align: middle; */
  font-size: 18px;
  font-family: Roboto;
  /* letter-spacing: -5%; */
  line-height: auto;
  color: #212123;
  font-size: var(--font_size18);
`;
const SubText = styled.div`
  text-align: left;
  vertical-align: middle;
  font-size: 12px;
  font-family: Noto Sans;
  letter-spacing: -5%;
  line-height: auto;
  color: var(--color_gray04);
`;

// export const Div = styled.div`
// background-color: ${(props) => props.theme.colors.webMain};
// font-size: ${(props)=>props.theme.fontSize.max};
// font-weight:  ${(props)=>props.theme.fontWeight.bold};
// letter-spacing: ${(props)=>props.theme.letterSpacing.title};
// `;
