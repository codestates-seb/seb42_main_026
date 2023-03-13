import styled from 'styled-components';
import ImageBox from '../../components/ImageBox';

const RankCard = () => {
  return (
    <>
      <RankCardWrapper>
        <ImageBox imgUrl="" mainText="티어" subText="뿅망치" lang="KR"></ImageBox>
        <ImageBox imgUrl="" mainText="랭크" subText="127위" lang="KR"></ImageBox>
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
  padding: 20px 0;
`;
