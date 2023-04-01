import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { answer, addComment } from '../../api/answer';
import CustomAudio from '../../components/CustomAudio';
import useFFmpeg from '../../hooks/useFFmeng';
import { RootState } from '../../store/store';

type Props = {
  questionId?: number;
  answerId?: number;
};

type ButtonProps = {
  state: boolean;
};

const CommentForm: React.FC<Props> = ({ questionId, answerId }) => {
  const { load, convertToMp3, cancel } = useFFmpeg();
  const [comment, setComment] = useState<string>('');
  const [isAudio, setAudio] = useState<Blob | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin);

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleLoad = async () => {
    await load();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (questionId !== undefined && answerId === undefined) {
      if (isAudio !== null) {
        try {
          await handleLoad();
          const mp3Blob = await convertToMp3(isAudio, 'recording.mp3');
          answer(comment, questionId, mp3Blob);
        } catch (error) {
          console.log(error);
        } finally {
          cancel();
        }
      } else {
        answer(comment, questionId);
      }
    } else if (answerId !== undefined && questionId !== undefined) {
      addComment(questionId, answerId, comment);
    }
    setComment('');
    setAudio(null);
  };

  return (
    <>
      <CommentInputWrapper>
        <form onSubmit={handleSubmit}>
          <CommentInput placeholder={isLoggedIn ? '당신의 잔소리가 필요해요!' : '로그인이 필요합니다.'} disabled={!isLoggedIn} value={comment} onChange={handleCommentChange} />
          <ButtonWrapper state={questionId !== undefined && answerId === undefined}>
            {questionId !== undefined && answerId === undefined ? <CustomAudio type="button" onRecordedBlob={setAudio} /> : null}
            <CommentButton disabled={!isLoggedIn} type="submit" onClick={() => buttonRef.current?.click()}>
              댓글쓰기
            </CommentButton>
          </ButtonWrapper>
        </form>
      </CommentInputWrapper>
    </>
  );
};

export default CommentForm;

const CommentInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 20px;
  border: solid 0.5px var(--color-gray01);
  border-radius: 5px;
`;

const CommentInput = styled.textarea`
  width: 90%;
  border: 1px solid #ccc;
  background-color: var(--color-white01);
  border-radius: 5px;
  padding: 10px;
  overflow-y: hidden;
  font-size: var(--font-size14);
  resize: none;
  height: 60px;
  margin-bottom: 10px;
  font-family: 'Noto Sans KR';
  border: none;
  ::placeholder {
    color: var(--color-gray01);
  }
  :focus {
    outline: none;
  }
`;

const CommentButton = styled.button`
  background-color: ${(porps) => (porps.disabled ? 'var(--color-gray02)' : 'var(--color-mobMain)')};
  white-space: nowrap;
  color: #fff;
  border: none;
  font-size: var(--font-size12);
  padding: 16px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.state ? 'space-between' : 'flex-end')};
  align-items: center;
  border-top: solid 0.5px var(--color-gray01);
`;
