import { Message } from "./ChatPanel";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  /* ================= USER ================= */

  if (isUser) {
    return (
      <div className="flex justify-end px-6 py-4">
        <div className="max-w-md space-y-1 text-right">
          <p className="text-xs text-neutral-500">You</p>

          <div className="px-4 py-3 rounded-2xl rounded-br-none bg-emerald-900/30 text-emerald-300 text-sm leading-relaxed whitespace-pre-wrap">
            {msg.content}
          </div>
        </div>
      </div>
    );
  }

  /* ================= NEXRA ================= */

  return (
    <div className="px-6 py-6">
      <div className="flex items-start gap-3 max-w-3xl">
        <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
          <Image
            src="/nexra-logo.png"
            alt="Nexra"
            width={16}
            height={16}
          />
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-xs text-neutral-500">Nexra</p>

          <div className="text-neutral-200 text-sm leading-relaxed whitespace-pre-wrap">
            <ReactMarkdown>{msg.content || ""}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}