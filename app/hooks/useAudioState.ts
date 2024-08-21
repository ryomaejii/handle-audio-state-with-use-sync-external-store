import { useCallback, useRef, useSyncExternalStore } from "react";
import { useAudioManager } from "../contexts/AudioManager";

interface AudioState {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  currentTime: number;
}

export function useAudioState({
  pauseAllAudiosBeforePlay = true,
}: {
  pauseAllAudiosBeforePlay?: boolean;
}): AudioState {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { addAudio, removeAudio, playingAudios } = useAudioManager();

  const pauseAllOtherAudios = useCallback(
    (audio: HTMLAudioElement) => {
      playingAudios.forEach((a) => {
        if (a !== audio) {
          a.pause();
        }
      });
    },
    [playingAudios]
  );

  const getIsPlayingSnapshot = () =>
    audioRef.current ? !audioRef.current.paused : false;
  const getCurrentTimeSnapshot = () =>
    audioRef.current ? audioRef.current.currentTime : 0;

  const subscribeToIsPlaying = (callback: () => void) => {
    const handlePlayPause = () => {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          removeAudio(audioRef.current);
        } else {
          pauseAllAudiosBeforePlay && pauseAllOtherAudios(audioRef.current);
          addAudio(audioRef.current);
        }
      }
      callback();
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("play", handlePlayPause);
      audioRef.current.addEventListener("pause", handlePlayPause);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", handlePlayPause);
        audioRef.current.removeEventListener("pause", handlePlayPause);
      }
    };
  };

  const subscribeToCurrentTime = (callback: () => void) => {
    const handleTimeUpdate = () => callback();

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
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

  return { audioRef, isPlaying, currentTime };
}
