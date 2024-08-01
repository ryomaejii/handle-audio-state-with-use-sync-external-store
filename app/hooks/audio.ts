import { useEffect, useSyncExternalStore } from "react";

type AudioElement = HTMLAudioElement | null;

let currentAudio: AudioElement = null;
const audioElements = new Set<HTMLAudioElement>();
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

export function useRegisterAudio(audioRef: React.RefObject<HTMLAudioElement>) {
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      registerAudioElement(audioElement);
    }
    return () => {
      if (audioElement) {
        unregisterAudioElement(audioElement);
      }
    };
  }, [audioRef]);
}

export function registerAudioElement(audio: HTMLAudioElement) {
  audioElements.add(audio);
}

export function unregisterAudioElement(audio: HTMLAudioElement) {
  audioElements.delete(audio);
}

export function playAudio(audioRef: React.RefObject<HTMLAudioElement>): void {
  if (audioRef.current) {
    setCurrentAudio(audioRef.current);
    audioRef.current.play();
  }
}

export function resetAllAudio() {
  audioElements.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}
