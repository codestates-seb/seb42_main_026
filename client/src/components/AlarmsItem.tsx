import styled from "styled-components";
import AlarmsItemIcon from "./AlarmsItemIcon";

interface NotificationItemProps {
  title: string;
  icon?: "광고" | "댓글";
  contents: string;
  createdAt: string;
}

export default function NotificationItem({
  title,
  icon,
  contents,
  createdAt,
}: NotificationItemProps) {
  return (
    <NotificationItemStyle>
      <div>
        <AlarmsItemIcon icon={icon} />
      </div>
      <ItemForm>
        <ItemTitle>{title}</ItemTitle>
        <ItemContent>{contents}</ItemContent>
        <ItemDate>{createdAt}</ItemDate>
      </ItemForm>
    </NotificationItemStyle>
  );
}

const NotificationItemStyle = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 18px 0px 18px;
  gap: 14px;
  border-bottom: 0.5px solid var(--color-gray03);
`;
const ItemForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  gap: 8px;
`;

const ItemTitle = styled.div`
  font-size: var(--font-size16);
  line-height: 20px;
  letter-spacing: var(--font-spacing-title);
  /* font-weight: var(--font-weight700); */
`;
const ItemContent = styled.div`
  font-size: var(--font-size12);
  font-weight: var(--font-weight700);
  color: var(--color-gray01);
`;
const ItemDate = styled.div`
  font-family: "Roboto";
  font-size: var(--font-size12);
  font-weight: var(--font-weight400);
  color: var(--color-gray01);
`;
