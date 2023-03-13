import styled from 'styled-components';
import { ReactComponent as ICON_RANK_NO1 } from '../../assets/ic_Rank_no1.svg';
import { ReactComponent as ICON_RANK_NO2 } from '../../assets/ic_Rank_no2.svg';
import { ReactComponent as ICON_RANK_NO3 } from '../../assets/ic_Rank_no3.svg';
import RankImgCard from '../../components/RankImgCard';

interface RankItemProps {
  url?: string;
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

export default function RankItem({ subText, nickName, url, index }: RankItemProps) {
  return (
    <RankItemStyle>
      <IconForm>{setRankIcon({ index })}</IconForm>
      <RankImgCard imgUrl={url} mainText={nickName} subText={subText} index={index} />
    </RankItemStyle>
  );
}

const RankItemStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 6px 0px 6px 10px;
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

// const ContentForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-left: 8px;
// `;

// const NickName = styled.div`
//   color: var(--color-mobMain);
//   font-weight: var(--font-weight700);
//   font-size: var(--font-size16);
//   letter-spacing: var(--font-spacing-title);
// `;
// const Score = styled.div`
//   color: var(--color-gray01);
//   font-size: var(--font-size12);
// `;
