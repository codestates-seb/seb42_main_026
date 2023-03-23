import styled from 'styled-components';
import ICON_RANK from '../../assets/ic_Rank.svg';
import ICON_TIER_STONE from '../../assets/ic_tier_stone.svg';
import ICON_TIER_BRONZE from '../../assets/ic_tier_bronze.svg';
import ICON_TIER_SILVER from '../../assets/ic_tier_silver.svg';
import ICON_TIER_GOLD from '../../assets/ic_tier_gold.svg';
import ICON_TIER_PPONG from '../../assets/ic_tier_ppong.svg';
import { useState } from 'react';
import RankInfo from '../../components/RankInfo';
import TierInfo from '../../components/TierInfo';

interface myProps {
  score: number;
  hammerTier: string;
  mainText: string;
  subText: string;
  lang: string;
}
const RankCard = ({ score, hammerTier, lang }: myProps) => {
  const [showRankModal, setShowRankModal] = useState<React.SetStateAction<boolean>>(false);
  const [showTierModal, setShowTierModal] = useState<React.SetStateAction<boolean>>(false);
  function setIcon(icon: String) {
    switch (icon) {
      case '동':
        return ICON_TIER_BRONZE; // 돌망치의 img경로를 넣어주세요
      case '은':
        return ICON_TIER_SILVER;
      case '금':
        return ICON_TIER_GOLD;
      case '뿅':
        return ICON_TIER_PPONG;
      default:
        return ICON_TIER_STONE;
    }
  }
  return (
    <>
      <RankCardWrapper>
        <ImageBoxWrapper>
          <img src={setIcon(hammerTier)} alt="profile_image" lang="KR" />
          <InfoBoxWrapper>
            <MainText>
              {`티어`}
              <button onClick={() => setShowTierModal(!showTierModal)}>?</button>
              {showTierModal === true ? <TierInfo /> : null}
            </MainText>
            <SubText>{hammerTier}망치</SubText>
          </InfoBoxWrapper>
        </ImageBoxWrapper>

        <ImageBoxWrapper>
          <img src={ICON_RANK} alt="profile_image" lang="KR" />
          <InfoBoxWrapper>
            <MainText>
              {`나의 활동점수`}
              <button onClick={() => setShowRankModal(!showRankModal)}>?</button>
              {showRankModal === true ? <RankInfo /> : null}
            </MainText>
            <SubText>{score}점</SubText>
          </InfoBoxWrapper>
        </ImageBoxWrapper>
      </RankCardWrapper>
    </>
  );
};

export default RankCard;

const RankCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100% -40px);
  gap: 40px;
  align-items: flex-start;
  border: 1px solid var(--color-gray03);
  border-radius: 5px;
  padding: 35px 12px;
`;
const ImageBoxWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 28px;
  left: 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  img {
    object-fit: cover;
  }
`;
const InfoBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const MainText = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  font-family: ${(props) => (props.lang === 'EN' ? 'Roboto' : 'Noto Sans KR')};
  color: var(--color-black01);
  font-size: var(--font-size18);
  button {
    margin-left: 9px;
    margin-top: 1px;
    border: solid 1px var(--color-gray02);
    color: var(--color-gray02);
    background-color: var(--color-white01);
    width: 19px;
    height: 19px;
    border-radius: 50%;
  }
`;
const SubText = styled.div`
  text-align: left;
  font-size: var(--font-size12);
  font-family: ${(props) => (props.lang === 'EN' ? 'Roboto' : 'Noto Sans KR')};
  letter-spacing: -0.05em;
  color: var(--color-gray02);
`;
