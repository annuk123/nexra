"use client";
import React, { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import Image from "next/image";

/* ── Conversation demo data ── */
const DEMO = [
  {
    role: "founder",
    text: "I've been building for 3 months. Getting some users but not sure if I should keep going or pivot.",
  },
  {
    role: "nexra",
    text: "Before we talk pivot — what does 'some users' actually mean? Are they coming back, or just showing up once?",
  },
  {
    role: "nexra",
    text: "Because the real question isn't whether to pivot. It's whether you've found even one person who'd be genuinely upset if this disappeared.",
    highlight: "one person who'd be genuinely upset if this disappeared",
  },
  {
    role: "nexra",
    text: "If yes — you're not stuck, you're early. If no — that's the thing worth fixing before anything else.",
    label: "Honest take",
  },
  {
    role: "nexra",
    text: "Who's the one user you'd call right now if you had to save this?",
    isQuestion: true,
  },
];

const FALLBACK_COLORS = ["#3d3d3d", "#4a4a4a", "#555555", "#3a3a3a"];

export default function Hero() {
  const addToWaitlist = useMutation(api.waitlist.addToWaitlist);
  const data = useQuery(api.waitlist.getWaitlistSocialProof);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (visibleCount >= DEMO.length) return;
    const delay =
      visibleCount === 0 ? 0
      : DEMO[visibleCount - 1].role === "founder" ? 600
      : 1200;
    const timer = setTimeout(() => setVisibleCount((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [started, visibleCount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await addToWaitlist({ email, source: "homepage" });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const MAX_VISIBLE = 4;
  const avatars = data?.avatars?.slice(0, MAX_VISIBLE) ?? [];
  const remaining = data ? data.count - MAX_VISIBLE : 0;
  const showFallbackDots = !data;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Geist:wght@300;400;500&display=swap');
        .font-display  { font-family: 'Fraunces', serif; }
        .font-sans-nx  { font-family: 'Geist', sans-serif; }
        @keyframes msg-in { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .msg-visible { animation: msg-in 0.35s ease forwards; }
        .msg-hidden  { opacity: 0; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        .dot-blink { animation: blink 2s ease infinite; }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0);opacity:0.35} 30%{transform:translateY(-3px);opacity:1} }
        .typing-dot { animation: bounce 1.1s ease infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.18s; }
        .typing-dot:nth-child(3) { animation-delay: 0.36s; }
        @keyframes fade-in  { from{opacity:0} to{opacity:1} }
        @keyframes slide-up { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .modal-backdrop { animation: fade-in  0.2s ease; }
        .modal-panel    { animation: slide-up 0.25s ease; }
        mark.nx { background:rgba(255,255,255,0.1); color:#e2e0dc; padding:1px 4px; border-radius:3px; font-style:italic; }
        @keyframes shimmer { 0%,100%{opacity:0.25} 50%{opacity:0.5} }
        .skeleton { animation: shimmer 1.4s ease infinite; }
        .grain::before {
          content:''; position:fixed; inset:0; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          background-size:180px; z-index:0; mix-blend-mode:overlay;
        }
      `}</style>

      <div className="font-sans-nx grain min-h-screen bg-neutral-950  border-b border-zinc-600/20 backdrop-blur-md  text-[#e8e6e1] relative overflow-hidden">

        <div className="absolute top-0 right-0 w-125 h-125 rounded-full bg-zinc-700/20 blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-87.5 h-87.5 rounded-full bg-zinc-800/30 blur-[100px] pointer-events-none translate-y-1/4 -translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16
          grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center
          pt-14 pb-20 lg:pb-0 lg:min-h-[calc(100vh-65px)]">

          {/* Left */}
          <div className="order-1 lg:py-20">

            <div className="inline-flex items-center gap-2.5 mb-8">
              <div className="h-px w-5 bg-zinc-600" />
              <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-zinc-500">
                AI Thinking Partner
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-semibold leading-[1.08] tracking-tight text-[#e8e6e1] m-0 mb-3"
              style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
            >
              The co-founder
              <br />
              <em className="font-semibold italic text-zinc-500">you don't have.</em>
            </h1>

            {/* Subheadline */}
            <p className="text-[15px] sm:text-base leading-relaxed mt-6 mb-10 font-light text-zinc-400 max-w-sm">
              Nexra thinks with you — not at you.{" "}
              <span className="text-[#e8e6e1] font-normal">Ask anything. Get the truth.</span>{" "}
              Always honest, always on — for every decision you're facing alone.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/thinking-engine-v2.0"
                className="inline-flex items-center gap-2 text-[14px] font-medium px-6 py-3 rounded-lg
                  bg-[#e8e6e1] text-[#141414] hover:bg-white active:scale-[0.98]
                  transition-all duration-150 no-underline group"
              >
                Start thinking
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="transition-transform duration-150 group-hover:translate-x-0.5">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <button
                onClick={() => setWaitlistOpen(true)}
                className="text-[13px] font-light text-zinc-500 hover:text-[#e8e6e1]
                  underline underline-offset-4 decoration-transparent hover:decoration-zinc-600
                  transition-all duration-150 bg-transparent border-0 cursor-pointer py-3 px-0"
              >
                Join waitlist →
              </button>
            </div>

            {/* Social proof */}
            <div className="mt-10 pt-6 flex items-center gap-4 border-t border-white/6">
              <div className="flex shrink-0">
                {showFallbackDots
                  ? FALLBACK_COLORS.map((bg, i) => (
                      <div key={i} className="skeleton w-6 h-6 rounded-full border-2 border-[#141414]"
                        style={{ marginLeft: i === 0 ? 0 : "-6px", background: bg }} />
                    ))
                  : <>
                      {avatars.map((user, i) => (
                        <img key={i} src={user.avatar} alt=""
                          className="w-6 h-6 rounded-full border-2 border-[#141414] object-cover"
                          style={{ marginLeft: i === 0 ? 0 : "-6px" }} />
                      ))}
                      {remaining > 0 && (
                        <div className="w-6 h-6 rounded-full border-2 border-[#141414] bg-zinc-700
                          flex items-center justify-center text-[10px] text-zinc-400"
                          style={{ marginLeft: "-6px" }}>
                          +{remaining}
                        </div>
                      )}
                    </>
                }
              </div>
              <p className="text-[12px] leading-snug text-zinc-500 font-light m-0">
                Used by indie hackers and solo founders
                <br className="hidden sm:block" />
                {" "}building their next thing
              </p>
            </div>
          </div>

          {/* Right — Chat panel */}
        <div className="order-2 bg-neutral-900/40 rounded-2xl flex flex-col overflow-hidden
            max-h-105 sm:max-h-115 lg:max-h-130 w-full
            border border-white/20 backdrop-blur-2xl
            shadow-[0_2px_4px_rgba(0,0,0,0.3),0_12px_40px_rgba(0,0,0,0.4),0_40px_80px_rgba(0,0,0,0.3)]">

            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 shrink-0
              border-b border-white/6 bg-white/2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center shrink-0">
                  <Image src="/nexra.png" alt="Nexra" width={28} height={28} className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#e8e6e1]">Nexra</div>
                  <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <span className="dot-blink inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Thinking Partner
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 sm:py-6
              flex flex-col gap-3 sm:gap-4
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

              {DEMO.map((msg, i) => (
                <div key={i} className={i < visibleCount ? "msg-visible" : "msg-hidden"}>
                  {msg.role === "founder" ? (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] sm:max-w-[75%] px-3.5 py-2.5
                        rounded-[14px_14px_2px_14px] text-[13px] leading-relaxed
                        bg-[#e8e6e1] text-[#141414]">
                        {msg.text}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {i === 1 && (
                        <div className="text-[10px] font-medium tracking-[0.09em] uppercase text-zinc-600 pl-0.5">
                          Nexra
                        </div>
                      )}
                      <div className={`max-w-[92%] sm:max-w-[90%] text-[13px] leading-[1.7] text-zinc-300
                        ${msg.isQuestion ? "font-medium text-[14px] sm:text-[15px] leading-[1.6] italic text-zinc-200" : ""}`}>
                        {msg.label && (
                          <span className="text-[10px] font-medium tracking-widest uppercase text-amber-500/80 mr-1">
                            {msg.label} —{" "}
                          </span>
                        )}
                        {msg.highlight ? (
                          <>
                            {msg.text.split(msg.highlight)[0]}
                            <mark className="nx">{msg.highlight}</mark>
                            {msg.text.split(msg.highlight)[1]}
                          </>
                        ) : msg.text}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className={`flex items-center gap-1 py-2 transition-opacity duration-300
                ${visibleCount > 0 && visibleCount < DEMO.length ? "opacity-100" : "opacity-0"}`}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-zinc-600" />
                ))}
              </div>
            </div>

            <div className="px-3 sm:px-4 py-2.5 sm:py-3 shrink-0 border-t border-white/6 bg-white/2">
              <div className="flex items-center gap-2.5 bg-white/4 px-3.5 py-2.5 rounded-lg border border-white/8">
                <span className="flex-1 text-[12px] sm:text-[13px] text-zinc-600">
                  What's on your mind right now…
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#e8e6e1] flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="#141414" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      {waitlistOpen && (
        <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-md"
          onClick={() => setWaitlistOpen(false)}>
          <div className="modal-panel relative bg-[#1c1c1c] rounded-2xl p-7 sm:p-10 w-full max-w-md
            border border-white/8 shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}>

            <button onClick={() => setWaitlistOpen(false)}
              className="absolute top-4 right-4 bg-transparent border-0 cursor-pointer
                text-base text-zinc-600 hover:text-[#e8e6e1] transition-colors duration-150 p-1">
              ✕
            </button>

            {status === "success" ? (
              <div className="text-center py-4">
                <h4 className="text-[22px] font-semibold text-[#e8e6e1] m-0 mb-2">You're on the list.</h4>
                <p className="text-[14px] text-zinc-500 font-light m-0">
                  We'll reach out when there's something worth your time.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] sm:text-2xl font-semibold text-[#e8e6e1] m-0 mb-1.5">
                  Join the waitlist
                </h3>
                <p className="text-[14px] leading-relaxed text-zinc-500 font-light mt-0 mb-6 sm:mb-7">
                  Early access for founders. No noise, no newsletters.
                </p>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <input type="email" required placeholder="you@startup.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg px-4 py-3 text-[14px]
                      bg-white/5 border border-white/10 text-[#e8e6e1]
                      placeholder:text-zinc-600 outline-none focus:border-white/30
                      transition-colors duration-150 font-light" />
                  <button type="submit"
                    className="w-full py-3.5 rounded-lg text-[14px] font-medium
                      bg-[#e8e6e1] text-[#141414] hover:bg-white active:scale-[0.99]
                      transition-all duration-150 border-0 cursor-pointer">
                    {status === "loading" ? "Joining…" : "Join →"}
                  </button>
                </form>
                {status === "error" && (
                  <p className="text-[13px] text-red-400 mt-2 mb-0">Something went wrong. Try again.</p>
                )}
                <p className="text-[11px] text-center text-zinc-600 font-light mt-4 mb-0">
                  No spam. Just product updates when they matter.{" "}
                  <Link href="/privacy" className="text-zinc-600 underline hover:text-zinc-400 transition-colors">
                    Privacy Policy
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}