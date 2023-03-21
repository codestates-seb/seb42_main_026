import MenuButton from '../components/MenuButton';
import ICON_MENU_BUTTON from '../assets/ic_answer_menubutton.svg';
import { useState } from 'react';
import styled from 'styled-components';

export default function ChecklistPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <ChecklistWapper>
      자취필수체크리스트
      <MenuButtonWapper>
        <ButtonStyle onClick={handleToggle}>
          <img src={ICON_MENU_BUTTON} alt="search icon" />
        </ButtonStyle>
        {isMenuOpen === true ? <MenuButton /> : null}
      </MenuButtonWapper>
    </ChecklistWapper>
  );
}

const ChecklistWapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% -32px);
  height: 100vh;
  margin: 16px;
  background-color: aliceblue;
`;

const MenuButtonWapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  right: 0;
`;

const ButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  border: 0.5px solid #000000;
  width: 22px;
  height: 34px;
  font-size: var(--color-black01);
  color: var(--color-black01);
  background-color: var(--color-white01);
`;
