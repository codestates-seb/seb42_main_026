import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { answer, addComment } from '../../api/answer';

type Props = {
  questionId?: number;
  answerId?: number;
};

const CommentInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CommentInput = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  resize: none;
  height: 100px;
  margin-bottom: 10px;
  :focus {
    outline: none;
    font-family: 'Noto Sans KR';
  }
`;

const CommentButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const AudioButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

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
            <CommentButton type="submit">댓글 작성</CommentButton>
          </ButtonWrapper>
        </CommentInputWrapper>
      </form>
      {/* <AudioButtonContainer>
        {!recorder ? <button onClick={startRecording}>녹음시작</button> : <button onClick={stopRecording}>녹음정지</button>}
        <button onClick={clearRecording}>초기화</button>
        <audio controls>
          {audioChunks.map((chunk, i) => (
            <source key={i} src={URL.createObjectURL(chunk)} />
          ))}
        </audio>
      </AudioButtonContainer> */}
    </>
  );
};

export default CommentForm;
