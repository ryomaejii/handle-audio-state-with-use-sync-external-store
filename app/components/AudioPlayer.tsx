"use client";

import React, { useRef, useEffect } from "react";
import { playAudio, useCurrentAudio, useRegisterAudio } from "../hooks/audio";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  useRegisterAudio(audioRef);

  const onPlay = () => {
    playAudio(audioRef);
  };

  return <audio ref={audioRef} src={src} controls onPlay={onPlay} />;
};

export default AudioPlayer;
