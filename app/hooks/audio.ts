import { useEffect } from "react";
import { useAudioContext } from "../contexts/AudioContext";

export function useCurrentAudio() {
  const { currentAudio, resetAllAudio } = useAudioContext();
  const isPlaying = Boolean(currentAudio);

  return {
    audio: currentAudio,
    isPlaying,
    resetAllAudio,
  };
}

export function useRegisterAudio(audioRef: React.RefObject<HTMLAudioElement>) {
  const { registerAudioElement, unregisterAudioElement, setCurrentAudio } =
    useAudioContext();

  function playAudio(audioRef: React.RefObject<HTMLAudioElement>): void {
    if (audioRef.current) {
      setCurrentAudio(audioRef.current);
      audioRef.current.play();
    }
  }

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
  }, [audioRef, registerAudioElement, unregisterAudioElement]);

  return {
    playAudio,
  };
}
