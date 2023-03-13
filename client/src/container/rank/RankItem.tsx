import styled from "styled-components";
import { ReactComponent as ICON_RANK_NO1 } from "../assets/ic_Rank_no1.svg";
import ImageBox from "../../components/ImageBox";

interface RankItemProps {
  subText: string;
  nickName: string;
  url: string;
}

export default function RankItem({ subText, nickName, url }: RankItemProps) {
  return (
    <RankItemStyle>
      <IconForm>
        <ICON_RANK_NO1 />
      </IconForm>
      <ImageBox
        imgUrl={url}
        mainText={nickName}
        subText={subText}
        lang="string"
      />
    </RankItemStyle>
  );
}

const RankItemStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 6px 0px 6px 10px;
  gap: 14px;
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
