"use client";

import React, { useRef, useEffect } from "react";
import { playAudio, useCurrentAudio } from "../hooks/useCurrentAudio";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const onPlay = () => {
    playAudio(audioRef);
  };

  return <audio ref={audioRef} src={src} controls onPlay={onPlay} />;
};

export default AudioPlayer;
