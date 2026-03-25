"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function send() {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  // Auto-grow textarea
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, 160) + "px";
  }, [text]);

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (disabled) return;
            send();
          }
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            if (disabled) return;
            send();
          }
        }}
        placeholder="What are you building — or thinking about building?"
        rows={1}
        disabled={disabled}
        className="
          w-full
          resize-none
          bg-neutral-900
          border border-neutral-700
          px-4
          py-3
          pr-14
          rounded-2xl
          text-sm
          focus:outline-none
          focus:border-neutral-600
          leading-relaxed
          transition
          scrollbar-none
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      />

      <button
        onClick={send}
        disabled={disabled || !text.trim()}
        className="
          absolute
          right-3
          bottom-3
          p-2
          rounded-full
          bg-neutral-100
          text-neutral-900
          hover:bg-neutral-200
          transition
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        <Send size={16} />
      </button>
    </div>
  );
}