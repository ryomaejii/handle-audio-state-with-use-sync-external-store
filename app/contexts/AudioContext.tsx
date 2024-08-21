"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

type AudioElement = HTMLAudioElement | null;

interface AudioContextType {
  currentAudio: AudioElement;
  audioElements: Set<HTMLAudioElement>;
  setCurrentAudio: (audio: AudioElement) => void;
  registerAudioElement: (audio: HTMLAudioElement) => void;
  unregisterAudioElement: (audio: HTMLAudioElement) => void;
  resetAllAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentAudio, setCurrentAudioState] = useState<AudioElement>(null);
  const audioElements = new Set<HTMLAudioElement>();

  const setCurrentAudio = useCallback(
    (audio: AudioElement) => {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
      }
      setCurrentAudioState(audio);
    },
    [currentAudio]
  );

  const registerAudioElement = useCallback(
    (audio: HTMLAudioElement) => {
      audioElements.add(audio);
    },
    [audioElements]
  );

  const unregisterAudioElement = useCallback(
    (audio: HTMLAudioElement) => {
      audioElements.delete(audio);
    },
    [audioElements]
  );

  const resetAllAudio = useCallback(() => {
    audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, [audioElements]);

  return (
    <AudioContext.Provider
      value={{
        currentAudio,
        audioElements,
        setCurrentAudio,
        registerAudioElement,
        unregisterAudioElement,
        resetAllAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};
