import { useSyncExternalStore } from "react";
import { useAudioManager } from "../contexts/AudioManager";

interface AudioState {
  isPlaying: boolean;
  currentTime: number;
}

export function useAudioState(
  audioElement: React.RefObject<HTMLAudioElement>
): AudioState {
  const { addAudio, removeAudio } = useAudioManager();

  const getIsPlayingSnapshot = () =>
    audioElement.current ? !audioElement.current.paused : false;
  const getCurrentTimeSnapshot = () =>
    audioElement.current ? audioElement.current.currentTime : 0;

  const subscribeToIsPlaying = (callback: () => void) => {
    const handlePlayPause = () => {
      if (audioElement.current) {
        if (audioElement.current.paused) {
          removeAudio(audioElement.current);
        } else {
          addAudio(audioElement.current);
        }
      }
      callback();
    };

    if (audioElement.current) {
      audioElement.current.addEventListener("play", handlePlayPause);
      audioElement.current.addEventListener("pause", handlePlayPause);
    }

    return () => {
      if (audioElement.current) {
        audioElement.current.removeEventListener("play", handlePlayPause);
        audioElement.current.removeEventListener("pause", handlePlayPause);
      }
    };
  };

  const subscribeToCurrentTime = (callback: () => void) => {
    const handleTimeUpdate = () => callback();

    if (audioElement.current) {
      audioElement.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioElement.current) {
        audioElement.current.removeEventListener(
          "timeupdate",
          handleTimeUpdate
        );
      }
    };
  };

  const isPlaying = useSyncExternalStore(
    subscribeToIsPlaying,
    getIsPlayingSnapshot
  );
  const currentTime = useSyncExternalStore(
    subscribeToCurrentTime,
    getCurrentTimeSnapshot
  );

  return { isPlaying, currentTime };
}
