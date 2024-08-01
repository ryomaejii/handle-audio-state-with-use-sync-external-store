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
  currentAudio = audio;
  listeners.forEach((listener) => listener());
}

export function useCurrentAudio(): AudioElement {
  return useSyncExternalStore(subscribe, getSnapshot);
}

export function playAudio(audio: AudioElement): void {
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  setCurrentAudio(audio);
}
