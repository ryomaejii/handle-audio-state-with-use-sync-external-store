"use client";

import AudioPlayer from "./components/AudioPlayer";
import { useAudioManager } from "./contexts/AudioManager";

export default function Page() {
  const { getPlayingAudios } = useAudioManager();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div>Playing audios: {getPlayingAudios().length}</div>
      <AudioPlayer src="sample.mp3" />
      <AudioPlayer src="sample.mp3" />
      <AudioPlayer src="sample.mp3" />
    </div>
  );
}
