import styled from "styled-components";
import { ReactComponent as ICON_ALRAM } from "../assets/ic_topnav_alram_button.svg";
import { ReactComponent as ICON_BADGE } from "../assets/ic_topnav_alram_badge.svg";
import { ReactComponent as ICON_LOGO } from "../assets/ic_topnav_logo_button.svg";
import { ReactComponent as ICON_BACK } from "../assets/ic_topnav_back_button.svg";
import { usePage } from "../hooks/usePage";

export default function TopNav() {
  const { setPageHandler, isPages } = usePage();

  return (
    <TopNavWrapper>
      <LeftContainer>
        {isPages === "" ? (
          <ICON_LOGO width={25} height={25} />
        ) : (
          <ICON_BACK width={8} height={14} />
        )}
      </LeftContainer>
      {isPages === "home" ? (
        <LogoTitle>로그인</LogoTitle>
      ) : (
        <LogoTitle>PPONG</LogoTitle>
      )}
      <RightContainer>
        {isPages === "" ? (
          <>
            <ICON_ALRAM />
            <ICON_BADGE />
          </>
        ) : (
          <></>
        )}
      </RightContainer>
    </TopNavWrapper>
  );
}

const TopNavWrapper = styled.header`
  user-select: none;
  align-self: stretch;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-white01);
  padding: 44px 16px 0px 16px;
`;

const RightContainer = styled.div`
  display: flex;
  width: 32px;
  justify-content: center;
`;
const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
`;

const LogoTitle = styled.span`
  position: absolute;
  font-weight: 900;
  vertical-align: center;
  text-align: center;
  font-size: 20px;
  font-family: "Roboto";
  color: var(--color-mobMain);
  letter-spacing: var(--font-spacing-title);
  left: calc(50% - 32px);
`;
