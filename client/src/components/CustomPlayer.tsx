import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ICON_PAUSE } from '../assets/ic_audio_pause_button.svg';
import { ReactComponent as ICON_PLAY } from '../assets/ic_audio_play_button.svg';

interface Props {
  audioSrc: string;
}

const CustomPlayer = ({ audioSrc }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    if (audioSrc) {
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
      <ControlButton type="button" onClick={handlePlayPause}>
        {isPlaying ? <ICON_PAUSE /> : <ICON_PLAY />}
      </ControlButton>
      <ProgressBar>
        <Progress progress={progress}></Progress>
      </ProgressBar>
      <audio ref={audioRef} src={audioSrc} />
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
  min-width: 132px;
  background-color: #f3f3f3;
  position: relative;
`;

interface ProgressProps {
  progress?: number;
}

const Progress = styled.div.attrs<ProgressProps>((props) => ({
  style: {
    width: `${props.progress || 0}%`,
  },
}))<ProgressProps>`
  background-color: var(--color-mobMain);
  height: 8px;
`;

export default CustomPlayer;
