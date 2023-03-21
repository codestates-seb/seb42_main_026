import styled from 'styled-components';

interface MenuItem {
  title: string;
  button?: () => void;
}

interface MenuButtonProps {
  menu: MenuItem[];
}

const MenuButton = ({ menu }: MenuButtonProps) => {
  return (
    <MenuButtonWrapper>
      {menu.map(({ title, button }, index) => (
        <button key={index} onClick={button}>
          {title}
        </button>
      ))}
    </MenuButtonWrapper>
  );
};
export default MenuButton;

const MenuButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  background-color: var(--color-white01);
  border-radius: 5px;
  padding: 4px 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
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
