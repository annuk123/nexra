"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { thinkWithNexraStream } from "@/lib/api/chat";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { nanoid } from "nanoid";

/* ── Types ── */
export type Message = {
  id: string;
  role: "nexra" | "user";
  content?: string;
};

/* ── Constants ── */
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
  const [limit, setLimit] = useState(10);
  const [email, setEmail] = React.useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [open, setOpen] = useState(false);

  const addToWaitlist = useMutation(api.waitlist.addToWaitlist);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const sendTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ── Load chat history on mount ── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    const bannerShown = localStorage.getItem("nexra_v1_banner");

    if (saved) {
      try {
        const parsed: Message[] = JSON.parse(saved);
        setMessages(parsed.map((m) => ({ ...m, id: m.id ?? nanoid() })));
      } catch {
        localStorage.removeItem(CHAT_HISTORY_KEY);
        initMessages(bannerShown);
      }
    } else {
      initMessages(bannerShown);
    }

     const savedId = localStorage.getItem("nexra_conversation_id");
  if (savedId) setConversationId(savedId);
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
    };
  }, []);

  /* ── Fetch session status on mount ── */
useEffect(() => {
  const fetchStatus = async () => {
    const token = localStorage.getItem("nexra_access_token");
    if (!token) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/session-status`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) return;
      const data = await res.json();
      setLimit(data.limit);
      setUsage(data.used);
    } catch {
      // silently fail
    }
  };

  fetchStatus();
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

  /* ── Send handler ── */
  async function handleSend(text: string) {
    if (loading) return;

    const userMessage: Message = { id: nanoid(), role: "user", content: text };

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

  /* ── Streaming reply ── */
async function realNexraReply(text: string, thinkingId: string) {
    try {
      const historyMessages = messages
        .filter(
          (m) =>
            m.content &&
            m.content !== "Thinking through this..." &&
            m.content !== WELCOME_MESSAGE &&
            m.content !== V1_BANNER
        )
        .map((m) => ({
          role: m.role === "nexra" ? "assistant" : ("user" as "user" | "assistant"),
          content: m.content!,
        }));

      const allMessages = [
        ...historyMessages,
        { role: "user" as const, content: text },
      ];

      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? { ...m, content: "" } : m))
      );

      await thinkWithNexraStream(
        allMessages,
        "balanced",
        {
          onChunk: (chunk) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === thinkingId
                  ? { ...m, content: (m.content ?? "") + chunk }
                  : m
              )
            );

            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
              });
            }
          },

          onDone: ({ sessions_remaining, limit: serverLimit, conversation_id }) => {
            if (sessions_remaining !== null && sessions_remaining !== undefined) {
              const l = serverLimit ?? 10;
              setLimit(l);
              setUsage(l - sessions_remaining);
            }
            if (conversation_id) {
              setConversationId(conversation_id);
              localStorage.setItem("nexra_conversation_id", conversation_id);
            }
          },

          onError: (message) => {
            const isLimitError =
              message.toLowerCase().includes("limit") ||
              message.toLowerCase().includes("tomorrow");

            if (isLimitError) setUsage(limit);

            setMessages((prev) =>
              prev.map((m) =>
                m.id === thinkingId ? { ...m, content: message } : m
              )
            );
          },
        },
        conversationId, // pass stored id
      );
    } catch (error: any) {
      const isLimitError =
        error?.message?.toLowerCase().includes("session limit") ||
        error?.message?.toLowerCase().includes("limit reached") ||
        error?.message?.toLowerCase().includes("today's limit");

      const message = isLimitError
        ? "You've used all your sessions for today. Come back tomorrow — or join the waitlist for full access."
        : "Something went wrong. Try again.";

      if (isLimitError) setUsage(limit);

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
            />
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-3 border-t border-neutral-800/60 bg-neutral-950/80 backdrop-blur-md">

          {usage > 0 && usage < limit && (
            <div className="mb-3 text-xs text-neutral-500 italic">
              Nexra: You have{" "}
              <span className="text-neutral-300">{limit - usage}</span>{" "}
              message{limit - usage !== 1 ? "s" : ""} remaining today.
            </div>
          )}

          {usage >= limit && (
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
            disabled={loading || usage >= limit}
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