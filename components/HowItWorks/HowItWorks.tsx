"use client";
import { useState } from "react";
import Link from "next/link";

/* ── Types ── */
type InsightTag = { label: string; type: "warning" | "memory" | "honest" };
type Message =
  | { role: "founder"; text: string }
  | { role: "nexra"; label?: string; text: string; tag?: InsightTag };

interface Step {
  number: string;
  pill: string;
  title: string;
  description: string;
  messages: Message[];
}

/* ── Data ── */
const STEPS: Step[] = [
  {
    number: "01",
    pill: "Drop your idea",
    title: "Start with the messy version",
    description:
      "No deck. No structure. An idea, a decision, a doubt at 11pm. Nexra is built for the unpolished thought — not the one you've cleaned up for other people.",
    messages: [
      {
        role: "founder",
        text: "I want to build a tool that helps freelancers manage their clients and invoices automatically.",
      },
      {
        role: "nexra",
        text: "Got it. Let's figure out what this actually is before we figure out what to build.",
      },
      {
        role: "nexra",
        text: "Who's more frustrated right now — the freelancer chasing payments, or the one drowning in admin?",
      },
    ],
  },
  {
    number: "02",
    pill: "Surface blind spots",
    title: "Finds the assumption doing the most damage",
    description:
      "Every plan rests on one belief that hasn't been tested. Nexra finds it before you've built your entire roadmap around it.",
    messages: [
      {
        role: "founder",
        text: "Freelancers are tired of doing things manually. Automation is the obvious answer.",
      },
      {
        role: "nexra",
        label: "Blind spot",
        text: "The assumption doing the most work here: freelancers want automation more than control. Most don't. They want to feel on top of things — automation can threaten that.",
        tag: { label: "Untested assumption", type: "warning" },
      },
    ],
  },
  {
    number: "03",
    pill: "Push back honestly",
    title: "Won't just agree with you",
    description:
      "When you push back, it goes deeper — not to win, but because the truth is more useful than comfort. It'll also tell you what's actually working.",
    messages: [
      {
        role: "founder",
        text: "Everyone I've talked to says they'd pay for this.",
      },
      {
        role: "nexra",
        label: "Honest take",
        text: "People saying they'd pay and people actually paying are completely different signals. How many of them asked you how to sign up?",
        tag: { label: "Validation gap", type: "honest" },
      },
    ],
  },
  {
    number: "04",
    pill: "Remembers everything",
    title: "You come back. It holds you to it.",
    description:
      "Nexra isn't a one-time check. It knows what you're building, where you got stuck, and what you said you'd do. Session after session, it tracks the patterns — not just the facts.",
    messages: [
      {
        role: "founder",
        text: "Back again. Did the thing you suggested — talked to 5 users.",
      },
      {
        role: "nexra",
        label: "Memory",
        text: "Good. Last time you said distribution was the blocker — not the product. Did any of these 5 find you, or did you have to go find them?",
        tag: { label: "Pattern tracked across sessions", type: "memory" },
      },
    ],
  },
];

/* ── Tag config ── */
const TAG_STYLES: Record<InsightTag["type"], string> = {
  warning: "bg-amber-500/10 text-amber-400",
  honest: "bg-red-500/10 text-red-400",
  memory: "bg-teal-500/10 text-teal-400",
};
const TAG_ICONS: Record<InsightTag["type"], string> = {
  warning: "⚠",
  honest: "◎",
  memory: "◈",
};

/* ── ChatMock ── */
function ChatMock({ messages }: { messages: Message[] }) {
  return (
    <div className="rounded-xl bg-[#111111] border border-white/[0.06] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.05]">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-80" />
        <span className="text-[11px] text-zinc-500">Nexra · active</span>
      </div>
      <div className="px-4 py-4 flex flex-col gap-3">
        {messages.map((msg, i) =>
          msg.role === "founder" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] px-3 py-2 rounded-[10px_10px_2px_10px] text-[12px] leading-relaxed bg-zinc-100 text-zinc-900">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex flex-col gap-1.5 max-w-[92%]">
              {msg.label && (
                <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-teal-400/70">
                  {msg.label}
                </span>
              )}
              <p className="text-[12.5px] leading-[1.65] text-zinc-400 m-0">
                {msg.text}
              </p>
              {msg.tag && (
                <span
                  className={`inline-flex items-center gap-1.5 mt-0.5 px-2.5 py-1 rounded-full text-[11px] font-medium w-fit ${TAG_STYLES[msg.tag.type]}`}
                >
                  <span aria-hidden="true">{TAG_ICONS[msg.tag.type]}</span>
                  {msg.tag.label}
                </span>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2.5 mb-5">
            
            <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-teal-400/80">
              How it works
            </span>
          </div>
          <h2
            className="font-semibold text-[#e8e6e1] leading-[1.1] tracking-tight mb-3"
            style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}
          >
            How <span className="text-teal-400">Nexra</span> thinks with you
          </h2>
          <p className="text-[15px] font-light text-zinc-500 max-w-md leading-relaxed">
            Not a tool you open once. A thinking partner for every decision —
            before you build, while you build, and when you&apos;re stuck.
          </p>
        </div>

        {/* Nav pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {STEPS.map((step, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] border transition-all duration-150 cursor-pointer
                ${active === i
                  ? "bg-zinc-800 border-zinc-600 text-zinc-100"
                  : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                }`}
            >
              {step.pill}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-px bg-zinc-800 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-teal-400 rounded-full transition-all duration-300"
            style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Timeline */}
        <div className="flex flex-col">
          {STEPS.map((step, i) => {
            const isActive = active === i;
            return (
              <div
                key={i}
                onClick={() => setActive(i)}
                className="relative flex cursor-pointer"
              >
                {/* ── Left gutter: dot + line ── */}
                <div className="relative flex-shrink-0 w-[52px] flex flex-col items-center">
                  {/* Vertical line — full height of row */}
                  {i < STEPS.length - 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-zinc-800" />
                  )}
                  {/* Dot — positioned at top of row with some padding */}
                  <div className="relative z-10 mt-5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-200
                        ${isActive
                          ? "bg-teal-400 border-teal-400 shadow-[0_0_0_4px_rgba(45,212,191,0.12)]"
                          : "bg-[#0a0a0a] border-zinc-700"
                        }`}
                    />
                  </div>
                </div>

                {/* ── Right: meta + content ── */}
                <div className="flex-1 pb-8 pl-4 pt-3">
                  {/* Step number + label always visible */}
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[11px] font-medium tabular-nums transition-colors duration-200
                        ${isActive ? "text-zinc-400" : "text-zinc-700"}`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`text-[11px] transition-colors duration-200
                        ${isActive ? "text-zinc-400" : "text-zinc-700"}`}
                    >
                      {step.pill}
                    </span>
                  </div>

                  {/* Active: full content */}
                  {isActive ? (
                    <div
                      key={`content-${i}`}
                      className="flex flex-col gap-4"
                      style={{ animation: "fadeUp 0.2s ease forwards" }}
                    >
                      <div>
                        <h3 className="text-[17px] sm:text-[19px] font-semibold text-[#e8e6e1] mb-2 leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-[13px] font-light text-zinc-500 leading-[1.7] max-w-xl">
                          {step.description}
                        </p>
                      </div>
                      <div className="max-w-xl">
                        <ChatMock messages={step.messages} />
                      </div>
                    </div>
                  ) : (
                    /* Inactive: collapsed title only */
                    <p
                      className="text-[13px] text-zinc-600 leading-snug"
                    >
                      {step.title}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-14 flex items-center gap-6">
          <Link
            href="/thinking-engine-v2.0"
            className="inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-lg
              bg-[#e8e6e1] text-[#141414] hover:bg-white active:scale-[0.98]
              transition-all duration-150 no-underline group"
          >
            Start thinking
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            >
              <path
                d="M3 7h8M8 4l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <span className="text-[12px] font-light text-zinc-600">
            Free to start · no credit card
          </span>
        </div>

      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}