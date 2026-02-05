// components/chat/ChatPanel.tsx
"use client";
import React from "react";
import { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useNexraStore } from "@/lib/nexraStore";
import { analyzeIdea } from "@/lib/api/ideas";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";

export type Message = {
  role: "nexra" | "user";
  content: string;
};

const USAGE_LIMIT = 5;
const STORAGE_KEY = "nexra_chat_usage";
const CHAT_HISTORY_KEY = "nexra_chat_history";

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function getUsage() {
  if (typeof window === "undefined") return { count: 0, date: todayKey() };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { count: 0, date: todayKey() };
  const parsed = JSON.parse(raw);
  if (parsed.date !== todayKey()) return { count: 0, date: todayKey() };
  return parsed;
}

function incrementUsage() {
  const current = getUsage();
  const next = { count: current.count + 1, date: todayKey() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

// 🔥 Idea detector (v1 rules)
function isLikelyIdea(text: string) {
  return (
    text.length > 20 &&
    /(build|startup|app|tool|platform|saas|ai|users|market|problem)/i.test(text)
  );
}



export default function ChatPanel() {
  const setMetrics = useNexraStore((s) => s.setMetrics);
  const mode = useNexraStore((s) => s.mode); // SAFE / BALANCED / AGGRESSIVE

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState(0);
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

  // Load chat history
const V1_BANNER = `
This is **Nexra v1**. You can validate startup ideas here.

Conversational co-founder mode is coming in **Nexra v2**.
Join the waitlist to unlock it.
`;

useEffect(() => {
  const saved = localStorage.getItem(CHAT_HISTORY_KEY);
  const bannerShown = localStorage.getItem("nexra_v1_banner");

  if (saved) {
    setMessages(JSON.parse(saved));
  } else {
    const initial: Message[] = [
      { role: "nexra", content: "Talk about your startup idea. I’ll challenge your thinking." },
    ];

    if (!bannerShown) {
      initial.push({ role: "nexra", content: V1_BANNER });
      localStorage.setItem("nexra_v1_banner", "true");
    }

    setMessages(initial);
  }

  setUsage(getUsage().count);
}, []);

  // Save chat history
  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  }, [messages]);

  async function handleSend(text: string) {
    if (!text.trim()) return;

    // Daily limit check
    if (usage >= USAGE_LIMIT) {
      setMessages((m) => [
        ...m,
        { role: "user", content: text },
        {
          role: "nexra",
          content:
            "You’ve hit today’s decision limit. Real founders don’t need more answers—just execution. Nexra v2 unlocks unlimited co-founder mode. Join waitlist →",
        },
      ]);
      return;
    }

    // Not a startup idea → V2 teaser
    if (!isLikelyIdea(text)) {
      setMessages((m) => [
        ...m,
        { role: "user", content: text },
        {
          role: "nexra",
          content:
            "This doesn’t look like a startup idea. Nexra v1 only analyzes startup ideas. Nexra v2 will think with you like a co-founder. Join waitlist →",
        },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    await realNexraReply(text);
  }

async function realNexraReply(text: string) {
  try {
    const data = await analyzeIdea(text);

    setMetrics({
      verdict: data.verdict,
      decision_score: data.decision_score,
      confidence: data.confidence ?? 0,
      breakdown: data.rule_breakdown,
      roadmap: data.roadmap ?? [],
    });

    incrementUsage();
    setUsage(getUsage().count);

   const baseText = (data.nexra_output || "");

 const fullText = baseText;


   // Pre-seed first character
setMessages((prev) => [...prev, { role: "nexra", content: fullText[0] }]);

const parts = fullText.split(" ");

let i = 0;
let buffer = "";

const interval = setInterval(() => {
  if (i >= parts.length) return clearInterval(interval);

  buffer += parts[i] + " ";

  setMessages((prev) => {
    const updated = [...prev];
    updated[updated.length - 1].content = buffer;
    return updated;
  });

  i++;
}, 80);


  } catch (e) {
    console.error(e);
    setMessages((m) => [
      ...m,
      { role: "nexra", content: "Failed to analyze idea. Check backend logs." },
    ]);
  } finally {
    setLoading(false);
  }
}



  return (
//     <>
//       {/* Chat Messages */}
//       <div className="flex flex-col h-full overflow-y-auto space-y-6 pr-2">
//         {messages.map((msg, i) => (
//           <ChatMessage key={i} msg={msg} />
//         ))}
//         {loading && <TypingIndicator />}
//       </div>

//       {/* Usage UI */}
//       <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-2">
//         <span>{USAGE_LIMIT - usage} analyses left today</span>

//         <div className="w-24">
//           <div className="h-1 bg-neutral-800 rounded">
//             <div
//               className="h-1 bg-yellow-400 rounded transition-all"
//               style={{ width: `${(usage / USAGE_LIMIT) * 100}%` }}
//             />
//           </div>

//           {usage >= USAGE_LIMIT && (
//             // <button className="text-xs text-yellow-400 underline mt-2">
//             //   Join Nexra v2 waitlist →
//             // </button>
//             <button 
//       onClick={() => setOpen(true)}
//       className="text-xs text-yellow-400 underline mt-2">
//       Join Nexra v2 waitlist →
//     </button>
//           )}
//         </div>
//       </div>

//       {/* Input */}
//       <ChatInput onSend={handleSend} disabled={loading || usage >= USAGE_LIMIT} />
//         {open && (
//   <div
//     className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
//     onClick={() => setOpen(false)}
//   >
//     <div
//       onClick={(e) => e.stopPropagation()}
//       className="relative bg-neutral-950 border border-neutral-800 rounded-xl p-6 w-full max-w-md shadow-2xl"
//     >
//       {/* Close */}
//       <button
//         onClick={() => setOpen(false)}
//         className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-300 transition text-sm"
//       >
//         ✕
//       </button>

//       {/* Header */}
//       <h3 className="text-lg font-semibold">
//         Join the waitlist
//       </h3>
//       <p className="text-sm text-neutral-400 mt-1">
//         Early access for founders. No marketing emails.
//       </p>

//       {/* SUCCESS */}
//       {status === "success" && (
//         <div className="mt-6">
//           <p className="text-neutral-200 font-medium">
//             You’re on the list.
//           </p>
//           <p className="mt-2 text-sm text-neutral-500">
//             We’ll email you when there’s something meaningful.
//           </p>
//         </div>
//       )}

//       {/* FORM */}
//       {status === "idle" && (
//         <form
//           onSubmit={handleSubmit}
//           className="mt-6 flex flex-col sm:flex-row gap-3"
//         >
//           <input
//             type="email"
//             required
//             placeholder="you@startup.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
//           />

//           <button
//             type="submit"
//             className="px-5 py-3 text-sm rounded-lg bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition font-medium"
//           >
//             Join →
//           </button>
//         </form>
//       )}

//       {/* ERROR */}
//       {status === "error" && (
//         <p className="mt-4 text-sm text-red-400">
//           Something went wrong. Try again.
//         </p>
//       )}

//       {/* Footer */}
//       <p className="mt-6 text-xs text-neutral-500">
//         No newsletters. Just product updates.
//       </p>

//       <p className="mt-2 text-xs text-neutral-500">
//         By joining, you agree to our{" "}
//         <Link href="/privacy" className="underline hover:text-neutral-300">
//           Privacy Policy
//         </Link>
//         .
//       </p>
//     </div>
//   </div>
// )}
//     </>
<div className="flex flex-col h-full overflow-hidden">

  {/* Chat Messages */}
  <div className="flex-1 overflow-y-auto space-y-6 pr-2">
    {messages.map((msg, i) => (
      <ChatMessage key={i} msg={msg} />
    ))}
    {loading && <TypingIndicator />}
  </div>

  {/* Usage UI */}
  <div className="shrink-0 flex items-center justify-between text-[10px] text-neutral-500 mt-3">
    <span>{USAGE_LIMIT - usage} analyses left today</span>

    <div className="w-24">
      <div className="h-1 bg-neutral-800 rounded">
        <div
          className="h-1 bg-yellow-400 rounded transition-all"
          style={{ width: `${(usage / USAGE_LIMIT) * 100}%` }}
        />
      </div>

      {usage >= USAGE_LIMIT && (
        <button
          onClick={() => setOpen(true)}
          className="text-xs text-yellow-400 underline mt-2"
        >
          Join Nexra v2 waitlist →
        </button>
      )}
    </div>
  </div>

  {/* Input */}
  <div className="shrink-0 bg-neutral-950 pt-3">
    <ChatInput
      onSend={handleSend}
      disabled={loading || usage >= USAGE_LIMIT}
    />
  </div>


  {/* Modal */}
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