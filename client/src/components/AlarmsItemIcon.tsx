import styled from "styled-components";
import { ReactComponent as ICON_ALARMS_ANSWER } from "../assets/ic_alarmsItem_answer.svg";
import { ReactComponent as ICON_ALARMS_HAMER } from "../assets/ic_alarmsItem_hamer.svg";

interface AlarmsItemProps {
  icon?: "광고" | "댓글";
}

export default function NotificationItemIcon({ icon }: AlarmsItemProps) {
  return (
    <AlarmsItemIconStyle>
      {icon === "댓글" ? (
        <ItemIconAnswer>
          <ICON_ALARMS_ANSWER />
        </ItemIconAnswer>
      ) : (
        <ItemIconHamer>
          <ICON_ALARMS_HAMER />
        </ItemIconHamer>
      )}
    </AlarmsItemIconStyle>
  );
}

const AlarmsItemIconStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: var(--color-mobMain);
  border-radius: 100px;
`;
const ItemIconAnswer = styled.div`
  position: relative;
`;
const ItemIconHamer = styled.div`
  position: relative;
  margin-top: 6px;
  margin-left: -2px;
`;
