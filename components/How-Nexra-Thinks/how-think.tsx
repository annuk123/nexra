"use client";
import { Section } from "@/design-system/layout/Section";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function HowThink() {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);

const steps = [
  { num: "01", title: "Idea ingestion", desc: "Formalize your startup hypothesis." },
  { num: "02", title: "Market & risk modeling", desc: "Demand signals, competitors, and failure modes." },
  { num: "03", title: "Go / No-Go decision", desc: "Build, pivot, or kill with justification." },
  { num: "04", title: "Execution blueprint", desc: "Positioning, MVP scope, and launch plan." },
];


  return (
    <Section>
      <h2 className="text-3xl sm:text-4xl font-semibold max-w-3xl">
        How Nexra thinks about your startup idea
      </h2>

      <p className="mt-4 text-neutral-400 max-w-2xl">
        A structured decision pipeline, not a chat response.
      </p>

      {/* Swipe Row */}
      <div
        ref={containerRef}
        onScroll={(e) => {
          const index = Math.round((e.target as HTMLElement).scrollLeft / 300);
          setActive(index);
        }}
        className="mt-12 flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
      >
        {steps.map((s, i) => (
          <Card key={i} {...s} />
        ))}
      </div>

      {/* Apple-style dots */}
      <div className="mt-4 flex gap-2 justify-center">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition ${
              active === i ? "bg-neutral-100" : "bg-neutral-600"
            }`}
          />
        ))}
      </div>

      <p className="mt-8 text-sm text-neutral-400 max-w-xl">
        Think of Nexra as a startup decision engine, not another AI chatbot.
      </p>
    </Section>
  );
}

interface CardProps {
  num: string;
  title: string;
  desc: string;
}

function Card({ num, title, desc }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 
                 min-w-65 sm:min-w-70 snap-center shrink-0"
    >
      <p className="text-xs text-neutral-500">{num}</p>
      <h3 className="mt-2 font-medium text-neutral-100">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{desc}</p>
    </motion.div>
  );
}
