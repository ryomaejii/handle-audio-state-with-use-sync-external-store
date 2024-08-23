"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface AudioManagerContext {
  audios: HTMLAudioElement[];
  setAudios: React.Dispatch<React.SetStateAction<HTMLAudioElement[]>>;
  playingAudios: HTMLAudioElement[];
  setPlayingAudios: React.Dispatch<React.SetStateAction<HTMLAudioElement[]>>;
}

const AudioManagerContext = createContext<AudioManagerContext | undefined>(
  undefined
);

export const useAudioManagerContext = (): AudioManagerContext => {
  const context = useContext(AudioManagerContext);
  if (!context) {
    throw new Error(
      "useAudioManager must be used within an AudioManagerProvider"
    );
  }
  return context;
};

export const useAudioManager = () => {
  const { audios, setAudios, playingAudios, setPlayingAudios } =
    useAudioManagerContext();

  const addAudios = useCallback(
    (audio: HTMLAudioElement) => {
      setAudios((prev) => [...prev, audio]);
    },
    [setAudios]
  );

  const removeAudios = useCallback(
    (audio: HTMLAudioElement) => {
      setAudios((prev) => prev.filter((a) => a !== audio));
    },
    [setAudios]
  );

  const addPlayingAudio = useCallback(
    (audio: HTMLAudioElement) => {
      setPlayingAudios((prev) => [...prev, audio]);
    },
    [setPlayingAudios]
  );

  const removePlayingAudio = useCallback(
    (audio: HTMLAudioElement) => {
      setPlayingAudios((prev) => prev.filter((a) => a !== audio));
    },
    [setPlayingAudios]
  );

  const resetAudios = useCallback(() => {
    audios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, [playingAudios, setPlayingAudios]);

  return {
    audios,
    addAudios,
    removeAudios,
    addPlayingAudio,
    removePlayingAudio,
    playingAudios,
    resetAudios,
  };
};

export const AudioManagerProvider = ({ children }: { children: ReactNode }) => {
  const [audios, setAudios] = useState<HTMLAudioElement[]>([]);
  const [playingAudios, setPlayingAudios] = useState<HTMLAudioElement[]>([]);

  return (
    <AudioManagerContext.Provider
      value={{ audios, setAudios, playingAudios, setPlayingAudios }}
    >
      {children}
    </AudioManagerContext.Provider>
  );
};
