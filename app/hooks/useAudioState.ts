import { RefObject, useSyncExternalStore } from "react";

export function useAudioState(audioElement: RefObject<HTMLAudioElement>) {
  const getSnapshot = () =>
    audioElement.current ? !audioElement.current.paused : false;
  const subscribe = (callback: () => void) => {
    const handlePlayPause = () => callback();
    audioElement.current.addEventListener("play", handlePlayPause);
    audioElement.current.addEventListener("pause", handlePlayPause);
    return () => {
      audioElement.current.removeEventListener("play", handlePlayPause);
      audioElement.current.removeEventListener("pause", handlePlayPause);
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}
