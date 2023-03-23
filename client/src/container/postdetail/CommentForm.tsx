import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { answer, addComment } from '../../api/answer';
import ICON_SUBIT from '../../assets/ic_commentform_submit_button.svg'

type Props = {
  questionId?: number;
  answerId?: number;
};

const CommentForm: React.FC<Props> = ({ questionId, answerId }) => {
  const [comment, setComment] = useState<string>('');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

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
      <form onSubmit={handleSubmit}>
        <CommentInputWrapper>
          <CommentInput placeholder="댓글을 입력해주세요" value={comment} onChange={handleCommentChange} />
          <ButtonWrapper>
            <AudioButtonContainer>
              {!recorder ? <button onClick={startRecording}>녹음시작</button> : <button onClick={stopRecording}>녹음정지</button>}
              <button onClick={clearRecording}>초기화</button>
              <audio controls>
                {audioChunks.map((chunk, i) => (
                  <source key={i} src={URL.createObjectURL(chunk)} />
                ))}
              </audio>
            </AudioButtonContainer>
            <CommentButton type="submit">댓글 작성</CommentButton>
          </ButtonWrapper>
        </CommentInputWrapper>
      </form>
    </>
  );
};

export default CommentForm;

const CommentInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border: solid 0.5px var(--color-gray01);
  border-radius: 5px;
`;

const CommentInput = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  resize: none;
  height: 100px;
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
  font-size: 14px;
  padding: 19px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: solid 0.5px var(--color-gray01);
`;

const AudioButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
