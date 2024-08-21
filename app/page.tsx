"use client";

import AudioPlayer from "./components/AudioPlayer";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <AudioPlayer src="sample.mp3" />
      <AudioPlayer src="sample.mp3" />
      <AudioPlayer src="sample.mp3" />
    </div>
  );
}
