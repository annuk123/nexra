"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatInput({
  onSend,
  disabled
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
    <div className="flex gap-2 items-end">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          // Desktop: Cmd/Ctrl + Enter sends
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            send();
          }
        }}
        placeholder="Explain your startup idea..."
        rows={1}
        className="
          flex-1
          resize-none
          bg-neutral-900
          border border-neutral-700
          p-3
          rounded-lg
          text-sm
          focus:outline-none
          leading-relaxed
        "
      />

      <button
        onClick={send}
        disabled={disabled}
        className="
          px-4 py-2
          bg-neutral-100
          text-neutral-900
          rounded-lg
          text-sm
          font-medium
          hover:bg-neutral-200
          disabled:opacity-50
          shrink-0
        "
      >
        Send
      </button>
    </div>
  );
}
