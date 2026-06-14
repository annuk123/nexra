"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { thinkWithNexraStream } from "@/lib/api/chat";
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

/* ── Helpers ── */
function isLikelyIdea(text: string, isFirstMessage: boolean): boolean {
  if (!isFirstMessage) return true;

  const lengthSignal = text.length > 25;
  const structuralSignals =
    /(for|who|that|to|helps|connecting|marketplace|subscription|platform|app|tool|saas|ai)/i.test(text);
  const containsVerbSignal =
    /(build|create|launch|develop|offer|provide|connect)/i.test(text);

  return lengthSignal && (structuralSignals || containsVerbSignal);
}

/* ── Component ── */
export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const sendTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isLimitReached = usage >= limit;
  const remaining = limit - usage;

  /* ── Load chat history on mount ── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(CHAT_HISTORY_KEY);

    if (saved) {
      try {
        const parsed: Message[] = JSON.parse(saved);
        setMessages(parsed.map((m) => ({ ...m, id: m.id ?? nanoid() })));
      } catch {
        localStorage.removeItem(CHAT_HISTORY_KEY);
        setMessages([{ id: nanoid(), role: "nexra", content: WELCOME_MESSAGE }]);
      }
    } else {
      setMessages([{ id: nanoid(), role: "nexra", content: WELCOME_MESSAGE }]);
    }

    const savedId = localStorage.getItem("nexra_conversation_id");
    if (savedId) setConversationId(savedId);
  }, []);

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

  /* ── Send handler ── */
  async function handleSend(text: string) {
    if (loading || isLimitReached) return;

    const userMessage: Message = { id: nanoid(), role: "user", content: text };
    const isFirstMessage = messages.filter((m) => m.role === "user").length === 0;

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
      { id: thinkingId, role: "nexra", content: "", isThinking: true },
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
            m.content !== WELCOME_MESSAGE
        )
        .map((m) => ({
          role: m.role === "nexra" ? "assistant" : ("user" as "user" | "assistant"),
          content: m.content!,
        }));

      const allMessages = [
        ...historyMessages,
        { role: "user" as const, content: text },
      ];

      await thinkWithNexraStream(
        allMessages,
        "balanced",
        {
          onChunk: (chunk) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === thinkingId
                  ? { ...m, content: (m.content ?? "") + chunk, isThinking: false }
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
              const l = serverLimit ?? limit;
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
                m.id === thinkingId ? { ...m, content: message, isThinking: false } : m
              )
            );
          },
        },
        conversationId,
      );
    } catch (error: any) {
      const isLimitError =
        error?.message?.toLowerCase().includes("session limit") ||
        error?.message?.toLowerCase().includes("limit reached") ||
        error?.message?.toLowerCase().includes("today's limit");

      if (isLimitError) setUsage(limit);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingId
            ? {
                ...m,
                content: isLimitError
                  ? "You've used all your sessions for today."
                  : "Something went wrong. Try again.",
                isThinking: false,
              }
            : m
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
              isTyping={loading && msg.id === messages[messages.length - 1]?.id}
            />
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-3 border-t border-neutral-800/60 bg-neutral-950/80 backdrop-blur-md">

          {/* Remaining messages hint */}
          {!isLimitReached && usage > 0 && (
            <div className="mb-3 text-xs text-neutral-500 italic">
              {remaining} message{remaining !== 1 ? "s" : ""} remaining today.
            </div>
          )}

          {/* Limit reached — show upgrade, not waitlist */}
          {isLimitReached && (
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-xs text-neutral-500 italic">
                You've used today's sessions.
              </p>
              <a
                href="/pricing"
                className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg bg-white text-neutral-900 hover:bg-neutral-100 transition"
              >
                Upgrade →
              </a>
            </div>
          )}

          <ChatInput
            onSend={handleSend}
            disabled={loading || isLimitReached}
          />
        </div>
      </div>
    </div>
  );
}