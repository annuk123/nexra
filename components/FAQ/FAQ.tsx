"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is Nexra just ChatGPT with a prompt?",
    a: "No. Nexra uses structured reasoning frameworks to evaluate startup ideas. It’s not about chatting or generating opinions, it’s about exposing assumptions, risks, and trade-offs so you gain real clarity.",
  },
  {
    q: "Who is Nexra for?",
    a: "Nexra is built for solo founders and indie hackers who are deciding what to build — before investing significant time, money, or energy.",
  },
  {
    q: "What happens to my idea?",
    a: "Your ideas remain private. Inputs are not shared, reused, or used to train models. Nexra exists to help you think, not to extract value from your ideas.",
  },
  {
    q: "Will Nexra tell me what to build?",
    a: "No. Nexra doesn’t make decisions for you. It highlights blind spots, assumptions, and trade-offs so you can make better decisions yourself.",
  },
  {
    q: "Is Nexra useful if I already have experience?",
    a: "Yes. Nexra is designed for experienced builders who want a second layer of structured thinking, not surface-level advice.",
  },
  {
    q: "When can I use Nexra?",
    a: "We’re onboarding early users in small batches. Joining the waitlist gives you early access as the product opens up.",
  },
];


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-6 py-32">
      <span className="text-xs tracking-widest text-neutral-500">
        FAQ
      </span>

      <h2 className="mt-4 text-2xl sm:text-3xl font-semibold max-w-xl">
        Questions worth answering
      </h2>

      <div className="mt-12 divide-y divide-neutral-800">
        {faqs.map((item, i) => {
          const open = openIndex === i;

          return (
            <button
              key={i}
              onClick={() => setOpenIndex(open ? null : i)}
              className="w-full text-left py-6 focus:outline-none"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-neutral-200 font-medium">
                  {item.q}
                </h3>

                <span
                  className={`ml-4 text-neutral-500 transition-transform duration-200 ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </div>

              {open && (
                <p className="mt-4 text-neutral-400 leading-relaxed max-w-2xl">
                  {item.a}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
