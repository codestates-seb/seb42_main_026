import styled from "styled-components";

interface TagesProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  size?: "big" | "small";
  tagClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Tags({ title, size, tagClickHandler }: TagesProps) {
  return (
    <TagsStyle size={size} onClick={tagClickHandler}>
      {title}
    </TagsStyle>
  );
}

const TagsStyle = styled.span<TagesProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 22px;
  color: #285f94;
  background-color: #edf7f9;
  padding: ${(props) =>
    props.size === "big" ? `4px 10px ` : ` 1.5px 8px 2px; `};
  border-radius: 5px;
  font-size: ${(props) =>
    props.size === "big" ? `var(--font-size14)` : `var(--font-size12)`};
`;
