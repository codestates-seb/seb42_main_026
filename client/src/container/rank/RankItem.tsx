import styled from 'styled-components';
import { ReactComponent as ICON_RANK_NO1 } from '../../assets/ic_Rank_no1.svg';
import { ReactComponent as ICON_RANK_NO2 } from '../../assets/ic_Rank_no2.svg';
import { ReactComponent as ICON_RANK_NO3 } from '../../assets/ic_Rank_no3.svg';
import RankImgCard from './RankImgCard';

interface RankItemProps {
  imgUrl?: string;
  nickName?: string;
  subText?: string;
  index: number;
}

function setRankIcon({ index }: RankItemProps) {
  switch (index) {
    case 1:
      return <ICON_RANK_NO1 />;
    case 2:
      return <ICON_RANK_NO2 />;
    case 3:
      return <ICON_RANK_NO3 />;
    default:
      return <RankText>{index}등</RankText>;
  }
}

export default function RankItem({ subText, nickName, imgUrl, index }: RankItemProps) {
  return (
    <RankItemStyle>
      <IconForm>{setRankIcon({ index })}</IconForm>
      <RankImgCard imgUrl={imgUrl} mainText={nickName} subText={`${subText} 점`} index={index} />
    </RankItemStyle>
  );
}

const RankItemStyle = styled.div`
  align-self: stretch;
  border-bottom: 0.5px solid var(--color-gray03);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0px 18px 10px;
  gap: 14px;
`;

const RankText = styled.span`
  font-size: var(--font-size18);
  letter-spacing: var(--font-spacing-title);
`;

const IconForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
`;
