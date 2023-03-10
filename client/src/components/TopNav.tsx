import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";

export default function Hnb() {
  const { isLoggedIn, logoutHandler } = useAuth();

  return (
    <Hnbcss>
      <span>{"로그인 " + isLoggedIn}</span>
      <button onClick={logoutHandler}>로그아웃</button>
    </Hnbcss>
  );
}

const Hnbcss = styled.header`
  user-select: none;
  align-self: stretch;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fffeb6;
  padding: 44px 16px 0px 16px;
`;
