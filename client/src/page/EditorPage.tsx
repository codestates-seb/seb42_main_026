import styled from 'styled-components';
import Tags from '../components/Tags';

const EditorPage = () => {
  return (
    <EditorPageWrapper>
      <TagSelector>
        <Tags title={'운동'} size="small" />
        <Tags title={'공부'} size="small" />
        <Tags title={'기상'} size="small" />
        <Tags title={'기타'} size="small" />
      </TagSelector>
      <TitleInput placeholder="제목"></TitleInput>
      <ContentInput placeholder="나에게 필요한 잔소리를 요청해보세요!"></ContentInput>
    </EditorPageWrapper>
  );
};

export default EditorPage;

const EditorPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 16px;
  input::placeholder {
    color: var(--color-gray02);
  }
  textarea::placeholder {
    color: var(--color-gray02);
  }
  input:focus {
    outline: none;
  }
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
