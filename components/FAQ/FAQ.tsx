"use client";
import { useState } from "react";
import FeedbackModal from "../FeedbackPage/Feedback";

const faqs = [
  {
    q: "Is Nexra just ChatGPT with a prompt?",
    a: "No. ChatGPT will engage with whatever you give it and try to be helpful. Nexra is built to think with you — it follows the fragile assumption in your idea until a real tension appears, then holds that tension instead of resolving it too quickly. The goal is clarity, not a satisfying answer.",
  },
  {
    q: "Why not just use ChatGPT or Gemini?",
    a: "General AI is agreeable by default. Ask it about your idea and it'll find something nice to say. Nexra is built to do the opposite — surface what's uncertain, push on what's assumed, and ask the question you've been avoiding. That's a different behavior, not just a different prompt.",
  },
  {
    q: "Who is Nexra for?",
    a: "Solo founders, indie hackers, and early-stage builders who are making real decisions without a co-founder or advisor to think things through with. Especially useful at 11pm when something feels off and there's nobody to call.",
  },
  {
    q: "What happens to my idea?",
    a: "It stays yours. We don't store, share, or train on your ideas. Nexra exists to help you think — not to extract value from what you're building.",
  },
  {
    q: "Will Nexra tell me what to build?",
    a: "No — and that's intentional. A thinking partner doesn't make decisions for you. Nexra helps you see the idea more clearly so you can decide. The goal is that you leave the session knowing something you didn't when you started.",
  },
  {
    q: "Is Nexra useful if I already have experience?",
    a: "Often more so. Experienced founders know how to find validation for whatever they already believe. Nexra is useful precisely because it won't just confirm what you want to hear. A second perspective that's willing to push back is worth more the more experience you have.",
  },
  {
    q: "When can I use Nexra?",
    a: "We're opening access in small batches to make sure the experience is right before scaling. Join the waitlist — we'll reach out when there's a spot.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <section>
      <span className="text-xs tracking-widest text-neutral-500">FAQ</span>

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
        Still have questions?{" "}
        <button
          onClick={() => setFeedbackOpen(true)}
          className="underline hover:text-neutral-100 transition"
        >
          Send here →
        </button>
      </p>

      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
    </section>
  );
}