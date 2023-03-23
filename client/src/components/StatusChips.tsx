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

const StatusChipsStyle = styled.div<ChipsProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 22px;
  border-radius: 10px;
  color: var(--color-white01);
  background-color: ${(props) =>
    props.color === "pink" ? `var(--color-mobMain)` : `var(--color-gray03)`};
  font-size: var(--font-size12);
  font-weight: var(--font-weight300);
  padding: 1.5px 8px 2px;
`;
