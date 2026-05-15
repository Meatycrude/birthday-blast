import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import m1 from "@/assets/memory-1.jpg";
import m2 from "@/assets/memory-2.jpg";
import m3 from "@/assets/memory-3.jpg";
import m4 from "@/assets/memory-4.jpg";
import m5 from "@/assets/memory-5.jpg";
import m6 from "@/assets/memory-6.jpg";

export const Route = createFileRoute("/finale")({
  head: () => ({
    meta: [
      { title: "Finale — Happy Birthday" },
      { name: "description", content: "A floating gallery and a final celebration just for you." },
    ],
  }),
  component: Finale,
});

const imgs = [m1, m2, m3, m4, m5, m6, m1, m2];

function Finale() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const colors = ["#f9a8a8", "#f8c8d8", "#fde68a", "#fbcfe8", "#c084fc"];
    const end = Date.now() + 8 * 1000;

    const burst = () => {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(burst);
    };
    burst();

    const interval = setInterval(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        startVelocity: 35,
        origin: { x: Math.random(), y: Math.random() * 0.4 },
        colors,
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, oklch(0.95 0.05 340), oklch(0.92 0.07 50), oklch(0.88 0.1 25))" }}>
      <section className="relative mx-auto max-w-5xl px-6 pt-24 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          The Finale
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mt-4 text-shimmer text-6xl md:text-8xl"
          style={{ fontFamily: "var(--font-script)" }}
        >
          For You, Always
        </motion.h1>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Watch the memories drift by — each one a little piece of how loved you are.
        </p>
      </section>

      {/* Floating gallery */}
      <div className="relative mx-auto mt-12 h-[70vh] max-w-7xl">
        {imgs.map((src, i) => {
          const left = (i * 13 + 5) % 85;
          const top = (i * 23 + 10) % 70;
          const size = 140 + ((i * 37) % 120);
          return (
            <motion.div
              key={i}
              className="absolute overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"
              style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: [0, 30, -20, 10, 0],
                y: [0, -25, 15, -10, 0],
                rotate: [0, 3, -2, 1, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: i * 0.15 },
                scale: { duration: 0.8, delay: i * 0.15 },
                x: { duration: 12 + (i % 5), repeat: Infinity, ease: "easeInOut" },
                y: { duration: 10 + (i % 4), repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 14, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-white/40 glass">
        <div className="mx-auto max-w-4xl px-6 py-6 text-center">
          <p className="text-base md:text-lg text-foreground" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
            You are the brightest part of every room you walk into — happy birthday, my forever favorite.
          </p>
        </div>
      </footer>
    </main>
  );
}
