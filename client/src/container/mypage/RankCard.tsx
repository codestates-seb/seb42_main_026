import styled from "styled-components";
import ImageBox from "../../components/ImageBox";
import ICON_RANK from "../../assets/ic_Rank.svg";
import ICON_TIER_STONE from "../../assets/ic_tier_stone.svg";
import ICON_TIER_BRONZE from "../../assets/ic_tier_bronze.svg";
import ICON_TIER_SILVER from "../../assets/ic_tier_silver.svg";
import ICON_TIER_GOLD from "../../assets/ic_tier_gold.svg";
import ICON_TIER_PPONG from "../../assets/ic_tier_ppong.svg";

const RankCard = () => {
  function setIcon(icon: String) {
    switch (icon) {
      case "동":
        return ICON_TIER_BRONZE; // 돌망치의 img경로를 넣어주세요
      case "은":
        return ICON_TIER_SILVER;
      case "금":
        return ICON_TIER_GOLD;
      case "뿅":
        return ICON_TIER_PPONG;
      default:
        return ICON_TIER_STONE;
    }
  }

  const memberDummyData = {
    email: "email@email.com",
    nickname: "junbo",
    score: 0,
    hammerTier: "뿅",
    rank: 1,
    profileImageUrl: "http://...",
  };

  return (
    <>
      <RankCardWrapper>
        <ImageBox imgUrl={setIcon(memberDummyData.hammerTier)} mainText="티어" subText="뿅망치" lang="KR"></ImageBox>
        <ImageBox imgUrl={ICON_RANK} mainText="랭크" subText="127위" lang="KR"></ImageBox>
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
  padding: 20px 12px;
`;
