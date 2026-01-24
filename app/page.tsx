"use client";
import React from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import HowThink from "@/components/How-Nexra-Thinks/how-think";
import SeeAction from "@/components/See-Action/See-Action";
import { motion } from "framer-motion"
import FeedbackModal from "@/components/FeedbackPage/Feedback";
import { Section } from "@/design-system/layout/Section";
import Link from "next/link";
import FAQ from "@/components/FAQ/FAQ";
import { useState } from "react";
import { TimeComparison } from "@/components/TimeComparison/TimeComparison";
import StructureReasoning from "@/components/StructureReasoning/StructureReasoning";
import Testimonials from "@/components/testimonial/testimonial";
import HowAnalyze from "@/components/how-analyzes/how-analyze";
import TimeSavedCalculator from "@/components/TimeSavedCalculater/TimeSavedCaluclater";

export default function Home() {
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
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Hero */}
<Section size="md">
  {/* <span className="text-xs tracking-widest text-neutral-500">
    NEXRA AI
  </span> */}

  {/* Headline */}
  <h1 className="text-3xl sm:text-6xl lg:text-5xl font-semibold leading-tight sm:leading-[1.05] max-w-5xl">
    AI for startup idea validation and clarity before Commitment.
    <br />
    <span className="text-neutral-400 block mt-2 sm:mt-0">
      Build the right startup.  
      Or waste months on the wrong one.
    </span>
  </h1>

  <div className="w-12 h-px bg-neutral-700 my-6 sm:my-8" />

  <p className="mt-2 text-xs text-neutral-500">
    Trusted by founders to kill bad ideas fast.
  </p>

  <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed mt-3">
    Nexra analyzes your idea, surfaces blind spots, and maps what to build — before you waste time, money, and momentum.
  </p>

  <p className="mt-3 text-sm text-neutral-500 max-w-xl">
    Structured reasoning for founders who want signal, not vibes.
  </p>

  <p className="mt-2 text-sm text-neutral-400 max-w-xl">
    Most founders realize their idea is bad after shipping. Nexra tells you before.
  </p>

  {/* CTA Buttons */}
  <div className="mt-8 flex flex-row gap-3 sm:gap-4 w-full max-w-md">
    <button
      onClick={() => setOpen(true)}
      className="flex-1 inline-flex items-center justify-center px-4 sm:px-6 py-3 text-sm rounded-lg
                 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition font-medium"
    >
      Request access →
    </button>

    <Link
      href="/demo"
      className="flex-1 inline-flex items-center justify-center px-4 sm:px-6 py-3 text-sm rounded-lg
                 border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-neutral-100 transition"
    >
      View demo →
    </Link>
  </div>

  <p className="mt-3 text-xs text-neutral-500">
    Join builders validating ideas before building.
  </p>
</Section>

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




      <Section size="md">
        <TimeComparison />
      </Section>

<Section size="md">
  <TimeSavedCalculator />
</Section>
      {/* Key Questions */}

<Section size="md">
  <h2 className="text-3xl sm:text-4xl font-semibold max-w-3xl">
    Every founder asks these questions before building.
  </h2>

 <motion.ul
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true }}
  className="mt-8 space-y-4 max-w-2xl text-neutral-300"
>
  <li>“Is anyone else already building this?”</li>
  <li>“Will anyone actually pay for this?”</li>
  <li>“Am I solving a real problem or just a cool idea?”</li>
  <li>“Should I pivot before wasting more time?”</li>
</motion.ul>

  <p className="mt-6 text-sm text-neutral-400 max-w-xl">
    Nexra gives structured answers, not vibes.
  </p>
</Section>


      {/* How Nexra Thinks */}
      <Section size="md">
        <HowThink />
      </Section>

      {/* Structured Reasoning */}
      <Section size="md">
  <StructureReasoning />
  </Section>

      {/* How Nexra Analyzes */}
  <Section size="md">
    <HowAnalyze />
</Section>

      {/* Testimonials */}
<Section size="md">
<Testimonials />
</Section>

      {/* See Nexra in Action */}
      <Section size="md">
        <FAQ />
      </Section>

      {/* Static Demo */}
      {/* <Section size="sm">
        <StaticDemo />
      </Section> */}

      {/* Feedback */}
          <Section size="md">
      <span className="text-xs tracking-widest text-neutral-500">
        FEEDBACK
      </span>

      <h2 className="mt-4 text-2xl sm:text-3xl font-semibold max-w-xl">
        Help us think better.
      </h2>

      <p className="mt-4 text-neutral-400 max-w-xl">
        If something resonated, or didn’t, we’d appreciate your perspective.
        Your feedback helps us avoid building the wrong thing.
      </p>

      <div className="mt-8"  >
        <button
    onClick={() => setFeedbackOpen(true)}
   className="inline-flex items-center justify-center px-6 py-3 text-sm rounded-lg
                 border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-neutral-100 transition"
  >
   Share feedback →
  </button>
      </div>
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </Section>

<Section size="md">
  <p className="text-xs tracking-widest text-neutral-500">
    FOUNDER MANIFESTO
  </p>

  <h2 className="mt-4 text-3xl font-semibold">
    Clarity &gt; Speed
  </h2>

  <div className="mt-6 space-y-4 max-w-2xl text-neutral-300 text-lg leading-relaxed">
    <p>
      Startups don’t fail because founders move too slowly.
      They fail because founders move fast in the wrong direction.
    </p>

    <p>
      Nexra is built for the moment before commitment —
      when assumptions are still invisible and decisions are still reversible.
    </p>

    <p>
      Speed matters. But clarity compounds.
      A single clear decision can save months of execution.
    </p>
  </div>
</Section>
<Section size="md">
  <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-10 text-center">

    <p className="text-xs tracking-widest text-neutral-500">
      EARLY ACCESS
    </p>

    <h2 className="mt-4 text-3xl font-semibold">
      Stop guessing. Start deciding.
    </h2>
<p className="mt-2 text-sm text-neutral-500">
  Currently inviting thoughtful founders building serious products.
</p>

    <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
      Nexra is built with early founders who care about clarity before execution.
      Join early access to shape how founders make decisions.
    </p>

    {/* FORM */}
    {status === "idle" && (
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
      >
        <input
          type="email"
          required
          placeholder="you@startup.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
        />

        <button
          type="submit"
          className="px-6 py-3 text-sm rounded-lg bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition font-medium"
        >
          Request early access →
        </button>
      </form>
    )}

    {/* SUCCESS */}
    {status === "success" && (
      <div className="mt-6">
        <p className="text-neutral-200 font-medium">
          You're on the list.
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          We’ll email you only when there’s something meaningful.
        </p>
      </div>
    )}

    {/* ERROR */}
    {status === "error" && (
      <p className="mt-4 text-sm text-red-400">
        Something went wrong. Try again.
      </p>
    )}

    {/* Micro trust */}
    <p className="mt-4 text-xs text-neutral-500">
      Limited early access. No spam. No hype.
    </p>

  </div>
</Section>



    </main>
  );
}

