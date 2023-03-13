import styled from 'styled-components';
import ICON_PROFILE from '../../assets/ic_mypage_profile.svg';

interface ImgCardProps {
  imgUrl?: string;
  mainText?: string;
  subText?: string;
  index: number;
}

const RankImgCard = ({ imgUrl, mainText, subText, index }: ImgCardProps) => {
  return (
    <ImageBoxWrapper>
      <img src={imgUrl === '' ? ICON_PROFILE : imgUrl} alt="profile_image" />
      <InfoBoxWrapper>
        <MainText index={index}>{mainText}</MainText>
        <SubText>{subText}</SubText>
      </InfoBoxWrapper>
    </ImageBoxWrapper>
  );
};

export default RankImgCard;

const ImageBoxWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  display: flex;
  left: 20px;
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
const MainText = styled.div<ImgCardProps>`
  text-align: left;
  color: ${(props) => (props.index !== undefined && props.index <= 3 ? 'var(--color-mobMain)' : 'var(--color-black01)')};
  font-weight: ${(props) => (props.index !== undefined && props.index <= 3 ? 'var(--font-weight700)' : '')};
  font-size: var(--font-size18);
`;
const SubText = styled.div`
  text-align: left;
  font-size: var(--font-size12);
  font-family: 'Roboto';
  letter-spacing: -0.05em;
  color: var(--color-gray02);
`;
