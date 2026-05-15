import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";
import m1 from "@/assets/memory-1.jpg";
import m2 from "@/assets/memory-2.jpg";
import m3 from "@/assets/memory-3.jpg";
import m4 from "@/assets/memory-4.jpg";
import m5 from "@/assets/memory-5.jpg";
import m6 from "@/assets/memory-6.jpg";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "Memory Lane — Happy Birthday" },
      { name: "description", content: "A timeline of memories and a heartfelt message just for you." },
    ],
  }),
  component: Memories,
});

const memories = [
  { src: m1, title: "Sweet beginnings", caption: "The first slice of cake, the first wish, the first laugh." },
  { src: m2, title: "Soft afternoons", caption: "Petals, peonies, and quiet moments that smelled like spring." },
  { src: m3, title: "Up, up, away", caption: "All the dreams we let drift into the sky together." },
  { src: m4, title: "Cheers, my love", caption: "To every late night where we lost track of time and didn't care." },
  { src: m5, title: "Sparkle season", caption: "You — lit up like the sky on the brightest night." },
  { src: m6, title: "Polaroids of us", caption: "Tiny rectangles holding memories far too big for them." },
];

function Memories() {
  return (
    <main className="min-h-screen pb-32" style={{ background: "var(--gradient-hero)" }}>
      <section className="mx-auto max-w-5xl px-6 pt-24 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Chapter Two
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-5xl md:text-7xl text-shimmer"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Memory Lane
        </motion.h1>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">A walk through the moments that built our story.</p>
      </section>

      {/* Vertical timeline */}
      <section className="relative mx-auto mt-20 max-w-5xl px-6">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-rose to-transparent md:block" />
        <div className="space-y-16">
          {memories.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`relative flex flex-col gap-6 md:flex-row md:items-center ${i % 2 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2">
                <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]">
                  <img src={m.src} alt={m.title} width={1024} height={1024} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </div>
              </div>
              <div className="absolute left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-rose ring-4 ring-background md:block" />
              <div className="md:w-1/2 md:px-10">
                <h3 className="text-2xl font-semibold text-foreground md:text-3xl">{m.title}</h3>
                <p className="mt-3 text-muted-foreground">{m.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Special message glass card */}
      <section className="mx-auto mt-32 max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="glass relative rounded-[2rem] p-10 text-center md:p-16"
        >
          <Heart className="mx-auto mb-6 h-10 w-10 text-rose" fill="currentColor" />
          <h2 className="text-3xl md:text-5xl text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            A Special Message
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
            "On your day, I want you to remember that you are loved beyond measure.
            You make ordinary days feel like celebrations and quiet moments feel like home.
            Here's to another year of you — soft, brilliant, kind, and entirely irreplaceable."
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.4em] text-muted-foreground">— with all my love</p>
        </motion.div>

        <div className="mt-16 text-center">
          <Link
            to="/finale"
            className="group inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-105"
            style={{ background: "var(--gradient-gold)" }}
          >
            Next Surprise
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
