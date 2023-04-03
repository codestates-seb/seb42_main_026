import { useDispatch } from 'react-redux';

import styled, { keyframes } from 'styled-components';
import { setModal } from '../store/actions';
interface MenuItem {
  title: string;
  button?: () => void;
}

interface MenuButtonProps {
  menu: MenuItem[];
}

const MenuButton = ({ menu }: MenuButtonProps) => {
  const dispatch = useDispatch();

  function handleMenuButtonClick() {
    dispatch(setModal([], false));
  }

  return (
    <MenuButtonWrapper onClick={() => handleMenuButtonClick()}>
      <EditDeleteContainer>
        {menu.map(({ title, button }, index) => (
          <button key={index} onClick={button}>
            {title}
          </button>
        ))}
      </EditDeleteContainer>
    </MenuButtonWrapper>
  );
};
export default MenuButton;

const move = keyframes`
 from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const MenuButtonWrapper = styled.div`
  z-index: 900;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const EditDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
  position: absolute;
  height: 12rem;
  bottom: 0;
  border: 0.5px solid var(--color-gray02);
  background-color: var(--color-white01);
  border-radius: 5px 5px 0 0;
  max-width: 720px;
  min-width: 360px;
  width: calc(100% - 32px);
  animation: ${move} 0.5s ease;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border: none;
    border-bottom: solid 0.5px var(--color-gray04);
    font-size: var(--font-size14);
    color: var(--color-black01);
    background-color: var(--color-white01);
    padding: 0 16px;
  }
  button:last-child {
    border-bottom: none;
  }
`;
