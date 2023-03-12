import styled from "styled-components";


interface ButtonProps {
  title?: string;
  color?: 'pink' | 'normal';
}

const Button = ({ color, title }: ButtonProps) => {
  return (
    <>
      <LoginButton color={color}>
        <LoginText>{title}</LoginText>
      </LoginButton>
    </>
  );
};

export default Button;

const LoginButton = styled.button<ButtonProps>`
  height: 55px;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: ${(props) => props.color === "pink"  ? '#fff' : props.theme.colors.gray01};
  border: ${(props) => props.color === "pink"  ? 'none' : `solid 1px ${props.theme.colors.gray03}`};
  background-color: ${(props) => props.color === "pink" ? props.theme.colors.webMain : '#fff'};
`;
const LoginText = styled.span<ButtonProps>`
  font-family: "Noto Sans KR";
  font-size: "14px";
  letter-spacing: -0.05em;
`;
