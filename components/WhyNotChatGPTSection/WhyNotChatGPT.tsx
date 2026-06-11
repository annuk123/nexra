"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const viewUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: EASE_OUT },
});

// Restored 3 rows — two "negative" rows makes the Nexra row land harder
const tools = [
  {
    name: "ChatGPT / Claude",
    description:
      "Great for answers, drafts, and broad problem solving. Resets every session.",
    remembers: false,
    challenges: false,
    patterns: false,
    isNexra: false,
  },
  {
    name: "Generic AI assistant",
    description:
      "Useful when you already know exactly what to ask. Won't push back.",
    remembers: false,
    challenges: false,
    patterns: false,
    isNexra: false,
  },
  {
    name: "Nexra",
    description:
      "Built around your founder decisions, blind spots, and repeat patterns.",
    remembers: true,
    challenges: true,
    patterns: true,
    isNexra: true,
  },
];

const COLUMNS = ["Remembers you", "Challenges you", "Spots patterns"] as const;

function StatusIcon({ active }: { active: boolean }) {
  if (active) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-400/10 ring-1 ring-teal-400/30">
        <Check className="h-3.5 w-3.5 text-teal-400" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 ring-1 ring-zinc-800">
      <Minus className="h-3 w-3 text-zinc-600" />
    </span>
  );
}

export function WhyNotChatGPTSection() {
  return (
    <section className="border-t border-zinc-800/50 py-24">
      <div className="mx-auto max-w-3xl">

        {/* Eyebrow */}
        <motion.p
          {...viewUp(0)}
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-400/80"
        >
          Why not just use ChatGPT?
        </motion.p>

        {/* Headline — "Nexra" gets the accent, everything else stays white */}
        <motion.h2
          {...viewUp(0.08)}
          className="mb-4 text-[clamp(26px,3.5vw,44px)] font-semibold leading-[1.15] tracking-[-0.03em] text-white"
        >
          AI gives answers.<br />
          <span className="text-teal-400">Nexra</span> helps you think.
        </motion.h2>

        {/* Description — removed the abrupt "Nexra does." at the end */}
        <motion.p
          {...viewUp(0.16)}
          className="mb-12 max-w-md text-[15px] leading-relaxed text-zinc-400"
        >
          ChatGPT and Claude are useful — but they reset every session.
          They don't know your history, your blind spots, or the mistakes
          you've already made twice.
        </motion.p>

        {/* Comparison table */}
        <motion.div
          {...viewUp(0.22)}
          className="overflow-hidden rounded-xl border border-zinc-800"
        >
          {/* Header — hidden on mobile, shown sm+ */}
          <div className="hidden grid-cols-[1fr_repeat(3,96px)] items-center border-b border-zinc-800 bg-zinc-900/60 px-6 py-3 sm:grid">
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-600">
              Tool
            </span>
            {COLUMNS.map((col) => (
              <span
                key={col}
                className="text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-600"
              >
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={[
                // base
                "border-b border-zinc-800/50 px-6 py-5 last:border-0",
                // mobile: single row with name left, icons right
                "flex items-center justify-between gap-4",
                // desktop: four-column grid
                "sm:grid sm:grid-cols-[1fr_repeat(3,96px)] sm:items-center sm:gap-0",
                // left accent border — transparent on non-Nexra rows keeps
                // horizontal content aligned across all rows
                "border-l-2",
                tool.isNexra
                  ? "border-l-teal-500/50 bg-teal-950/25"
                  : "border-l-transparent",
              ].join(" ")}
            >
              {/* Tool name + description */}
              <div className="min-w-0">
                <p
                  className={`text-[13px] font-medium leading-snug ${
                    tool.isNexra ? "text-teal-400" : "text-zinc-300"
                  }`}
                >
                  {tool.name}
                </p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-zinc-500">
                  {tool.description}
                </p>
              </div>

              {/* Mobile: three icons grouped to the right of the row */}
              <div className="flex shrink-0 items-center gap-1.5 sm:hidden">
                <StatusIcon active={tool.remembers} />
                <StatusIcon active={tool.challenges} />
                <StatusIcon active={tool.patterns} />
              </div>

              {/* Desktop: one icon per column */}
              <div className="hidden justify-center sm:flex">
                <StatusIcon active={tool.remembers} />
              </div>
              <div className="hidden justify-center sm:flex">
                <StatusIcon active={tool.challenges} />
              </div>
              <div className="hidden justify-center sm:flex">
                <StatusIcon active={tool.patterns} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Callout block */}
        <motion.div
          {...viewUp(0.3)}
          className="mt-5 rounded-xl border border-zinc-800/70 bg-zinc-900/20 px-6 py-5"
        >
          <p className="text-[15px] font-semibold leading-snug text-zinc-200">
            Founders rarely fail because they couldn't get an answer.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
            They fail because they keep making the same decisions, ignoring the
            same signals, and walking into the same traps — without anyone
            calling it out. Nexra tracks those patterns and pushes back before
            history repeats itself.
          </p>
        </motion.div>

      </div>
    </section>
  );
}