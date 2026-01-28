"use client";
import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

import Link from "next/link";
import GridSparks from "./GridSparks";
import FeedbackModal from "../FeedbackPage/Feedback";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
    const addToWaitlist = useMutation(api.waitlist.addToWaitlist);
      const [feedbackOpen, setFeedbackOpen] = useState(false);

        const [email, setEmail] = React.useState("");
        const [status, setStatus] = React.useState<
          "idle" | "success" | "error"
        >("idle");
        const [open, setOpen] = useState(false);
    
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
      
          try {
            await addToWaitlist({
              email,
              source: "homepage",
            });
      
            setStatus("success");
            setEmail("");
          } catch {
            setStatus("error");
          }
        };
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
    

      
      {/* ===== Premium Background Layers ===== */}

      {/* Animated gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(124,58,237,0.12),rgba(59,130,246,0.08),transparent)] bg-length-[200%_200%] animate-[gradient_18s_ease_infinite]" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_top,rgba(124,58,237,0.18),transparent)]" />

      {/* Secondary orb */}
      <div className="absolute top-40 left-1/2 w-175 h-175 bg-indigo-500/10 blur-[200px] rounded-full -translate-x-1/2" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px]" />


{/* Sparks */}
<GridSparks />

      {/* Noise overlay (add noise.png in public/) */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay" />

      {/* Fade to black */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black" />

      {/* ===== Content ===== */}
      <div className="relative max-w-5xl mx-auto px-6 pt-40 text-center">


<h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight 
  bg-linear-to-b from-white to-neutral-300 bg-clip-text text-transparent">

  Clarity Before Commitment
  <span className="block text-neutral-400 text-2xl sm:text-3xl font-medium mt-2 sm:hidden">
    for startup founders
  </span>
</h1>


<p className="mt-4 text-neutral-400 text-lg max-w-xl mx-auto">
 Nexra helps founders reason about product, market, and execution — so decisions are based on thinking, not instinct.
</p>

{/* <p className="mt-2 text-sm text-neutral-500">
  Paste your idea → get structured analysis → discuss strategy with an AI thinking partner.
</p> */}

<p className="mt-2 text-xs text-neutral-500">
 Built for solo founders and early-stage teams.
</p>

  <div className="mt-5 flex justify-center gap-4">
    <button 
      onClick={() => setOpen(true)}
      className="bg-white text-black px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-medium text-sm
  shadow-[0_0_0_0_rgba(124,58,237,0.4)]
  hover:shadow-[0_0_25px_2px_rgba(124,58,237,0.4)]
  transition">
      Start a session 
      {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
    </button>

    <Link
      href="/demo"
       className="px-6 py-3 sm:px-8 sm:py-3.5 text-sm font-medium rounded-lg border border-neutral-700 
  bg-white/5 backdrop-blur text-neutral-300 hover:bg-white/10 transition">
        See how it works 
        {/* <Play className="ml-2 h-4 w-4" /> */}

    </Link>
  </div>

  {/* Terminal Card */}
  
<div className="mt-8 mb-5 mx-auto max-w-2xl bg-black/60 backdrop-blur border border-neutral-800 
  rounded-xl p-5 shadow-[0_0_40px_rgba(124,58,237,0.15)] text-left">
 <p className="text-xs text-neutral-500 mb-2">Example Nexra output</p>

  <div className="flex gap-2 mb-3">
    <span className="w-3 h-3 bg-red-500 rounded-full" />
    <span className="w-3 h-3 bg-yellow-500 rounded-full" />
    <span className="w-3 h-3 bg-green-500 rounded-full" />
  </div>

  <pre className="text-xs sm:text-sm text-neutral-300 font-mono 
    whitespace-pre-wrap sm:whitespace-pre overflow-x-auto break-word">
{`$ nexra think
> "AI startup idea validator"
    Idea: AI tool that helps indie hackers validate startup ideas

Clarity Index: 0.83
Decision Risk: High
Strategic Direction: Narrow ICP and define evaluation framework`}
<span className="animate-pulse">▍</span>
  </pre>

</div>



</div>


       <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      {open && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    onClick={() => setOpen(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative bg-neutral-950 border border-neutral-800 rounded-xl p-6 w-full max-w-md shadow-2xl"
    >
      {/* Close */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-300 transition text-sm"
      >
        ✕
      </button>

      {/* Header */}
      <h3 className="text-lg font-semibold">
        Join the waitlist
      </h3>
      <p className="text-sm text-neutral-400 mt-1">
        Early access for founders. No marketing emails.
      </p>

      {/* SUCCESS */}
      {status === "success" && (
        <div className="mt-6">
          <p className="text-neutral-200 font-medium">
            You’re on the list.
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            We’ll email you when there’s something meaningful.
          </p>
        </div>
      )}

      {/* FORM */}
      {status === "idle" && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            required
            placeholder="you@startup.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
          />

          <button
            type="submit"
            className="px-5 py-3 text-sm rounded-lg bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition font-medium"
          >
            Join →
          </button>
        </form>
      )}

      {/* ERROR */}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          Something went wrong. Try again.
        </p>
      )}

      {/* Footer */}
      <p className="mt-6 text-xs text-neutral-500">
        No newsletters. Just product updates.
      </p>

      <p className="mt-2 text-xs text-neutral-500">
        By joining, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-neutral-300">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  </div>
)}
    </div>
  );
}
