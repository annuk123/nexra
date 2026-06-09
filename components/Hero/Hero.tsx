"use client";
 
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Compass,
  Layers3,
} from "lucide-react";
import Link from "next/link";
 
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
 
const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
 
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: HERO_EASE },
});
 
const pillars = [
  {
    icon: Brain,
    title: "Clearer thinking",
    description:
      "Turn scattered thoughts into a sharper view of what actually matters.",
  },
  {
    icon: Compass,
    title: "Better direction",
    description:
      "See the next move more clearly before you spend more time building.",
  },
  {
    icon: Layers3,
    title: "Founders context",
    description:
      "Keep the important decisions, patterns, and learnings in one place.",
  },
];
 
 
export default function HeroSection() {
  return (

    <section className="relative overflow-hidden bg-[#0C0C0E] text-zinc-100">
 
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage: "radial-gradient(circle, #71717a 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Teal glow */}
        <div className="absolute left-1/2 top-[-8%] h-[26rem] w-[52rem] -translate-x-1/2 rounded-full bg-teal-500/[0.08] blur-3xl" />
        {/* Vignette to fade dot grid at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,transparent_35%,#0C0C0E_100%)]" />
        <div className="absolute inset-0 border-t border-zinc-800/60" />
      </div>
 
      {/* ── Main content ── */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-20 md:px-10 lg:px-12">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-12">
 
          {/* Left */}
<div>
  <motion.div {...fadeUp(0.08)}>
    <Badge
      variant="outline"
      className="mb-6 border-zinc-800 bg-zinc-900/70 px-3 py-1 text-[12px] font-medium tracking-wide text-zinc-300"
    >
      Built for solo founders
    </Badge>
  </motion.div>

  <motion.h1
    {...fadeUp(0.16)}
    className="max-w-3xl text-balance text-5xl font-semibold tracking-[-0.05em] text-zinc-50 sm:text-6xl lg:text-7xl"
  >
    Stop guessing. Start thinking clearly.
  </motion.h1>

  <motion.p
    {...fadeUp(0.26)}
    className="mt-6 max-w-2xl text-pretty text-base leading-8 text-zinc-400 sm:text-lg"
  >
    Nexra helps founders pressure-test ideas, uncover blind spots, and remembers your patterns so it can call you out when you repeat mistakes.
  </motion.p>

  <motion.div {...fadeUp(0.36)} className="mt-8 flex flex-wrap gap-3">
    <Button
      asChild
      className="h-12 rounded-xl bg-teal-500 px-6 text-sm font-semibold text-zinc-950 hover:bg-teal-400"
    >
      <Link href="/thinking-engine-v2.0">
        Start thinking
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
    <Button
      asChild
      variant="outline"
      className="h-12 rounded-xl border-zinc-800 bg-zinc-900/60 px-6 text-sm font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-zinc-50"
    >
      <a href="#how-it-works">See how it works</a>
    </Button>
  </motion.div>

  <motion.div
    {...fadeUp(0.44)}
    className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-500"
  >
    {["See blind spots early", "Get clearer next steps", "Built for real founders"].map(
      (label) => (
        <span
          key={label}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1"
        >
          <CheckCircle2 className="h-4 w-4 text-teal-400" />
          {label}
        </span>
      )
    )}
  </motion.div>
</div>
 
          {/* Right – live product video */}
          <motion.div {...fadeUp(0.22)} className="lg:justify-self-end w-full">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-white/5 bg-neutral-900 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/50" />
                <span className="ml-3 font-mono text-xs text-neutral-600">
                  nexralab.com — live session
                </span>
              </div>
              {/* Video */}
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dfepqicgm&public_id=Video_Project_nte8uk&autoplay=true&muted=true&loop=true&controls=false&playsinline=true"
                style={{ width: "100%", aspectRatio: "640 / 360", display: "block" }}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                frameBorder={0}
              />
            </div>
          </motion.div>
        </div>
      </div>
 
      {/* ── Feature strip ── */}
      
      <div className="relative border-t border-zinc-800/70">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3 md:divide-x md:divide-zinc-800/70">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="px-8 py-8">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                  <Icon className="h-5 w-5 text-teal-400" />
                </div>
                <p className="mb-2 text-base font-medium text-zinc-100">
                  {item.title}
                </p>
                <p className="text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>


    </section>



  );
}
