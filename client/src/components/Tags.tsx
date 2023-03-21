import styled from 'styled-components';

interface TagesProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  size?: 'big' | 'small';
  tagClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function Tags({
  title,
  size,
  tagClickHandler,
  disabled,
}: TagesProps) {
  return (
    <TagsStyle size={size} onClick={tagClickHandler} disabled={disabled}>
      {title}
    </TagsStyle>
  );
}

const TagsStyle = styled.button<TagesProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 22px;
  color: ${(props) => (props.disabled ? 'white' : '#285f94')};
  background-color: ${(props) => (props.disabled ? '#5391CD' : '#edf7f9')};
  padding: ${(props) =>
    props.size === 'big' ? `4px 10px ` : ` 1.5px 8px 2px; `};
  border-radius: 5px;
  font-size: ${(props) =>
    props.size === 'big' ? `var(--font-size14)` : `var(--font-size12)`};
  border: none;
`;
