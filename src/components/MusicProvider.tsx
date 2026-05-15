import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Music, Pause } from "lucide-react";

const MUSIC_URL =
  "https://cdn.pixabay.com/download/audio/2022/10/14/audio_4b75943d8a.mp3?filename=happy-birthday-to-you-piano-118894.mp3";

type Ctx = { playing: boolean; toggle: () => void };
const MusicCtx = createContext<Ctx>({ playing: false, toggle: () => {} });

export function MusicProvider({ children }: { children: ReactNode }) {
  // 1. Create a single, permanent audio element reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // 2. Initialize audio settings safely on mount
  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    // 3. Keep React state synced if audio finishes or breaks externally
    const handlePause = () => setPlaying(false);
    const handlePlay = () => setPlaying(true);

    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.pause();
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((err) => console.log("Playback blocked by browser:", err));
    } else {
      audio.pause();
    }
  };

  return <MusicCtx.Provider value={{ playing, toggle }}>{children}</MusicCtx.Provider>;
}

export const useMusic = () => useContext(MusicCtx);

export function MusicToggle() {
  const { playing, toggle } = useMusic();
  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border bg-white/80 backdrop-blur px-4 py-3 text-sm font-medium shadow-md hover:scale-105 transition-transform"
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
      <span>{playing ? "Pause" : "Play Music"}</span>
    </button>
  );
}
