import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import hero from "@/assets/hero-bday.jpg";
import m1 from "@/assets/memory-1.jpg";
import m2 from "@/assets/memory-2.jpg";
import m3 from "@/assets/memory-3.jpg";
import m4 from "@/assets/memory-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Symphy — A Magical Celebration" },
      {
        name: "description",
        content: "A heartfelt birthday celebration site filled with memories, music, and magic.",
      },
    ],
  }),
  component: Index,
});

const galleryImgs = [m1, m2, m3, m4];

function Index() {
  return (
    <main className="min-h-screen overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Floating sparkles bg */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: `${(i * 37) % 100}%`, y: `${(i * 53) % 100}%`, opacity: 0 }}
            animate={{ y: ["0%", "-20%", "0%"], opacity: [0, 1, 0] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
          >
            <Sparkles className="h-4 w-4 text-gold" />
          </motion.div>
        ))}
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.4em] text-muted-foreground"
        >
          Today I celebrate you,!
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="animate-float-slow text-shimmer text-6xl font-bold leading-tight md:text-8xl lg:text-9xl"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Happy Birthday Symphy!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl"
        >
          A little corner of the internet, made just for you — full of memories, music, and love
          from Feli.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-12"
        >
          <Link
            to="/memories"
            className="group inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-105"
            style={{ background: "var(--gradient-rose)" }}
          >
            Enter Memories
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-24 w-full"
        >
          <div className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            A glimpse of the magic
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImgs.map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
                className="overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"
              >
                <img
                  src={src}
                  alt={`Memory ${i + 1}`}
                  width={1024}
                  height={1024}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="aspect-square w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <img src={hero} alt="" className="hidden" />
          Music is playing 
        </div>
      </section>
    </main>
  );
}
