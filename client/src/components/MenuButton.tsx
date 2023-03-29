import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface MenuItem {
  title: string;
  button?: () => void;
}

interface MenuButtonProps {
  menu: MenuItem[];
  onClose: Dispatch<SetStateAction<boolean>>;
}

interface ModalProps {
  widthValue: string;
}
const MenuButton = ({ menu, onClose }: MenuButtonProps) => {
  const [isOpen, setOpen] = useState(true);

  const appElement = document.querySelector('.App');
  let appWidth = 0;

  if (appElement !== null) {
    appWidth = parseInt(window.getComputedStyle(appElement).getPropertyValue('width'), 10);
  }

  if (isOpen) {
    return (
      <MenuButtonWrapper onClick={() => onClose(false)}>
        <EditDeleteContainer widthValue={`${appWidth - 32}px`}>
          {menu.map(({ title, button }, index) => (
            <button key={index} onClick={button}>
              {title}
            </button>
          ))}
        </EditDeleteContainer>
      </MenuButtonWrapper>
    );
  } else return <></>;
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

const EditDeleteContainer = styled.div<ModalProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
  z-index: 900;
  position: fixed;
  height: 12rem;
  bottom: 0;
  border: 0.5px solid var(--color-gray02);
  background-color: var(--color-white01);
  border-radius: 5px 5px 0 0;
  max-width: 720px;
  min-width: 360px;
  width: ${(props) => props.widthValue};
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
