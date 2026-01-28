// components/chat/ChatPanel.tsx

"use client";

import { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useNexraStore } from "@/lib/nexraStore";
import { analyzeIdea } from "@/lib/api/ideas";
import { narrateIdea } from "@/lib/nexraNarrator";

export type Message = {
  role: "nexra" | "user";
  content: string;
};

const USAGE_LIMIT = 5;
const STORAGE_KEY = "nexra_chat_usage";

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

export default function ChatPanel() {
  const setMetrics = useNexraStore((s) => s.setMetrics);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "nexra",
      content: "Talk about your startup idea. I’ll challenge your thinking.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    setUsage(getUsage().count);
  }, []);

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
  "Daily limit reached. Nexra v2 will unlock deeper conversations and unlimited analyses. For now, I’d reflect on these insights and act on them.",

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
      const lines = narrateIdea(data);

      for (const line of lines) {
        await delay(700);
        setMessages((m) => [...m, { role: "nexra", content: line }]);
      }

      setMetrics({
        verdict: data.verdict,
        decision_score: data.decision_score,
        confidence: data.confidence ?? 0,
        breakdown: data.rule_breakdown,
        roadmap: data.roadmap ?? [],
      });

      incrementUsage();
      setUsage(getUsage().count);

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
    <>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {messages.map((msg, i) => (
          <ChatMessage key={i} msg={msg} />
        ))}

        {loading && <TypingIndicator />}
      </div>

      {/* Footer Limit Info */}
     
      


      {/* Input */}
      <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-2">
  <span>{USAGE_LIMIT - usage} analyses left today</span>
  <div className="w-20 h-1 bg-neutral-800 rounded">
    <div
      className="h-1 bg-yellow-400 rounded transition-all"
      style={{ width: `${((USAGE_LIMIT - usage) / USAGE_LIMIT) * 100}%` }}
    />
    {usage >= USAGE_LIMIT && (
  <button className="text-xs text-yellow-400 underline mt-2">
    Join Nexra v2 waitlist →
  </button>
)}
  </div>
</div>

      <ChatInput onSend={handleSend} disabled={loading || usage >= USAGE_LIMIT} />
    </>
  );
}

// Helper delay function
function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
