"use client";

import AudioPlayer from "./components/AudioPlayer";
import { useAudioManager } from "./contexts/AudioManager";

export default function Page() {
  const { audios, playingAudios, resetAudios } = useAudioManager();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <button onClick={resetAudios}>Reset</button>
      <div>Loaded audios: {audios.length}</div>
      <div>Playing audios: {playingAudios.length}</div>
      <AudioPlayer src="sample.mp3" />
      <AudioPlayer src="sample.mp3" />
      <AudioPlayer src="sample.mp3" />
    </div>
  );
}
