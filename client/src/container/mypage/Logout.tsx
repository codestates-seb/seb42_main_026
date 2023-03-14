import styled from "styled-components";

const Logout = () => {
  return (
    <LogoutWrapper>
      <LogoutButton>로그아웃</LogoutButton>
    </LogoutWrapper>
  );
};

export default Logout;

const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid var(--color-gray03); */
  border-radius: 5px;
  padding: 15.5px 0px;
`;

const LogoutButton = styled.span`
  position: relative;
  /* left: 20px; */
  /* font-size: var(--font-size16); */
  color: var(--color-gray02);
  letter-spacing: var(--font-spacing-title);
  font-weight: 100;
`;
