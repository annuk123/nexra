"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
type Metric = {
  label: string;
  value: string;
};

type DemoStep =
  | { type: "nexra"; text: string }
  | { type: "user"; text: string }
  | { type: "metrics"; data: Metric[] }
  | { type: "verdict"; label: string; notes: string[] };

const demoSteps: DemoStep[] = [
  {
    type: "nexra",
    text:
      "Hi. I’m Nexra — your thinking partner.\n\n" +
      "Tell me what you’re building."
  },

  {
    type: "user",
    text:
      "An AI tool that helps founders validate startup ideas before they build."
  },

  {
    type: "nexra",
    text:
      "Let me restate this to confirm I understand.\n\n" +
      "You’re trying to reduce wasted months by forcing early, honest validation — before execution begins.\n\n" +
      "Is that accurate?"
  },

  {
    type: "nexra",
    text:
      "Before we go further, there’s a critical question.\n\n" +
      "Why should a founder trust this more than their own intuition, friends, or Twitter feedback?"
  },

  {
    type: "user",
    text:
      "Because it forces structured thinking and exposes blind spots founders usually avoid."
  },

  {
    type: "nexra",
    text:
      "That’s a strong claim.\n\n" +
      "Counterpoint:\n" +
      "Founders are excellent at ignoring uncomfortable truths.\n\n" +
      "What makes this confrontation unavoidable rather than optional?"
  },

  {
    type: "metrics",
    data: [
      { label: "Target user", value: "Early-stage founders" },
      { label: "Core pain", value: "False confidence" },
      { label: "Market urgency", value: "High" },
      { label: "Execution risk", value: "Medium" },
      { label: "Differentiation risk", value: "High" }
    ]
  },

  {
    type: "verdict",
    label: "Proceed — with constraints",
    notes: [
      "Begin with rule-based validation to earn trust",
      "Charge early to filter non-serious users",
      "Position as a thinking partner, not an oracle",
      "Add deeper AI only after behavior is proven"
    ]
  },

  {
    type: "nexra",
    text:
      "If you want, we can pressure-test another assumption."
  }
];



export default function NexraThinkingDemo() { 
   const [stepIndex, setStepIndex] = useState(0);
   const scrollRef = useRef<HTMLDivElement>(null);

const getStepDuration = (step: DemoStep) => {
  switch (step.type) {
    case "metrics":
      return 3000;
    case "verdict":
      return 4000;
    default:
      return 2500;
  }
};

useEffect(() => {
  const currentStep = demoSteps[stepIndex];
  const duration = getStepDuration(currentStep);

  const timer = setTimeout(() => {
    setStepIndex((prev) =>
      prev === demoSteps.length - 1 ? 0 : prev + 1
    );
  }, duration);

  return () => clearTimeout(timer);
}, [stepIndex]);

 // Auto-scroll
  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [stepIndex]);

  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-black/70 backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
            <Image
                       src="/nexra-logo.png"
                       alt="Nexra"
                       width={20}
                       height={20}
                       className="rounded-full drop-shadow-[0_0_6px_rgba(234,179,8,0.4)]"
                     />
          </div>
          <div>
            <div className="text-sm font-medium text-white">Nexra</div>
            <div className="text-xs text-white/40">
              Thinking partner · Demo
            </div>
          </div>
        </div>
        <span className="text-xs text-white/40">Simulated</span>
      </div>

      {/* Chat body */}
      <div
        ref={scrollRef}
        className="h-90 sm:h-105 md:h-120 overflow-y-auto px-4 py-4 sm:px-6"
      >
        <div className="space-y-4">
          {demoSteps.slice(0, stepIndex + 1).map((step, i) => {
            if (step.type === "nexra") {
              return (
                <AnimatedMessage key={i}>
                  <NexraMessage
                    text={step.text}
                    typing={stepIndex === 0 && i === 0}

                  />
                </AnimatedMessage>
              );
            }

            if (step.type === "user") {
              return (
                <AnimatedMessage key={i}>
                  <UserMessage text={step.text} />
                </AnimatedMessage>
              );
            }

            if (step.type === "metrics") {
              return (
                <AnimatedMessage key={i}>
                  <MetricsCard data={step.data} />
                </AnimatedMessage>
              );
            }

            if (step.type === "verdict") {
              return (
                <AnimatedMessage key={i}>
                  <VerdictCard
                    label={step.label}
                    notes={step.notes}
                  />
                </AnimatedMessage>
              );
            }

            return null;
          })}
        </div>
      </div>

      {/* Footer input (disabled, realistic) */}
      <div className="border-t border-white/10 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/40">
          Describe your startup idea…
          <span className="ml-auto text-xs">(demo)</span>
        </div>
      </div>

      {/* Transparency label */}
      <div className="py-2 text-center text-[11px] text-white/30">
        Illustrative demo · Simulated conversation
      </div>
    </div>
  );
}


function NexraMessage({
  text,
  typing = false
}: {
  text: string;
  typing?: boolean;
}) {
  const typedText = typing ? useTypingEffect(text) : text;
  const isDebate = text.includes("Counter-argument");

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-white/10 text-center text-xs font-medium text-white flex items-center justify-center">
         <Image
                    src="/nexra-logo.png"
                    alt="Nexra"
                    width={20}
                    height={20}
                    className="rounded-full drop-shadow-[0_0_6px_rgba(234,179,8,0.4)]"
                  />
      </div>
      <div className="max-w-[85%] rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/80">
        {isDebate && (
          <div className="mb-1 text-[10px] font-medium uppercase tracking-wide text-amber-400">
            Debate mode
          </div>
        )}
        {typedText.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        {typing && typedText.length < text.length && (
          <span className="ml-1 inline-block h-3 w-1 animate-pulse bg-white/60" />
        )}
      </div>
    </div>
  );
}



function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
        {text.split("\n").map((line, i) => (
  <p key={i}>{line}</p>
))}

      </div>
    </div>
  );
}

function AnimatedMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      {children}
    </div>
  );
}

function MetricsCard({ data }: { data: Metric[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="mb-2 text-xs font-medium uppercase tracking-wide text-white/40">
        Initial Snapshot
      </div>

      <div className="space-y-2">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-white/60">{item.label}</span>
            <span className="font-medium text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerdictCard({
  label,
  notes
}: {
  label: string;
  notes: string[];
}) {
  return (
    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-emerald-400">
          Verdict
        </span>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
          {label}
        </span>
      </div>

      <ul className="space-y-1 text-sm text-emerald-200">
        {notes.map((note, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


function useTypingEffect(text: string, speed = 25) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}
