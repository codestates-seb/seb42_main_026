import styled from "styled-components";

interface ChipsProps {
  title?: string;
  color?: "pink" | "gray";
  weight?: string;
}

const StatusChips = ({ color, title, weight }: ChipsProps) => {
  return (
    <StatusChipsStyle color={color} weight={weight}>
      {title}
    </StatusChipsStyle>
  );
};

export default StatusChips;

const StatusChipsStyle = styled.div<ChipsProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37px;
  height: 17px;
  border-radius: 10px;
  color: var(--color-white01);
  background-color: ${(props) =>
    props.color === "pink" ? `var(--color-mobMain)` : `var(--color-gray03)`};
  font-size: var(--font-size10);
  font-weight: var(--font-weight300);
`;
