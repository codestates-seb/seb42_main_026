import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tags from '../components/Tags';
import { usePage } from '../hooks/usePage';

const EditorPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('기타');
  const { getEditorHandler, setEditorHandler } = usePage();

  useEffect(() => {setEditorHandler(title, content, tag)}, [title, content, tag]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  return (
    <EditorPageWrapper>
      <TagSelector>
        {['운동', '공부', '기상', '기타'].map((t) => (
          <Tags key={t} title={t} size="small" tagClickHandler={() => setTag(t.toUpperCase())} disabled={tag === t.toUpperCase()} type="button" />
        ))}
      </TagSelector>
      <TitleInput value={title} onChange={handleTitleChange} placeholder="제목" />
      <ContentInput value={content} onChange={handleContentChange} placeholder="나에게 필요한 잔소리를 요청해보세요!" />
    </EditorPageWrapper>
  );
};

export default EditorPage;

const EditorPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 16px;
  input::placeholder,
  textarea::placeholder {
    color: var(--color-gray02);
  }
  input:focus,
  textarea:focus {
    outline: none;
  }
`;

const TagSelector = styled.div`
  display: flex;
  gap: 6px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-gray03);
`;

const TitleInput = styled.input`
  border: none;
  font-size: var(--font-size18);
  font-weight: var(--font-weight700);
  padding: 10px 0;
`;

const ContentInput = styled.textarea`
  border: none;
  font-family: 'Noto Sans KR';
  font-size: var(--font-size16);
  font-weight: var(--font-weight400);
  letter-spacing: -0.025em;
  padding: 10px 0;
  resize: none;
`;
