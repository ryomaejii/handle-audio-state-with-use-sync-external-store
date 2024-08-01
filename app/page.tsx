"use client";

import AudioPlayer from "./components/AudioPlayer";
import { useCurrentAudio } from "./hooks/useCurrentAudio";

export default function Page() {
  const { isPlaying } = useCurrentAudio();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <p>{isPlaying ? "Playing" : "Paused"}</p>
      <AudioPlayer src="sample.mp3" />
      <AudioPlayer src="sample.mp3" />
      <AudioPlayer src="sample.mp3" />
    </div>
  );
}
