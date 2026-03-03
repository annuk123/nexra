"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useNexraStore } from "@/lib/nexraStore";
import { thinkWithNexra } from "@/lib/api/chat";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { nanoid } from "nanoid";

export type Message = {
  id: string;
  role: "nexra" | "user";
  content?: string;
};

const USAGE_LIMIT = 5;
const STORAGE_KEY = "nexra_chat_usage";
const CHAT_HISTORY_KEY = "nexra_chat_history";

const SAMPLE_IDEAS = [
  "AI tool that helps indie hackers validate startup ideas before building",
  "Marketplace connecting local home chefs with nearby customers",
  "SaaS tool for YouTubers that turns long videos into structured notes",
  "Subscription app that helps gym beginners follow simple workout plans",
];

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

//  Idea detector (v1 rules)
function isLikelyIdea(text: string) {
  const lower = text.toLowerCase();

  const structuralSignals =
    /(for|who|that|to|helps|connecting|marketplace|subscription|platform|app|tool|saas|ai)/i.test(
      text,
    );

  const lengthSignal = text.length > 25;

  const containsNounVerbStructure =
    /(build|create|launch|develop|offer|provide|connect)/i.test(text);

  return lengthSignal && (structuralSignals || containsNounVerbStructure);
}



export default function ChatPanel() {
  const sendTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState(0);
  const addToWaitlist = useMutation(api.waitlist.addToWaitlist);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
const typingFullTextRef = useRef<string>("");
const typingMessageIdRef = useRef<string | null>(null);

const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle",
  );
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
You’re using **Nexra v2 — Structural Startup Validation**.

Full Co-Founder Mode with unlimited reasoning unlocks in **Nexra v2.5**.
Join the waitlist to access it first.
`;

useEffect(() => {
  if (typeof window === "undefined") return;

  const saved = localStorage.getItem(CHAT_HISTORY_KEY);
  const bannerShown = localStorage.getItem("nexra_v1_banner");

  if (saved) {
    const parsed: Message[] = JSON.parse(saved);

    const fixed = parsed.map((m) => ({
      ...m,
      id: m.id ?? nanoid(),
    }));

    setMessages(fixed);
  } else {
    const initial: Message[] = [
      {
        id: nanoid(),
        role: "nexra",
        content:
          "Describe what you're building. I'll think through it with you and identify structural risks.",
      },
    ];

    if (!bannerShown) {
      initial.push({
        id: nanoid(),
        role: "nexra",
        content: V1_BANNER,
      });
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

  useEffect(() => {
    return () => {
      if (sendTimeoutRef.current) {
        clearTimeout(sendTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);


  function handleSampleClick(idea: string) {
  handleSend(idea);
}

function stopTyping() {
  if (typingIntervalRef.current) {
    clearInterval(typingIntervalRef.current);
    typingIntervalRef.current = null;
  }

  if (typingMessageIdRef.current && typingFullTextRef.current) {
    setMessages(prev =>
      prev.map(m =>
        m.id === typingMessageIdRef.current
          ? {
              ...m,
              content: typingFullTextRef.current,
            }
          : m
      )
    );
  }

  setIsTyping(false);
}

useEffect(() => {
  const container = chatContainerRef.current;
  if (!container) return;

  container.scrollTo({
    top: container.scrollHeight,
    behavior: "smooth",
  });
}, [messages]);

async function handleSend(text: string) {
  if (loading) return;

  const userMessage: Message = {
    id: nanoid(),
    role: "user",
    content: text,
  };

  // Limit check
  if (usage >= USAGE_LIMIT) {
    setMessages(prev => [
      ...prev,
      userMessage,
      {
        id: nanoid(),
        role: "nexra",
        content:
          "You've reached today's limit. Join the waitlist to unlock deeper thinking.",
      },
    ]);
    return;
  }

  // Idea detection
  if (!isLikelyIdea(text)) {
    setMessages(prev => [
      ...prev,
      userMessage,
      {
        id: nanoid(),
        role: "nexra",
        content:
          "Tell me the actual startup idea you're thinking about. Who it's for. What problem it solves.",
      },
    ]);
    return;
  }

  const thinkingId = nanoid();

  setMessages(prev => [
    ...prev,
    userMessage,
    {
      id: thinkingId,
      role: "nexra",
      content: "Thinking through this...",
    },
  ]);

  setLoading(true);

  realNexraReply(text, thinkingId);
}

async function realNexraReply(text: string, thinkingId: string) {
  try {
    const data = await thinkWithNexra([
      {
        role: "user",
        content: text,
      },
    ]);

    incrementUsage();
    setUsage(prev => prev + 1);

    const fullText =
      data.message ?? "I couldn't generate a response.";

    const words = fullText.split(" ");
    let index = 0;

    // store references for stop control
    typingFullTextRef.current = fullText;
    typingMessageIdRef.current = thinkingId;

    // clear any previous typing interval (safety)
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    setIsTyping(true);

    typingIntervalRef.current = setInterval(() => {
      index += index < 30 ? 2 : 5;

      setMessages(prev =>
        prev.map(m =>
          m.id === thinkingId
            ? {
                ...m,
                content: words.slice(0, index).join(" "),
              }
            : m
        )
      );

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }

      if (index >= words.length) {
        stopTyping(); // clean finish
      }
    }, 35);

  } catch {
    setMessages(prev =>
      prev.map(m =>
        m.id === thinkingId
          ? {
              ...m,
              content: "Something went wrong. Try again.",
            }
          : m
      )
    );
  } finally {
    setLoading(false);
  }
}
  return (
<div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 pb-14">
  <div className="flex flex-col flex-1 max-w-4xl w-full mx-auto">
    {/* Chat Area */}


    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto min-h-0 px-6 py-8 space-y-6 scrollbar-none"
    >

      {messages.length <= 1 && (
  <div className="space-y-3 mb-6">
    <p className="text-sm text-neutral-500 ">
      Not sure where to start? Try one:
    </p>

    <div className="flex flex-col gap-2">
      {SAMPLE_IDEAS.map((idea) => (
        <button
          key={idea}
          onClick={() => handleSampleClick(idea)}
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
    isTyping={loading && msg.role === "nexra"}
  />
))}

      {/* {loading && <TypingIndicator />} */}

      <div ref={chatEndRef} />
    </div>

    {/* Footer Input Section */}
   <div className="shrink-0 px-6 py-4 border-t border-neutral-800/60 bg-neutral-950">
      
      {/* Input */}
      <div className="relative ">
        <ChatInput
  onSend={handleSend}
  isTyping={isTyping}
  onStop={stopTyping}
  disabled={(loading && !isTyping) || usage >= USAGE_LIMIT}
/>
      </div>

      {/* Minimal Usage Indicator */}
      <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
        <span>
          {USAGE_LIMIT - usage} of {USAGE_LIMIT} sessions remaining today
        </span>

        {usage >= USAGE_LIMIT && (
          <button
            onClick={() => setOpen(true)}
            className="text-yellow-400 hover:text-yellow-300 transition"
          >
            Upgrade →
          </button>
        )}
      </div>

      {/* Subtle Progress Bar */}
      <div className="mt-2 h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-500 transition-all duration-500"
          style={{ width: `${(usage / USAGE_LIMIT) * 100}%` }}
        />
      </div>
    </div>
  </div>

  {/* Modal */}
  {open && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 p-8 shadow-2xl"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-5 text-neutral-500 hover:text-white"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold">
          Unlock Co-Founder Mode
        </h3>

        <p className="text-sm text-neutral-400 mt-3">
          Remove limits. Get deeper strategic thinking. Save your sessions.
        </p>

        {status === "success" && (
          <div className="mt-6 text-green-400 text-sm">
            You’re on the list. We’ll reach out soon.
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
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-yellow-500 text-black py-3 text-sm font-medium hover:bg-yellow-400 transition"
            >
              Request Early Access
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-red-400">
            Something went wrong. Try again.
          </p>
        )}
      </div>
    </div>
  )}
</div>
  );
}
