import styled from "styled-components";
import StatusChips from "../../components/StatusChips ";
import Tags from "../../components/Tags";
import { ReactComponent as ICON_LIKE } from "../../assets/ic_boardItem_like.svg";
import { ReactComponent as ICON_ANSWER } from "../../assets/ic_boardItem_answer.svg";

interface ItemProps {
  title: string;
  createdAt: string;
  likeCount: number;
  answerCount: number;
  nickname: string;
  tag?: string;
}
export default function BoardItem({
  title,
  createdAt,
  likeCount,
  answerCount,
  nickname,
  tag,
}: ItemProps) {
  return (
    <BoardItemStyle>
      <ItemTop>
        <ItemTitleform>
          <ItemTitle>{title}</ItemTitle>
          <ItemDate>{createdAt}</ItemDate>
        </ItemTitleform>
        <ItemCountForm>
          <ItemLikeForm>
            <ICON_LIKE />
            <ItemLikeCount>{likeCount}</ItemLikeCount>
          </ItemLikeForm>
          <ItemAnswerForm>
            <ICON_ANSWER />
            <div>{answerCount}</div>
          </ItemAnswerForm>
        </ItemCountForm>
      </ItemTop>
      <ItemBottom>
        <ItemChipForm>
          <StatusChips color="pink" />
          <Tags title={tag} size="small"></Tags>
        </ItemChipForm>
        <ItemNickname>{nickname}</ItemNickname>
      </ItemBottom>
    </BoardItemStyle>
  );
}

const BoardItemStyle = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: solid 0.5px var(--color-gray03);
  padding: 6px 6px;
`;

const ItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding-top: 5px;
`;

const ItemTitleform = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ItemTitle = styled.div`
  font-size: var(--font-size16);
  letter-spacing: var(--font-spacing-title);
`;

const ItemDate = styled.div`
  font-size: var(--font-size12);
  letter-spacing: var(--font-spacing-title);
  color: var(--color-gray02);
  font-family: "Roboto";
`;

const ItemCountForm = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const ItemLikeForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 0;
  gap: 2px;
  color: var(--color-gray02);
  font-size: var(--font-size12);
  font-family: "Roboto";
`;

// const ItemLikeicon = styled.div<ItemProps>``;

const ItemLikeCount = styled.div`
  position: relative;
  bottom: -1px;
`;

const ItemAnswerForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 2px 0;
  gap: 2px;
  color: var(--color-gray02);
  font-size: var(--font-size12);
  font-family: "Roboto";
  margin-bottom: -2px;
`;

// const ItemAnswericon = styled.div<ItemProps>``;

// const ItemAnswerCount = styled.div``;

const ItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding-bottom: 8px;
`;

const ItemChipForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ItemNickname = styled.div`
  font-size: var(--font-size12);
  letter-spacing: var(--font-spacing-title);
  color: var(--color-gray01);
`;
