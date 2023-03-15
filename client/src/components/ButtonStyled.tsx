import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  color?: 'pink' | 'normal';
  width?: string;
  height?: string;
  radius?: string;
  buttonClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ color, title, width = '', height = '', radius = '', buttonClickHandler, type }: ButtonProps) => {
  return (
    <LoginButton type={type || 'button'} onClick={buttonClickHandler} color={color} width={width} height={height} radius={radius}>
      <LoginText>{title}</LoginText>
    </LoginButton>
  );
};

export default Button;

const LoginButton = styled.button<ButtonProps>`
  width: ${(props) => (props.width === '' ? '100%' : props.width)};
  height: ${(props) => (props.height === '' ? '55px' : props.height)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => (props.radius === '' ? '5px' : props.radius)};
  color: ${(props) => (props.color === 'pink' ? `var(--color-white01)` : `var(--color-gray01)`)};
  border: ${(props) => (props.color === 'pink' ? 'none' : `solid 1px var(--color-gray03)`)};
  background-color: ${(props) => (props.color === 'pink' ? `var(--color-mobMain)` : `var(--color-white01)`)};
`;
const LoginText = styled.span`
  font-family: 'Noto Sans KR';
  font-size: var(--font-size14);
  letter-spacing: var(--font-spacing-title);
`;
