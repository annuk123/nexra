"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: HERO_EASE,
  },
});

const founderThoughts = [
  {
    text: "Am I wasting 6 months on this?",
    className: "left-[8%] top-[22%] hidden md:block",
  },
  {
    text: "Should I pivot now?",
    className: "right-[10%] top-[35%] hidden lg:block",
  },
  {
    text: "I can't tell if this is real progress.",
    className: "left-[10%] bottom-[28%] hidden lg:block",
  },
  {
    text: "What if nobody wants this?",
    className: "right-[12%] bottom-[26%] hidden md:block",
  },
];

const trustItems = [
  "Less noise",
  "Clearer thinking",
  "Built for solo founders",
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen overflow-hidden bg-[#050505] px-6">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.035),transparent_65%)] blur-3xl" />
        <div className="absolute left-1/2 top-[10%] h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.03] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.015] [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Floating Founder Thoughts */}
      {founderThoughts.map((thought, index) => (
        <motion.div
          key={thought.text}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay: 1 + index * 0.2, duration: 1 },
            y: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`absolute z-[1] ${thought.className}`}
        >
          <div className="rounded-full border border-white/[0.04] bg-white/[0.015] px-4 py-2 backdrop-blur-sm">
            <p className="text-[13px] tracking-[-0.02em] text-white/14">
              {thought.text}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative py-16 z-10 mx-auto flex w-full max-w-6xl flex-1 items-center justify-center">
        <div className="flex max-w-[860px] flex-col items-center text-center">

          {/* Early Access */}
          <motion.div
            {...fadeUp(0.15)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-[7px] backdrop-blur-md"
          >
            <div className="relative flex h-2 w-2">
              <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <div className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
            </div>
            <span className="text-[12px] font-medium tracking-[-0.02em] text-white/45">
              Early access — first 10 spots at $9/mo
            </span>
          </motion.div>

          {/* Heading — tightened to 2 lines */}
          <div className="relative">
            <motion.h1
              {...fadeUp(0.3)}
              className="max-w-[720px] text-[clamp(44px,7.5vw,84px)] font-semibold leading-[0.95] tracking-[-0.07em] text-white"
            >
              The thinking partner solo founders never had.
            </motion.h1>
            <div className="absolute inset-0 -z-10 bg-white/5 blur-3xl" />
          </div>

          

          {/* Description — rewritten for empathy */}
          <motion.p
            {...fadeUp(0.52)}
            className="mt-6 max-w-[580px] text-[15px] leading-[1.85] tracking-[-0.02em] text-white/38 md:text-[17px]"
          >
            Not a chatbot. Not a coach. Nexra challenges your assumptions,
            surfaces blind spots, and tells you what you need to hear —
            before the market does.
          </motion.p>

          {/* CTA */}
          <motion.div
            {...fadeUp(0.65)}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              size="lg"
              className="group h-12 rounded-xl bg-white px-7 text-[14px] font-semibold tracking-[-0.03em] text-black shadow-[0_0_24px_rgba(255,255,255,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-100 hover:shadow-[0_0_32px_rgba(255,255,255,0.22)]"
            >
              Start thinking
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="h-12 rounded-xl border border-white/[0.08] bg-white/[0.015] px-7 text-[14px] tracking-[-0.03em] text-white/50 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.03] hover:text-white"
            >
              Watch Nexra think
            </Button>
          </motion.div>

          {/* Emotional line — moved up, right after headline */}
          <motion.p
            {...fadeUp(0.42)}
            className="mt-5 text-[14px] tracking-[-0.02em] text-white/35"
          >
            For the nights when your brain won&apos;t stop thinking.
          </motion.p>

          {/* Trust Strip */}
          <motion.div
            {...fadeUp(0.8)}
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
          >
            {trustItems.map((item, index) => (
              <div key={item} className="flex items-center gap-6">
                {index !== 0 && (
                  <div className="hidden h-3 w-px bg-white/[0.08] md:block" />
                )}
                <span className="text-[12px] tracking-[-0.02em] text-white/28">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
