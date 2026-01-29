"use client";

import { useState } from "react";

export default function ChatInput({
  onSend,
  disabled
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");

  function send() {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  return (
    <div className=" flex gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Explain your startup idea..."
        className="flex-1 bg-neutral-900 border border-neutral-700 p-3 rounded-lg text-sm focus:outline-none"
      />

      <button
        onClick={send}
        disabled={disabled}
        className="px-4 py-2 bg-neutral-100 text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-200 disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}
