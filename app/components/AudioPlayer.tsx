"use client";

import React, { useRef } from "react";
import { useAudioState } from "../hooks/useAudioState";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, currentTime } = useAudioState(audioRef);

  return (
    <div>
      <div>Audio is {isPlaying ? "playing" : "paused"}</div>
      <div>Current time: {currentTime}</div>
      <audio ref={audioRef} src={src} controls />
    </div>
  );
};

export default AudioPlayer;
