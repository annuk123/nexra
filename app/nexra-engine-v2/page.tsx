"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";


export default function NexraV2Page() {
  const [open, setOpen] = useState(false);
   const addToWaitlist = useMutation(api.waitlist.addToWaitlist);
    const [email, setEmail] = React.useState("");
           const [status, setStatus] = React.useState<
             "idle" | "success" | "error"
           >("idle");
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
<main className="bg-black text-neutral-100 min-h-screen flex flex-col items-center px-6">
  {/* Header */}
  <section className="mt-24 text-center max-w-3xl">
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
      Nexra Engine — v2 in Progress
    </h1>

    <p className="text-neutral-400 mt-6 text-lg">
      We’re rebuilding Nexra’s brain. On purpose.
    </p>
  </section>

  {/* Content Wrapper */}
  <div className="w-full max-w-3xl mt-24 space-y-24">
    {/* Why */}
    <section className="text-neutral-300 leading-relaxed text-left">
      <p>
        Nexra isn’t a generic AI that says{" "}
        <span className="italic">“great idea, keep going.”</span>
      </p>

      <p className="mt-4">
        It’s a decision engine designed to challenge founders{" "}
        <strong>before</strong> they waste months building.
      </p>

      <p className="mt-4">
        To do that properly, we’re rebuilding the core engine.
      </p>

      <p className="mt-4 text-neutral-400">
        Not patching. Not rushing. Rebuilding.
      </p>
    </section>

    {/* Manifesto */}
    <section className="text-left">
      <h2 className="text-2xl font-semibold mb-6">
        The Nexra Manifesto
      </h2>

      <div className="space-y-4 text-neutral-300 leading-relaxed">
        <p>
          Most startup ideas don’t fail because they’re bad.
          They fail because nobody challenged them early.
        </p>

        <p>
          Friends are polite.<br />
          Twitter is noisy.<br />
          AI tools are agreeable.
        </p>

        <p>Nexra exists to be none of those.</p>

        <p>
          It exists to pressure-test ideas, expose blind spots,
          and force real founder thinking.
        </p>

        <p className="text-neutral-400">
          If your idea survives Nexra, it deserves your time.
        </p>
      </div>
    </section>

    {/* What's coming */}
    <section className="text-left">
      <h2 className="text-2xl font-semibold mb-6">
        What’s coming in Engine v2
      </h2>

      <ul className="space-y-3 text-neutral-300">
        <li>— A sharper Decision Engine</li>
        <li>— Stronger verdict logic</li>
        <li>— Clearer next-step guidance</li>
        <li>— Founder-style reasoning over generic AI output</li>
      </ul>

      <p className="mt-6 text-neutral-400">
        Quality over speed. Always.
      </p>
    </section>

    {/* CTA */}
    <section className="text-center">
      <p className="text-neutral-300 mb-6">
        If you’re here now, you’re early.
      </p>

      <button
        onClick={() => setOpen(true)}
        className="bg-white text-black px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg
          font-medium text-sm
          shadow-[0_0_0_0_rgba(124,58,237,0.4)]
          hover:shadow-[0_0_25px_2px_rgba(124,58,237,0.4)]
          transition"
      >
        Get early access to Nexra v2
      </button>

      <p className="mt-4 text-sm text-neutral-500">
        Early users help shape how Nexra thinks.
      </p>
    </section>
  </div>

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
</main>

  );
}
