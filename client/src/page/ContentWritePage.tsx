import { useEffect, useState, useRef, ChangeEvent } from 'react';
import styled from 'styled-components';
import Tags from '../components/Tags';
import { usePage } from '../hooks/usePage';
import { ReactComponent as ICON_IMAGE } from '../assets/ic_editorpage_image_button.svg';
import { ReactComponent as ICON_DELETE } from '../assets/ic_editorpage_delete_button.svg';

interface EditorPageProps {
  type?: string;
}

const ContentWritePage = ({ type }: EditorPageProps) => {
  const { setEditorHandler } = usePage();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [imgFile, setImgFile] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditorHandler(title, content, tag, imgFile[0]);
  }, [title, content, tag, imgFile[0]]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    handleResizeHeight();
  };

  const handleResizeHeight = () => {
    if (textareaRef.current instanceof HTMLTextAreaElement) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current?.scrollHeight + 'px';
    }
  };

  const previewImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImgFile([...imgFile, event.target.files[0]]);
    }
  };

  const deleteItem = (index: number) => {
    const newImgFile = [...imgFile];
    newImgFile.splice(index, 1);
    setImgFile(newImgFile);
  };

  return (
    <EditorPageWrapper>
      <TagSelector>
        <Tags title={'운동'} size="small" tagClickHandler={() => setTag('EXERCISE')} disabled={tag === 'EXERCISE'} type="button" />
        <Tags title={'공부'} size="small" tagClickHandler={() => setTag('STUDY')} disabled={tag === 'STUDY'} type="button" />
        <Tags title={'기상'} size="small" tagClickHandler={() => setTag('WAKE_UP')} disabled={tag === 'WAKE_UP'} type="button" />
        <Tags title={'기타'} size="small" tagClickHandler={() => setTag('ETC')} disabled={tag === 'ETC'} type="button" />
      </TagSelector>
      <TitleInput value={title} onChange={handleTitleChange} placeholder="제목"></TitleInput>
      <ContentContainer>
        <ContentInput ref={textareaRef} value={content} onChange={handleContentChange} placeholder="나에게 필요한 잔소리를 요청해보세요!" />
        <ImgContainer>
          {imgFile.length > 0 &&
            imgFile.map((file, index) => (
              <ItemContainer key={index}>
                <DeleteIcon>
                  <ICON_DELETE onClick={() => deleteItem(index)} />
                </DeleteIcon>
                <ImgItem src={URL.createObjectURL(file)} alt="preview" />
              </ItemContainer>
            ))}
        </ImgContainer>
        <ImgAddButton onClick={() => inputRef.current?.click()}>
          <ICON_IMAGE />
        </ImgAddButton>
      </ContentContainer>
      <CustomInput ref={inputRef} type="file" accept="image/gif ,image/jpeg, image/png" onChange={previewImage} />
    </EditorPageWrapper>
  );
};
export default ContentWritePage;

const CustomInput = styled.input`
  display: none;
`;

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

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const ImgAddButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background-color: var(--color-white01);
`;

const DeleteIcon = styled.div`
  top: 8px;
  left: 8px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const ImgContainer = styled.div`
  display: flex;
  gap: 14px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const ImgItem = styled.img`
  background-color: var(--color-gray01);
  border-radius: 5px;
  width: 48px;
  height: 48px;
`;
