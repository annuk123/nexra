import { Message } from "./ChatPanel";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  // USER MESSAGE → chat bubble
  if (isUser) {
    return (
      <div className="flex justify-end px-6 py-4">
        <div className="flex items-start gap-3 max-w-md">

          <div className="space-y-1">
            <p className="text-xs text-neutral-500 text-right">You</p>

            <div className="px-4 py-2 rounded-xl rounded-br-none bg-emerald-900/30 text-emerald-300 text-sm leading-relaxed whitespace-pre-wrap">
              {msg.content}
            </div>
          </div>

          <div className="w-8 h-8 p-3 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-semibold">
            U
          </div>

        </div>
      </div>
    );
  }

  // NEXRA MESSAGE → FULL WIDTH ANALYSIS PANEL
  return (
    <div className="w-full border-t border-neutral-900">

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
            <Image
              src="/nexra-logo.png"
              alt="Nexra"
              width={18}
              height={18}
              className="rounded-full"
            />
          </div>

          <span className="text-sm text-neutral-400 font-medium">
            Nexra Analysis
          </span>
        </div>

        {/* Full width text */}
        <div
          className="
            text-[16px]
            leading-[1.75]
            text-neutral-200
            tracking-[-0.01em]
            font-normal
          "
        >
          <ReactMarkdown
            components={{
              strong: ({ children }) => (
                <strong className="text-yellow-400 font-semibold">
                  {children}
                </strong>
              ),

              p: ({ children }) => (
                <p className="mb-4">{children}</p>
              ),

              li: ({ children }) => (
                <li className="ml-6 mb-1 list-disc text-neutral-300">
                  {children}
                </li>
              ),

              h1: ({ children }) => (
                <h1 className="text-xl font-semibold text-white mt-8 mb-4">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="text-lg font-semibold text-white mt-6 mb-3">
                  {children}
                </h2>
              ),
            }}
          >
            {msg.content}
          </ReactMarkdown>
        </div>

      </div>

    </div>
  );
}
