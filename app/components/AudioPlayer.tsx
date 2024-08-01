"use client";

import React, { useRef, useEffect } from "react";
import { playAudio, useCurrentAudio } from "../hooks/useCurrentAudio";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [handlePlay] = useCurrentAudio(audioRef);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("play", handlePlay);

      return () => {
        audioElement.removeEventListener("play", handlePlay);
      };
    }
  }, []);

  return <audio ref={audioRef} src={src} controls onPlay={handlePlay} />;
};

export default AudioPlayer;
