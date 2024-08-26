"use client";

import { useAudioState } from "../hooks/useAudioState";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const { audioRef, isPlaying, currentTime, resetAudio } = useAudioState({});

  return (
    <div>
      <div>Audio is {isPlaying ? "playing" : "paused"}</div>
      <div>Current time: {currentTime}</div>
      <div>
        <button onClick={resetAudio}>Reset</button>
      </div>
      <audio ref={audioRef} src={src} controls />
    </div>
  );
};

export default AudioPlayer;
