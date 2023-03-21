import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  onSubmit: (comment: string, audio: Blob | null) => void;
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
  justify-content: space-between;
  align-items: center;
`;

const AudioButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const CommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [comment, setComment] = useState<string>('');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('dataavailable', (event: any) => {
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

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
    onSubmit(comment, audioBlob);
    setComment('');
    setAudioChunks([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CommentInputWrapper>
        <CommentInput placeholder="댓글을 입력해주세요" value={comment} onChange={handleCommentChange} />
        <ButtonWrapper>
          <AudioButtonContainer>
            {!recorder ? <CommentButton onClick={startRecording}>녹음시작</CommentButton> : <CommentButton onClick={stopRecording}>녹음정지</CommentButton>}
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
  );
};

export default CommentForm;
