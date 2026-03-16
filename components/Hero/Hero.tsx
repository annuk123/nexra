"use client";
import React, { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useQuery } from "convex/react";

/* ── Conversation demo data ── */
const DEMO = [
  {
    role: "founder",
    text: "I'm building an AI tool that helps indie hackers validate startup ideas before building.",
  },
  {
    role: "nexra",
    text: `The word "validate" is doing a lot of heavy lifting here. Founders want validation, but what they usually get is confirmation bias dressed up as research.`,
    highlight: `what they usually get is confirmation bias dressed up as research`,
  },
  {
    role: "nexra",
    text: "If your tool just tells people their idea is viable, they'll love it — and learn nothing. The hard question is whether it can tell them something they don't want to hear.",
  },
  {
    role: "nexra",
    text: "Talk to 5 indie hackers who killed a project in the last year. Ask what would have changed their decision earlier. That's your product.",
    label: "Try this",
  },
  {
    role: "nexra",
    text: "What's the specific moment in a founder's process where your tool would actually change their decision — not just inform it?",
    isQuestion: true,
  },
];

export default function Hero() {
  const addToWaitlist = useMutation(api.waitlist.addToWaitlist);
    const data = useQuery(api.waitlist.getWaitlistSocialProof);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
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
      visibleCount === 0
        ? 0
        : DEMO[visibleCount - 1].role === "founder"
        ? 600
        : 1200;
    const timer = setTimeout(() => setVisibleCount((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [started, visibleCount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addToWaitlist({ email, source: "homepage" });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };
  
  if (!data) return null;

const MAX_VISIBLE = 4;
const visible = data.avatars.slice(0, MAX_VISIBLE);
const remaining = data.count - MAX_VISIBLE;


  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .font-serif-display { font-family: 'Instrument Serif', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .msg-enter { opacity: 0; transform: translateY(8px); transition: opacity 0.4s ease, transform 0.4s ease; }
        .msg-enter.visible { opacity: 1; transform: translateY(0); }
        @keyframes blink-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .status-pulse { animation: blink-pulse 2s infinite; }
        @keyframes bounce-dot { 0%,60%,100%{transform:translateY(0);opacity:0.4} 30%{transform:translateY(-4px);opacity:1} }
        .typing-dot { animation: bounce-dot 1.2s infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes fade-in { from{opacity:0} to{opacity:1} }
        .modal-fade { animation: fade-in 0.2s ease; }
        @keyframes slide-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .modal-slide { animation: slide-up 0.25s ease; }
        mark.nexra-mark { background: rgba(0,0,0,0.07); color: inherit; padding: 1px 3px; border-radius: 3px; font-style: italic; }
      `}</style>

      {/* Page root */}
      <div
        className="font-body min-h-screen relative overflow-hidden"
        style={{ background: "#f5f2ed", color: "#0a0a0a" }}
      >
        {/* Subtle warm gradient texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(180,160,120,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(120,100,80,0.04) 0%, transparent 50%)",
          }}
        />

        {/* ── Nav ── */}
        

        {/* ── Hero Grid ── */}
        <div className="relative max-w-300 mx-auto px-12 grid grid-cols-2 gap-20 items-center min-h-screen py-20">

          {/* Left column */}
          <div className="py-16">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-6 h-px" style={{ background: "#6b6560" }} />
              <span
                className="text-[11px] font-medium tracking-[0.12em] uppercase"
                style={{ color: "#6b6560" }}
              >
                AI Thinking Partner
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-serif-display text-[clamp(42px,5vw,64px)] leading-[1.1] tracking-[-0.02em] m-0 mb-2"
              style={{ color: "#0a0a0a" }}
            >
              Clarity before
              <br />
              <em className="not-italic" style={{ color: "#6b6560", fontStyle: "italic" }}>
                commitment.
              </em>
            </h1>

            {/* Subheadline */}
            <p
              className="text-[16px] leading-[1.7] max-w-100 mt-6 mb-12 font-light"
              style={{ color: "#6b6560" }}
            >
              Nexra thinks with you — not at you.
              <br />
              <strong className="font-medium" style={{ color: "#0a0a0a" }}>
                The co-founder you don't have yet,
              </strong>{" "}
              available at 11pm when the hard decisions surface.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/thinking-engine-v2.0"
                className="inline-flex items-center gap-2 text-[14px] font-medium px-7 py-3 rounded-lg no-underline transition-all duration-200 hover:-translate-y-px group border-0"
                style={{ background: "#0a0a0a", color: "#f5f2ed" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Start thinking
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
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

              <button
                onClick={() => setWaitlistOpen(true)}
                className="text-[13px] bg-transparent border-0 cursor-pointer py-3 px-0 tracking-[0.01em] underline underline-offset-[3px] transition-all duration-200"
                style={{
                  color: "#6b6560",
                  textDecorationColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#0a0a0a";
                  (e.currentTarget as HTMLElement).style.textDecorationColor = "#0a0a0a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#6b6560";
                  (e.currentTarget as HTMLElement).style.textDecorationColor = "transparent";
                }}
              >
                Join waitlist →
              </button>
            </div>

            {/* Social proof */}
            <div
              className="mt-6 pt-4 flex items-center gap-5"
              style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div className="flex">
  {visible.map((user, i) => (
    <img
      key={i}
      src={user.avatar}
      className="w-6 h-6 rounded-full border-2 object-cover"
      style={{
        borderColor: "#f5f2ed",
        marginLeft: i === 0 ? 0 : "-6px",
      }}
    />
  ))}

  {remaining > 0 && (
    <div
      className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px]"
      style={{
        borderColor: "#f5f2ed",
        marginLeft: "-6px",
        background: "#e7e2dc",
      }}
    >
      +{remaining}
    </div>
  )}
</div>
              <p className="text-[12px] leading-normal m-0" style={{ color: "#6b6560" }}>
                Used by solo founders and indie hackers
                <br />
                exploring early-stage ideas
              </p>
            </div>
          </div>

          {/* Right column — conversation panel */}
          <div
            className="bg-white rounded-2xl flex flex-col overflow-hidden max-h-145"
            style={{
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow:
                "0 1px 2px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06), 0 32px 64px rgba(0,0,0,0.04)",
            }}
          >
            {/* Panel header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                background: "rgba(0,0,0,0.015)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="font-serif-display w-7 h-7 rounded-full flex items-center justify-center text-[13px]"
                  style={{ background: "#0a0a0a", color: "#f5f2ed" }}
                >
                  N
                </div>
                <div>
                  <div className="text-[13px] font-medium" style={{ color: "#0a0a0a" }}>
                    Nexra
                  </div>
                  <div className="text-[11px]" style={{ color: "#6b6560" }}>
                    <span
                      className="status-pulse inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1 align-middle"
                    />
                    Thinking Partner
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {DEMO.map((msg, i) => (
                <div
                  key={i}
                  className={`msg-enter ${i < visibleCount ? "visible" : ""}`}
                >
                  {msg.role === "founder" ? (
                    <div className="flex justify-end">
                      <div
                        className="max-w-[75%] px-3.5 py-2.5 rounded-[14px_14px_2px_14px] text-[13.5px] leading-[1.6]"
                        style={{ background: "#0a0a0a", color: "#f5f2ed" }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {i === 1 && (
                        <div
                          className="text-[10px] font-medium tracking-[0.08em] uppercase pl-0.5"
                          style={{ color: "#6b6560" }}
                        >
                          Nexra
                        </div>
                      )}
                      <div
                        className={`max-w-[90%] text-[13.5px] leading-[1.7] ${
                          msg.isQuestion
                            ? "font-serif-display text-[15px] leading-[1.6]"
                            : ""
                        }`}
                        style={{
                          color: msg.isQuestion ? "#3d3530" : "#2a2a2a",
                          fontStyle: msg.isQuestion ? "italic" : "normal",
                        }}
                      >
                        {msg.label && (
                          <span
                            className="text-[10px] font-medium tracking-widest uppercase mr-1"
                            style={{ color: "#8b7355" }}
                          >
                            {msg.label} —{" "}
                          </span>
                        )}
                        {msg.highlight ? (
                          <>
                            {msg.text.split(msg.highlight)[0]}
                            <mark className="nexra-mark">{msg.highlight}</mark>
                            {msg.text.split(msg.highlight)[1]}
                          </>
                        ) : (
                          msg.text
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              <div
                className={`flex items-center gap-1 py-2 transition-opacity duration-300 ${
                  visibleCount > 0 && visibleCount < DEMO.length
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="typing-dot w-1.5 h-1.5 rounded-full"
                    style={{ background: "#6b6560" }}
                  />
                ))}
              </div>
            </div>

            {/* Input mock */}
            <div
              className="px-4 py-3"
              style={{
                borderTop: "1px solid rgba(0,0,0,0.06)",
                background: "rgba(0,0,0,0.015)",
              }}
            >
              <div
                className="flex items-center gap-2.5 bg-white px-3.5 py-2.5 rounded-lg"
                style={{ border: "1px solid rgba(0,0,0,0.1)" }}
              >
                <span className="flex-1 text-[13px]" style={{ color: "#6b6560" }}>
                  What's on your mind right now…
                </span>
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: "#0a0a0a" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Waitlist Modal ── */}
      {waitlistOpen && (
        <div
          className="modal-fade fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
          onClick={() => setWaitlistOpen(false)}
        >
          <div
            className="modal-slide relative bg-white rounded-2xl p-10 w-full max-w-105"
            style={{
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setWaitlistOpen(false)}
              className="absolute top-4 right-4 bg-transparent border-0 cursor-pointer text-base leading-none p-1 transition-colors duration-200"
              style={{ color: "#6b6560" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6560")}
            >
              ✕
            </button>

            {status === "success" ? (
              <div className="text-center py-4">
                <h4
                  className="font-serif-display text-[22px] m-0 mb-2"
                  style={{ color: "#0a0a0a" }}
                >
                  You're on the list.
                </h4>
                <p className="text-[14px] m-0" style={{ color: "#6b6560" }}>
                  We'll reach out when there's something worth your time.
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="font-serif-display text-[24px] m-0 mb-1.5"
                  style={{ color: "#0a0a0a" }}
                >
                  Join the waitlist
                </h3>
                <p className="text-[14px] leading-[1.6] mt-0 mb-7" style={{ color: "#6b6560" }}>
                  Early access for founders. No noise, no newsletters.
                </p>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    required
                    placeholder="you@startup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg px-4 py-3 text-[14px] outline-none transition-colors duration-200 box-border"
                    style={{
                      background: "#fafafa",
                      border: "1px solid rgba(0,0,0,0.12)",
                      color: "#0a0a0a",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#0a0a0a")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")
                    }
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg text-[14px] font-medium cursor-pointer transition-opacity duration-200 hover:opacity-85 border-0"
                    style={{
                      background: "#0a0a0a",
                      color: "#f5f2ed",
                      fontFamily: "inherit",
                    }}
                  >
                    Join →
                  </button>
                </form>

                {status === "error" && (
                  <p className="text-[13px] mt-2 mb-0" style={{ color: "#dc2626" }}>
                    Something went wrong. Try again.
                  </p>
                )}

                <p className="text-[11px] text-center mt-4 mb-0" style={{ color: "#6b6560" }}>
                  No spam. Just product updates when they matter.{" "}
                  <Link
                    href="/privacy"
                    style={{ color: "inherit", textDecoration: "underline" }}
                  >
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