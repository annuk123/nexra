"use client";
import Link from "next/link";
import Image from "next/image";

/* ── Mock chat UI per step ── */
function ChatMock({ messages }: { messages: { role: "founder" | "nexra"; text: string; label?: string }[] }) {
  return (
    <div className="rounded-xl bg-[#111111] border border-white/6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/5 bg-white/2">
        <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
          <span className="text-[9px] font-medium select-none">
            <Image
                                          src="/nexra.png"
                                          alt="Nexra"
                                          width={28}
                                          height={28}
                                          className="h-6 w-6 "
                                        /></span>
        </div>
        <span className="text-[11px] text-zinc-500 font-light">Nexra</span>
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-80" />
      </div>
      {/* Messages */}
      <div className="px-3.5 py-3 flex flex-col gap-2.5">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "founder" ? "flex justify-end" : "flex flex-col gap-0.5"}>
            {msg.role === "founder" ? (
              <div className="max-w-[80%] px-3 py-2 rounded-[10px_10px_2px_10px] text-[11px] leading-relaxed bg-[#e8e6e1] text-[#141414]">
                {msg.text}
              </div>
            ) : (
              <div className="max-w-[92%] text-[11px] leading-[1.65] text-zinc-400">
                {msg.label && (
                  <span className="text-[9px] font-medium tracking-widest uppercase text-amber-500/70 mr-1">
                    {msg.label} —{" "}
                  </span>
                )}
                {msg.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step data ── */
const STEPS = [
  {
    number: "01",
    title: "Drop in your idea — raw is fine",
    description: "No deck. No structure. Just type what's in your head. Nexra is built for the messy first version of a thought, not the polished one.",
    messages: [
      { role: "founder" as const, text: "I want to build a tool that helps freelancers manage their clients and invoices automatically." },
      { role: "nexra" as const, text: "Got it. Let's figure out what this actually is before we figure out what to build." },
    ],
  },
  {
    number: "02",
    title: "Nexra finds the assumption holding everything up",
    description: "Every idea rests on one belief that hasn't been tested yet. Nexra finds it — not to kill your idea, but to surface it before you've built around it.",
    messages: [
      { role: "nexra" as const, text: "The assumption doing the most work here: freelancers want automation more than control. Most don't. They want to feel on top of things — automation can threaten that." },
      { role: "founder" as const, text: "Hm. I hadn't thought about it that way." },
    ],
  },
  {
    number: "03",
    title: "You push back. It follows the thread.",
    description: "This isn't a verdict machine. Nexra thinks with you — when you disagree, it goes deeper. The back-and-forth is where clarity actually happens.",
    messages: [
      { role: "founder" as const, text: "But the freelancers I've talked to all said they hate chasing invoices manually." },
      { role: "nexra" as const, label: "Reframe", text: "Hating the task isn't the same as wanting it removed. What did they say when you asked what a good week looks like?" },
    ],
  },
  {
    number: "04",
    title: "You leave knowing what to do next",
    description: "Not a score. Not a report. One clear next move — the smallest action that would tell you whether this idea is worth building.",
    messages: [
      { role: "nexra" as const, label: "Try this", text: "Find 3 freelancers who've tried an invoicing tool and stopped. Ask what made them go back to doing it manually. That's your real product brief." },
      { role: "founder" as const, text: "That's actually really useful. On it." },
    ],
  },
];

export default function HowItWorks() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <div className="h-px w-5 bg-zinc-700" />
            <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-zinc-600">
              How it works
            </span>
          </div>
          <h2 className=" font-semibold text-[#e8e6e1] leading-[1.1] tracking-tight m-0 mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
            How Nexra helps you decide
            <br />
            <em className=" font-semibold italic text-zinc-500">what to build</em>
          </h2>
          <p className="text-[15px] font-light text-zinc-500 max-w-md leading-relaxed m-0">
            Turn rough ideas into clear decisions — before you commit to building the wrong thing.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="group relative bg-[#1a1a1a] rounded-2xl p-6 sm:p-7
                border border-white/6 hover:border-white/1
                transition-colors duration-300 overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-white/1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Step number */}
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg
                bg-white/5 border border-white/8 mb-5">
                <span className="text-[11px] font-medium text-zinc-500 tabular-nums">{step.number}</span>
              </div>

              {/* Chat mock */}
              <div className="mb-5">
                <ChatMock messages={step.messages} />
              </div>

              {/* Title */}
              <h3 className=" font-semibold  text-[#e8e6e1] text-[18px] sm:text-[19px]  mb-2.5 m-0">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] sm:text-[13.5px] font-light text-zinc-500 leading-[1.7] m-0">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 sm:mt-16 flex items-center gap-6">
          <Link
            href="/thinking-engine-v2.0"
            className="inline-flex items-center gap-2 text-[14px] font-medium px-6 py-3 rounded-lg
              bg-[#e8e6e1] text-[#141414] hover:bg-white active:scale-[0.98]
              transition-all duration-150 no-underline group"
          >
            Start thinking
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="transition-transform duration-150 group-hover:translate-x-0.5">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="text-[13px] font-light text-zinc-600">
            5 free sessions · no credit card
          </span>
        </div>

      </div>
    </section>
  );
}