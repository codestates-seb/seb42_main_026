import styled from 'styled-components';

interface TagesProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  size?: 'big' | 'small';
  tagClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function Tags({ title, size, tagClickHandler, disabled }: TagesProps) {
  return (
    <TagsStyle size={size} onClick={tagClickHandler} disabled={disabled}>
      {title}
    </TagsStyle>
  );
}

const TagsStyle = styled.span<TagesProps>`
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  width: fit-content;
  height: 18px;
  color: ${(props) => (props.disabled ? 'white' : '#285f94')};
  background-color: ${(props) => (props.disabled ? '#5391CD' : '#edf7f9')};
  padding: ${(props) => (props.size === 'big' ? `3px 10px ` : `1.5px 5px 1.5px`)};
  border-radius: 5px;
  font-size: ${(props) => (props.size === 'big' ? `var(--font-size14)` : `var(--font-size10)`)};
`;
