"use client";

import React, { useRef } from "react";
import { useRegisterAudio } from "../hooks/audio";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { playAudio } = useRegisterAudio(audioRef);

  const onPlay = () => {
    playAudio(audioRef);
  };

  return <audio ref={audioRef} src={src} controls onPlay={onPlay} />;
};

export default AudioPlayer;
