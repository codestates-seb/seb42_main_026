import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAudioSrc } from '../hooks/useAudioSrc';

interface ProgressProps {
  progress?: number;
}

const CustomAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const { audioSrc, reset: resetAudioSrc } = useAudioSrc(recordedBlob);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleRecord = async () => {
    if (isRecording) {
      setIsLoading(true);
      mediaRecorderRef.current!.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setTimeout(() => {
          setIsLoading(false);
        }, 2500);
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream; // Store the stream in streamRef
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          setRecordedBlob(blob);
          chunksRef.current = [];
        };
        mediaRecorderRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
    setIsRecording(!isRecording);
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    resetAudioSrc();

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        updateProgress();
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (audio) {
      const progressPercentage = (audio.currentTime / audio.duration) * 100;
      setProgress(progressPercentage);
    }
    requestAnimationFrame(updateProgress);
  };

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      const audio = audioRef.current!;
      audio.onended = () => {
        setIsPlaying(false);
        setProgress(0);
      };
      if (isPlaying) {
        updateProgress();
      }
    }
  }, [audioSrc, isPlaying]);

  return (
    <AudioButtonContainer>
      <ControlButton type="button" onClick={handleRecord}>
        {isRecording ? '녹음정지' : `${isLoading?'처리중':'녹음시작'}`}
      </ControlButton>

      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : null}

      {audioSrc && !isLoading ? (
        <>
          <ControlButton type="button" onClick={handlePlayPause}>
            {isPlaying ? '정지' : '재생'}
          </ControlButton>
          <ControlButton type="button" onClick={handleReset}>
            지우기
          </ControlButton>
          <ProgressBar>
            <Progress progress={progress}></Progress>
          </ProgressBar>
          <audio ref={audioRef} src={audioSrc} />
        </>
      ) : null}
    </AudioButtonContainer>
  );
};

const AudioButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: #1c1c1c;
  font-size: 14px;
  margin: 5px;
  outline: none;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  width: 240px;
  background-color: #f3f3f3;
  position: relative;
`;

const Progress = styled.div.attrs<ProgressProps>((props) => ({
  style: {
    width: `${props.progress || 0}%`,
  },
}))<ProgressProps>`
  background-color: var(--color-mobMain);
  height: 8px;
`;

const SpinnerContainer = styled.div`
  position: relative;
  margin: 8px;
`;

const Spinner = styled.div`
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--color-mobMain);
  width: 24px;
  height: 24px;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default CustomAudio;
