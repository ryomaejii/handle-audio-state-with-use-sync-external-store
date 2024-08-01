"use client";

import AudioPlayer from "./components/AudioPlayer";
import { resetAllAudio, useCurrentAudio } from "./hooks/audio";

export default function Page() {
  const { isPlaying } = useCurrentAudio();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <p>{isPlaying ? "Playing" : "Paused"}</p>
      <button onClick={resetAllAudio}>Reset</button>
      <AudioPlayer src="sample.mp3" />
      <AudioPlayer src="sample.mp3" />
      <AudioPlayer src="sample.mp3" />
    </div>
  );
}
