import { Message } from "./ChatPanel";
import Image from "next/image";

export default function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "justify-end" : ""}`}>
      
      {/* Nexra Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-sm">
          <Image
            src="/nexra-logo.png"
            alt="Nexra"
            width={20}
            height={20}
            className="rounded-full drop-shadow-[0_0_6px_rgba(234,179,8,0.4)]"
          />
        </div>
      )}

      {/* Message Bubble */}
      <div className="max-w-md space-y-1">
        <p className="text-xs text-neutral-500">
          {isUser ? "You" : "Nexra"}
        </p>

        <div
          className={`px-4 py-2 rounded-xl text-sm leading-relaxed ${
            isUser
              ? "bg-neutral-800 text-neutral-100 rounded-br-none"
              : "bg-neutral-900 text-neutral-200 rounded-bl-none border border-neutral-800/80"
          }`}
        >
          {msg.content}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-semibold">
          U
        </div>
      )}
    </div>
  );
}
