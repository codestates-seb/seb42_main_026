import styled from "styled-components";

interface ChipsProps {
  color?: "pink" | "gray";
}

const StatusChips = ({ color }: ChipsProps) => {
  return (
    <StatusChipsStyle color={color}>
      {color === "pink" ? "갱생중" : "갱생완"}
    </StatusChipsStyle>
  );
};

export default StatusChips;

const StatusChipsStyle = styled.span<ChipsProps>`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 18px;
  border-radius: 5px;
  color: var(--color-white01);
  background-color: ${(props) =>
    props.color === "pink" ? `var(--color-mobMain)` : `var(--color-gray03)`};
  font-size: var(--font-size10);
  padding: 1.5px 5px 1.5px;
`;
