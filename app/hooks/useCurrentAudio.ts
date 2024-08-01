import { useEffect, useSyncExternalStore } from "react";

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

export function useCurrentAudio(
  audioRef: React.RefObject<HTMLAudioElement>
): [() => void] {
  const audio = useSyncExternalStore(subscribe, getSnapshot);

  const handlePlay = () => {
    if (audioRef.current) {
      playAudio(audioRef.current);
    }
  };

  useEffect(() => {
    if (audio && audio !== audioRef.current && audioRef.current) {
      audioRef.current.pause();
    }
  }, [audio, audioRef]);

  return [handlePlay];
}

export function playAudio(audio: AudioElement): void {
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
  }
  setCurrentAudio(audio);
}
