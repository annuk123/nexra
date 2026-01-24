"use client";
import { useState } from "react";
import FeedbackModal from "../FeedbackPage/Feedback";

const faqs = [
  {
    q: "Is Nexra just ChatGPT with a prompt?",
    a: "No. Nexra is a structured decision system for startup ideas. It breaks ideas into assumptions, market dynamics, risks, and trade-offs before producing a decision framework. It’s built for clarity, not conversation.",
  },
  {
    q: "Why not just use ChatGPT or Gemini?",
    a: "General-purpose AI tools give broad advice. Nexra is purpose-built for startup thinking, with structured frameworks and decision-oriented outputs instead of generic responses.",
  },
  {
    q: "Who is Nexra for?",
    a: "Nexra is built for solo founders, indie hackers, and early-stage builders deciding what to build before committing significant time, money, or energy.",
  },
  {
    q: "What happens to my idea?",
    a: "Your ideas remain private. Inputs are not shared, reused, or used to train models. Nexra exists to help you think, not to extract value from your ideas.",
  },
  {
    q: "Will Nexra tell me what to build?",
    a: "No. Nexra does not make decisions for you. It surfaces blind spots, assumptions, and trade-offs so you can make informed decisions yourself.",
  },
  {
    q: "Is Nexra useful if I already have experience?",
    a: "Yes. Nexra is designed for experienced builders who want a second layer of structured thinking and decision clarity, not surface-level advice.",
  },
  {
    q: "When can I use Nexra?",
    a: "We’re onboarding early users in small batches. Join the waitlist to get access as the product opens up.",
  },
];



export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <section className="max-w-3xl mx-auto px-6 py-32">
      <span className="text-xs tracking-widest text-neutral-500">
        FAQ
      </span>

      <h2 className="mt-4 text-2xl sm:text-3xl font-semibold max-w-xl">
        Questions founders ask before building
      </h2>

      <div className="mt-12 divide-y divide-neutral-800">
        {faqs.map((item, i) => {
          const open = openIndex === i;

          return (
            <div key={i} className="py-6">
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-center justify-between text-left focus:outline-none group"
              >
                <h3 className="text-neutral-200 font-medium group-hover:text-neutral-100 transition">
                  {item.q}
                </h3>

                <span
                  className={`ml-4 text-neutral-500 transition-transform duration-200 group-hover:text-neutral-300 ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {open && (
                <p className="mt-4 text-neutral-400 leading-relaxed max-w-2xl">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-neutral-500">
        Still have questions? 
        <button
    onClick={() => setFeedbackOpen(true)}
    className="underline hover:text-neutral-100 transition"
  >
    Send here →
  </button>
  
      </p>
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </section>
  );
}
