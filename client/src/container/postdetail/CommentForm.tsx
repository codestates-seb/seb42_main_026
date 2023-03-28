import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { answer, addComment } from '../../api/answer';
import CustomAudio from '../../components/CustomAudio';
import useFFmpeg from '../../hooks/useFFmeng';
// import ICON_SUBIT from '../../assets/ic_commentform_submit_button.svg';

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

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
<<<<<<< HEAD
          <CommentInput
            placeholder="당신의 잔소리가 필요해요!"
            value={comment}
            onChange={handleCommentChange}
          />
          <ButtonWrapper
            state={questionId !== undefined && answerId === undefined}
          >
            {questionId !== undefined && answerId === undefined ? (
              <CustomAudio Props={setAudio} />
            ) : null}
            <CommentButton
              type="submit"
              onClick={() => buttonRef.current?.click()}
            >
=======
          <CommentInput placeholder="당신의 잔소리가 필요해요!" value={comment} onChange={handleCommentChange} />
          <ButtonWrapper state={questionId !== undefined && answerId === undefined}>
            {questionId !== undefined && answerId === undefined ? <CustomAudio type="button" onRecordedBlob={setAudio} /> : null}
            <CommentButton type="submit" onClick={() => buttonRef.current?.click()}>
>>>>>>> fc89394 (fix : audio 크로스브라우징 해결)
              댓글 작성
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
  border-radius: 5px;
  padding: 10px;
  overflow-y: hidden;
  font-size: var(--font-size14);
  resize: none;
  height: 60px;
  margin-bottom: 10px;
  font-family: 'Noto Sans KR';
  border: none;
  :focus {
    outline: none;
  }
`;

const CommentButton = styled.button`
  background-color: var(--color-mobMain);
  white-space: nowrap;
  color: #fff;
  border: none;
  font-size: var(--font-size14);
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
