"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { thinkWithNexra } from "@/lib/api/chat";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { nanoid } from "nanoid";

/* ── Types ── */
export type Message = {
  id: string;
  role: "nexra" | "user";
  content?: string;
};

/* ── Constants (outside component — stable across renders) ── */
const USAGE_LIMIT = 5;
const STORAGE_KEY = "nexra_chat_usage";
const CHAT_HISTORY_KEY = "nexra_chat_history";

const SAMPLE_IDEAS = [
  "AI tool that helps indie hackers validate startup ideas before building",
  "Marketplace connecting local home chefs with nearby customers",
  "SaaS tool for YouTubers that turns long videos into structured notes",
  "Subscription app that helps gym beginners follow simple workout plans",
];

const WELCOME_MESSAGE =
  "Describe what you're building. I'll think through it with you.";

const V1_BANNER =
  "You're in early access. Sessions are limited while we refine the experience. Join the waitlist to get notified when full access opens.";

/* ── Helpers ── */
function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function getUsage(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    if (parsed.date !== todayKey()) return 0;
    return parsed.count ?? 0;
  } catch {
    return 0;
  }
}

function incrementUsage() {
  try {
    const count = getUsage();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ count: count + 1, date: todayKey() })
    );
  } catch {
    // localStorage unavailable — fail silently
  }
}

// Only gate the very first message as an idea check
// Follow-up messages in an ongoing conversation are always allowed
function isLikelyIdea(text: string, isFirstMessage: boolean): boolean {
  if (!isFirstMessage) return true;

  const lengthSignal = text.length > 25;
  const structuralSignals =
    /(for|who|that|to|helps|connecting|marketplace|subscription|platform|app|tool|saas|ai)/i.test(
      text
    );
  const containsVerbSignal =
    /(build|create|launch|develop|offer|provide|connect)/i.test(text);

  return lengthSignal && (structuralSignals || containsVerbSignal);
}

/* ── Component ── */
export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [open, setOpen] = useState(false);

  const addToWaitlist = useMutation(api.waitlist.addToWaitlist);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const sendTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingFullTextRef = useRef<string>("");
  const typingMessageIdRef = useRef<string | null>(null);

  /* ── Load chat history + usage on mount ── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    const bannerShown = localStorage.getItem("nexra_v1_banner");

    if (saved) {
      try {
        const parsed: Message[] = JSON.parse(saved);
        setMessages(parsed.map((m) => ({ ...m, id: m.id ?? nanoid() })));
      } catch {
        // Corrupted storage — start fresh
        localStorage.removeItem(CHAT_HISTORY_KEY);
        initMessages(bannerShown);
      }
    } else {
      initMessages(bannerShown);
    }

    setUsage(getUsage());
  }, []);

  function initMessages(bannerShown: string | null) {
    const initial: Message[] = [
      { id: nanoid(), role: "nexra", content: WELCOME_MESSAGE },
    ];
    if (!bannerShown) {
      initial.push({ id: nanoid(), role: "nexra", content: V1_BANNER });
      localStorage.setItem("nexra_v1_banner", "true");
    }
    setMessages(initial);
  }

  /* ── Persist chat history ── */
  useEffect(() => {
    if (messages.length === 0) return;
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    } catch {
      // Storage full or unavailable
    }
  }, [messages]);

  /* ── Scroll to bottom on new messages ── */
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages]);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      if (sendTimeoutRef.current) clearTimeout(sendTimeoutRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  /* ── Waitlist submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addToWaitlist({ email, source: "homepage" });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  /* ── Stop typing animation ── */
  function stopTyping() {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    if (typingMessageIdRef.current && typingFullTextRef.current) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingMessageIdRef.current
            ? { ...m, content: typingFullTextRef.current }
            : m
        )
      );
    }

    setIsTyping(false);
  }

async function handleSend(text: string) {
    if (loading) return;

    const userMessage: Message = { id: nanoid(), role: "user", content: text };

    // Client-side limit check (fallback — server is source of truth)
    if (usage >= USAGE_LIMIT) {
      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          id: nanoid(),
          role: "nexra",
          content:
            "You've used all your sessions for today. Come back tomorrow — or join the waitlist for full access.",
        },
      ]);
      return;
    }

    // Idea detection — only on first user message
    const isFirstMessage =
      messages.filter((m) => m.role === "user").length === 0;

    if (!isLikelyIdea(text, isFirstMessage)) {
      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          id: nanoid(),
          role: "nexra",
          content:
            "Tell me the actual startup idea you're thinking about. Who it's for and what problem it solves.",
        },
      ]);
      return;
    }

    const thinkingId = nanoid();

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: thinkingId, role: "nexra", content: "Thinking through this..." },
    ]);

    setLoading(true);
    await realNexraReply(text, thinkingId);
  }

//   async function realNexraReply(text: string, thinkingId: string) {
//     try {
//       const allMessages = messages
//   .filter(m => m.content)
//   .map(m => ({
//     role: m.role === "nexra" ? "assistant" : "user" as "user" | "assistant",
//     content: m.content!,
//   }));

// const data = await thinkWithNexra(allMessages, "balanced");

async function realNexraReply(text: string, thinkingId: string) {
  try {
    // Build history from messages BEFORE this turn
    // Filter out: thinking placeholder, nexra welcome, and the current user message
    const historyMessages = messages
      .filter(m => m.content && 
        m.content !== "Thinking through this..." &&
        m.content !== WELCOME_MESSAGE &&
        m.content !== V1_BANNER
      )
      .map(m => ({
        role: m.role === "nexra" ? "assistant" : "user" as "user" | "assistant",
        content: m.content!,
      }));

    // Add current user message at the end
    const allMessages = [
      ...historyMessages,
      { role: "user" as const, content: text }
    ];

    const data = await thinkWithNexra(allMessages, "balanced");

      // Use server-side session count if available, otherwise fall back to local
      if (data.sessions_remaining !== null && data.sessions_remaining !== undefined) {
        setUsage(USAGE_LIMIT - data.sessions_remaining);
      } else {
        incrementUsage();
        setUsage((prev) => prev + 1);
      }

      const fullText = data.message ?? "I couldn't generate a response.";
      const words = fullText.split(" ");
      let index = 0;

      typingFullTextRef.current = fullText;
      typingMessageIdRef.current = thinkingId;

      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

      setIsTyping(true);

      typingIntervalRef.current = setInterval(() => {
        index += index < 20 ? 1 : index < 60 ? 2 : 4;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === thinkingId
              ? { ...m, content: words.slice(0, index).join(" ") }
              : m
          )
        );

        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }

        if (index >= words.length) stopTyping();
      }, 35);

    } catch (error: any) {
      // Handle session limit from server (429)
      const isLimitError =
        error?.message?.toLowerCase().includes("session limit") ||
        error?.message?.toLowerCase().includes("limit reached");

      const message = isLimitError
        ? "You've used all your sessions for today. Come back tomorrow — or join the waitlist for full access."
        : "Something went wrong. Try again.";

      // If limit hit server-side, sync local usage to reflect it
      if (isLimitError) {
        setUsage(USAGE_LIMIT);
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingId ? { ...m, content: message } : m
        )
      );
    } finally {
      setLoading(false);
    }
  }

  const userMessageCount = messages.filter((m) => m.role === "user").length;

  /* ── Render ── */
  return (
    <div className="h-dvh bg-neutral-950 text-neutral-100">
      <div className="flex flex-col h-full min-h-0 max-w-4xl mx-auto">

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-6 scrollbar-none"
        >
          {/* Sample ideas — only before first user message */}
          {userMessageCount === 0 && (
            <div className="space-y-3 mb-6 py-10">
              <p className="text-sm text-neutral-500">
                Not sure where to start? Try one:
              </p>
              <div className="flex flex-col gap-2">
                {SAMPLE_IDEAS.map((idea) => (
                  <button
                    key={idea}
                    onClick={() => handleSend(idea)}
                    className="text-left text-sm px-4 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition"
                  >
                    {idea}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              msg={msg}
              isTyping={isTyping && msg.id === typingMessageIdRef.current}
            />
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-3 border-t border-neutral-800/60 bg-neutral-950/80 backdrop-blur-md">

          {/* Session counter — only after first use */}
          {usage > 0 && usage < USAGE_LIMIT && (
            <div className="mb-3 text-xs text-neutral-500 italic">
              Nexra: You have{" "}
              <span className="text-neutral-300">{USAGE_LIMIT - usage}</span>{" "}
              strategic session{USAGE_LIMIT - usage !== 1 ? "s" : ""} remaining
              today.
            </div>
          )}

          {usage >= USAGE_LIMIT && (
            <div className="mb-3 text-xs text-neutral-500 italic">
              Nexra: You've reached today's limit.{" "}
              <button
                onClick={() => setOpen(true)}
                className="ml-1 underline text-yellow-600 cursor-pointer hover:text-yellow-300 transition"
              >
                Join the waitlist for full access →
              </button>
            </div>
          )}

          <ChatInput
            onSend={handleSend}
            isTyping={isTyping}
            onStop={stopTyping}
            disabled={(loading && !isTyping) || usage >= USAGE_LIMIT}
          />
        </div>
      </div>

      {/* Waitlist Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 p-8 shadow-2xl"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-5 text-neutral-500 hover:text-white transition"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold">Join the waitlist</h3>
            <p className="text-sm text-neutral-400 mt-3">
              Remove limits. Get deeper thinking. Save your sessions.
            </p>

            {status === "success" && (
              <div className="mt-6">
                <p className="text-neutral-200 font-medium">
                  You're on the list.
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  We'll reach out when there's something worth your time.
                </p>
              </div>
            )}

            {status === "idle" && (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  type="email"
                  required
                  placeholder="you@startup.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-600 transition text-neutral-100 placeholder-neutral-500"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-white text-neutral-900 py-3 text-sm font-medium hover:bg-neutral-100 transition"
                >
                  Request early access →
                </button>
              </form>
            )}

            {status === "error" && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-red-400">
                  Something went wrong. Try again.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs text-neutral-400 underline hover:text-neutral-200 transition"
                >
                  Retry
                </button>
              </div>
            )}

            <p className="mt-6 text-xs text-neutral-600">
              No spam. Just product updates when they matter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}