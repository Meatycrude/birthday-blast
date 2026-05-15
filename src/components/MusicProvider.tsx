import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Music, Pause } from "lucide-react";

const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/10/14/audio_4b75943d8a.mp3?filename=happy-birthday-to-you-piano-118894.mp3";

type Ctx = { playing: boolean; toggle: () => void };
const MusicCtx = createContext<Ctx>({ playing: false, toggle: () => {} });

export function MusicProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(MUSIC_URL);
    a.loop = true;
    a.volume = 0.45;
    ref.current = a;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => { a.pause(); ref.current = null; };
  }, []);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) { a.play().then(() => setPlaying(true)).catch(() => {}); }
    else { a.pause(); setPlaying(false); }
  };

  return <MusicCtx.Provider value={{ playing, toggle }}>{children}</MusicCtx.Provider>;
}

export const useMusic = () => useContext(MusicCtx);

export function MusicToggle() {
  const { playing, toggle } = useMusic();
  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full glass px-4 py-3 text-sm font-medium text-foreground hover:scale-105 transition-transform"
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
      <span>{playing ? "Pause" : "Play Music"}</span>
    </button>
  );
}
