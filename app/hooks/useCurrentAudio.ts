import { useSyncExternalStore } from "react";

type AudioElement = HTMLAudioElement | null;

let currentAudio: AudioElement = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): AudioElement {
  return currentAudio;
}

function setCurrentAudio(audio: AudioElement): void {
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
  }
  currentAudio = audio;
  listeners.forEach((listener) => listener());
}

export function useCurrentAudio() {
  const audio = useSyncExternalStore(subscribe, getSnapshot);
  const isPlaying = Boolean(audio);

  return {
    audio,
    isPlaying,
  };
}

export function playAudio(audioRef: React.RefObject<HTMLAudioElement>): void {
  if (audioRef.current) {
    setCurrentAudio(audioRef.current);
    audioRef.current.play();
  }
}
