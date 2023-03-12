import styled from "styled-components";
import ImageBox from "../../components/ImageBox";

const RankCard = () => {
  return (
    <>
      <RankCardWrapper>
        <ImageBox
          imgUrl=""
          mainText="티어"
          subText="뿅망치"
          lang="EN"
        ></ImageBox>
        <ImageBox
          imgUrl=""
          mainText="랭크"
          subText="127위"
          lang="EN"
        ></ImageBox>
      </RankCardWrapper>
    </>
  );
};

export default RankCard;

const RankCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* padding: 20px 0; */
  padding: 20px;
  width: calc(100% -40px);
  gap: 20px;
  /* justify-content: space-between; */
  align-items: flex-start;
  /* padding-left: 20px; */
  border: solid var(--color-gray03);
  border-radius: 5px;
`;
