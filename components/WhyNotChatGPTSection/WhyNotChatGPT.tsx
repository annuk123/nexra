"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const viewUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, delay, ease: EASE_OUT },
});

type Tool = {
  name: string;
  description: string;
  remembers: boolean;
  challenges: boolean;
  patterns: boolean;
  isNexra: boolean;
};

const tools: Tool[] = [
  {
    name: "ChatGPT / Claude",
    description: "Great for answers, drafts, and broad problem solving.",
    remembers: false,
    challenges: false,
    patterns: false,
    isNexra: false,
  },
  {
    name: "Generic AI assistant",
    description: "Useful when you already know exactly what to ask.",
    remembers: false,
    challenges: false,
    patterns: false,
    isNexra: false,
  },
  {
    name: "Nexra",
    description: "Built around your founder decisions, blind spots, and repeat patterns.",
    remembers: true,
    challenges: true,
    patterns: true,
    isNexra: true,
  },
];

const columns = [
  { key: "remembers", label: "Remembers you" },
  { key: "challenges", label: "Challenges you" },
  { key: "patterns", label: "Spots patterns" },
] as const;

function StatusIcon({ active }: { active: boolean }) {
  if (active) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-400/10 text-teal-300 ring-1 ring-teal-400/25">
        <Check className="h-4 w-4" />
      </span>
    );
  }

  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-zinc-600 ring-1 ring-zinc-800">
      <Minus className="h-4 w-4" />
    </span>
  );
}

export function WhyNotChatGPTSection() {
  return (
    <section className="relative px-6 py-24">


  <div className="mx-auto max-w-5xl">
    <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-teal-500">
      Why not just use ChatGPT?
    </p>

    <h2 className="max-w-3xl text-[clamp(30px,4vw,52px)] font-semibold tracking-[-0.04em] text-white">
      AI gives answers.
      <br />
      Nexra helps you think.
    </h2>

    <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
      Most founders don't need more information.
      They need someone to challenge assumptions, expose blind spots,
      and stop them from repeating the same mistakes over and over.
      That's what Nexra is built for.
    </p>

    <div className="mt-16 grid gap-6 md:grid-cols-2">
      {/* ChatGPT */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="mb-5 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-zinc-500" />
          <span className="font-medium text-zinc-300">
            Generic AI Assistant
          </span>
        </div>

        <ul className="space-y-4 text-sm text-zinc-400">
          <li>✓ Answers questions</li>
          <li>✓ Generates ideas</li>
          <li>✓ Helps with research</li>
          <li>✕ Doesn't know your founder journey</li>
          <li>✕ Doesn't remember recurring mistakes</li>
          <li>✕ Starts from zero every conversation</li>
          <li>✕ Won't consistently challenge your thinking</li>
        </ul>
      </div>

      {/* Nexra */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-500/20 bg-teal-950/20 p-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent" />

        <div className="mb-5 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-teal-400" />
          <span className="font-medium text-teal-400">
            Nexra
          </span>
        </div>

        <ul className="space-y-4 text-sm text-zinc-300">
          <li>✓ Pressure-tests startup ideas</li>
          <li>✓ Challenges weak assumptions</li>
          <li>✓ Identifies blind spots before they hurt you</li>
          <li>✓ Remembers how you think</li>
          <li>✓ Detects repeated founder patterns</li>
          <li>✓ Calls out mistakes you've made before</li>
          <li>✓ Acts like an always-available thinking partner</li>
        </ul>
      </div>
    </div>

    <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
      <p className="text-lg text-zinc-200">
        Founders rarely fail because they couldn't get an answer.
      </p>

      <p className="mt-3 text-zinc-400">
        They fail because they keep making the same decisions,
        ignoring the same signals, and falling into the same traps.
        Nexra remembers those patterns and pushes back when it sees
        them happening again.
      </p>
    </div>
  </div>
</section>
  );
}
