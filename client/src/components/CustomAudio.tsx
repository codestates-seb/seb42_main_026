import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAudioSrc } from '../hooks/useAudioSrc';

import { ReactComponent as ICON_MIC } from '../assets/ic_audio_mic_button.svg';
import { ReactComponent as ICON_PAUSE } from '../assets/ic_audio_pause_button.svg';
import { ReactComponent as ICON_PLAY } from '../assets/ic_audio_play_button.svg';
import { ReactComponent as ICON_START } from '../assets/ic_audio_start_button.svg';
import { ReactComponent as ICON_STOP } from '../assets/ic_audio_stop_button.svg';

interface ProgressProps {
  progress?: number;
}

const CustomAudio = ({ Props }: any) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const { audioSrc, reset: resetAudioSrc } = useAudioSrc(recordedBlob);
  const [isStart, setStart] = useState(false);
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
          const blob = new Blob(chunksRef.current, { type: 'audio/mp4' });
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
    Props(recordedBlob);
  }, [audioSrc, isPlaying]);

  return (
    <AudioButtonContainer>
      <ControlButton type="button" onClick={() => (isStart ? handleRecord() : setStart(true))}>
        {!isStart && (
          <StartContainer>
            <ICON_MIC />
            <span>보이스리플을 남겨주세요.</span>
          </StartContainer>
        )}
        {isStart ? (
          isRecording ? (
            <ICON_STOP />
          ) : isLoading ? (
            <SpinnerContainer>
              <Spinner>
                <ICON_START />
              </Spinner>
            </SpinnerContainer>
          ) : (
            <ICON_START />
          )
        ) : null}
      </ControlButton>

      {/* {isLoading ? (
        <SpinnerContainer>
          <Spinner>
            <ICON_START />
          </Spinner>
        </SpinnerContainer>
      ) : (
        <ICON_START />
      )} */}

      {audioSrc && !isLoading ? (
        <>
          <ControlButton type="button" onClick={handlePlayPause}>
            {isPlaying ? <ICON_PAUSE /> : <ICON_PLAY />}
          </ControlButton>
          <ControlButton type="button" onClick={handleReset}>
            취소
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
  white-space: nowrap;
  background: none;
  padding-left: 6px;
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

const StartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 6px;
  color: var(--color-gray01);
`;

const SpinnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 8px; */
`;

const Spinner = styled.div`
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--color-mobMain);
  width: 26px;
  height: 26px;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default CustomAudio;
