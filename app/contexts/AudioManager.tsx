"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface AudioManagerContext {
  addAudio: (audio: HTMLAudioElement) => void;
  removeAudio: (audio: HTMLAudioElement) => void;
  playingAudios: HTMLAudioElement[];
}

const AudioManagerContext = createContext<AudioManagerContext | undefined>(
  undefined
);

export const useAudioManager = (): AudioManagerContext => {
  const context = useContext(AudioManagerContext);
  if (!context) {
    throw new Error(
      "useAudioManager must be used within an AudioManagerProvider"
    );
  }
  return context;
};

export const AudioManagerProvider = ({ children }: { children: ReactNode }) => {
  const [playingAudios, setPlayingAudios] = useState<HTMLAudioElement[]>([]);

  const addAudio = useCallback(
    (audio: HTMLAudioElement) => {
      setPlayingAudios((prev) => [...prev, audio]);
    },
    [setPlayingAudios]
  );

  const removeAudio = useCallback(
    (audio: HTMLAudioElement) => {
      setPlayingAudios((prev) => prev.filter((a) => a !== audio));
    },
    [setPlayingAudios]
  );

  return (
    <AudioManagerContext.Provider
      value={{ addAudio, removeAudio, playingAudios }}
    >
      {children}
    </AudioManagerContext.Provider>
  );
};
