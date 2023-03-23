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

const MenuButtonWrapper = styled.div`
  position: relative;
`;

const EditDeleteContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
  width: 96px;
  right: 0;
  top: 32px;
  border: 1px solid var(--color-gray02);
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
