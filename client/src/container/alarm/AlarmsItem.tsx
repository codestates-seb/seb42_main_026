import { ReactNode } from 'react';
import styled from 'styled-components';
import { ReactComponent as ICON_ALARMS_HAMER } from '../../assets/ic_alarms_hamer.svg';
import { ReactComponent as ICON_ALARMS_ANSWER } from '../../assets/ic_alarms_answer.svg';

interface NotificationItemProps {
  title?: string;
  pushType?: 'comment' | 'ad';
  contents?: string;
  createdAt?: string;
}

function getType({ pushType }: NotificationItemProps): ReactNode {
  switch (pushType) {
    case 'comment':
      return <ICON_ALARMS_ANSWER />;
    case 'ad':
      return <ICON_ALARMS_HAMER />;
    default:
      return <ICON_ALARMS_HAMER />;
  }
}

function NotificationItem({ title, pushType, contents, createdAt }: NotificationItemProps) {
  return (
    <NotificationItemStyle>
      {getType({ pushType })}
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

  gap: 4px;
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
  font-family: 'Roboto';
  font-size: var(--font-size12);
  font-weight: var(--font-weight400);
  color: var(--color-gray01);
`;

export default NotificationItem;
