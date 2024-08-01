"use client";

import React, { useRef, useEffect } from "react";
import { playAudio, useCurrentAudio } from "../hooks/useCurrentAudio";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentAudio = useCurrentAudio();

  const handlePlay = () => {
    if (audioRef.current) {
      playAudio(audioRef.current);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("play", handlePlay);

      return () => {
        audioElement.removeEventListener("play", handlePlay);
      };
    }
  }, []);

  useEffect(() => {
    if (currentAudio && currentAudio !== audioRef.current && audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentAudio]);

  return <audio ref={audioRef} src={src} controls />;
};

export default AudioPlayer;
