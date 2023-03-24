import styled from 'styled-components';

interface tapProps {
  disabled: boolean;
  isClick: string;
  tapHandleClick: () => void;
  title: string;
}

export default function TapButton({ disabled, isClick, tapHandleClick, title }: tapProps) {
  return (
    <TapButtonStyle>
      <button disabled={disabled} className={isClick} onClick={tapHandleClick}>
        {title}
      </button>
    </TapButtonStyle>
  );
}

const TapButtonStyle = styled.div`
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
  .titleClicked {
    display: flex;
    align-items: center;
    width: max-content;
    padding: 16px 14px;
    height: 22px;
    font-size: var(--font-size14);
    color: var(--color-white01);
    background-color: #ff607c;
    border: none;
    border-radius: 5px 5px 0 0;
  }
  .title {
    background-color: #ffb9c4;
  }
`;
