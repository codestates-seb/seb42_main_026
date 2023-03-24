import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { answer, addComment } from '../../api/answer';
// import ICON_SUBIT from '../../assets/ic_commentform_submit_button.svg';

type Props = {
  questionId?: number;
  answerId?: number;
};

const CommentForm: React.FC<Props> = ({ questionId, answerId }) => {
  const [comment, setComment] = useState<string>('');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
        if (event.data.size > 0) {
          setAudioChunks((chunks) => [...chunks, event.data]);
        }
      });

      setRecorder(mediaRecorder);
      mediaRecorder.start();
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setRecorder(null);
    }
  };

  const clearRecording = () => {
    setAudioChunks([]);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    if (questionId !== undefined && answerId === undefined) {
      answer(comment, questionId);
    } else if (answerId !== undefined && questionId !== undefined) {
      addComment(questionId, answerId, comment);
    }
    // onSubmit(comment, audioBlob);
    setComment('');
    setAudioChunks([]);
  };

  useEffect(() => {
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      audioElement.srcObject = null;
      audioElement.src = URL.createObjectURL(new Blob(audioChunks, { type: 'audio/webm' }));
    }
  }, [audioChunks]);

  return (
    <>
      <CommentInputWrapper>
        <form onSubmit={handleSubmit}>
          <CommentInput placeholder="당신의 잔소리가 필요해요!" value={comment} onChange={handleCommentChange} />
          <NoneButton ref={buttonRef} type="submit">
            댓글 작성
          </NoneButton>
        </form>
        <ButtonWrapper>
          {/* <AudioButtonContainer>
              {!recorder ? <button onClick={startRecording}>녹음시작</button> : <button onClick={stopRecording}>녹음정지</button>}
              <button onClick={clearRecording}>초기화</button>
              <CustomAudio controls>
                {audioChunks.map((chunk, i) => (
                  <source key={i} src={URL.createObjectURL(chunk)} />
                ))}
              </CustomAudio>
            </AudioButtonContainer> */}
          <CommentButton onClick={() => buttonRef.current?.click()}>➜</CommentButton>
        </ButtonWrapper>
      </CommentInputWrapper>
    </>
  );
};

export default CommentForm;

const NoneButton = styled.button`
  display: none;
`;

const CustomAudio = styled.audio`
  width: 96px;
  height: 48px;
`;

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
  font-size: 16px;
  resize: none;
  height: 60px;
  margin-bottom: 10px;
  font-family: 'Noto Sans KR';
  border: none;
  :focus {
    outline: none;
    font-family: 'Noto Sans KR';
  }
`;

const CommentButton = styled.button`
  background-color: var(--color-mobMain);
  color: #fff;
  border: none;
  font-size: 16px;
  padding: 13px 15px;
  margin: 5px 10px;
  border-radius: 50%;
  transform: rotate(-90deg);
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-top: solid 0.5px var(--color-gray01);
`;

const AudioButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
