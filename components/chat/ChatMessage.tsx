import { Message } from "./ChatPanel";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


function highlightUncertainty(text: string) {
  const patterns = [
    /I’m not sure[^.?!]*[.?!]/gi,
    /What worries me[^.?!]*[.?!]/gi,
    /Where I get stuck[^.?!]*[.?!]/gi,
    /I’m trying to see[^.?!]*[.?!]/gi,
    /I might be wrong[^.?!]*[.?!]/gi,
    /I’m not convinced[^.?!]*[.?!]/gi,
    /This is where it feels fragile[^.?!]*[.?!]/gi,
  ];

  let processed = text;

  patterns.forEach((pattern) => {
    processed = processed.replace(
      pattern,
      (match) => `==${match}==`
    );
  });

  return processed;
}

export default function ChatMessage({
  msg,
  isTyping,
}: {
  msg: Message;
  isTyping?: boolean;
}) {
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

<div className="px-6 py-8">
  <div className="max-w-2xl mx-auto">
    {/* <p className="text-xs text-neutral-500 mb-6 tracking-wide uppercase">
      Nexra
    </p> */}

    <div
      className="
        prose 
        prose-invert 
        max-w-none
        text-[16px]
        leading-8

        prose-p:my-5
        prose-p:first:mt-0
        prose-p:last:mb-0

        prose-strong:text-white
        prose-strong:font-semibold
        prose-strong:bg-emerald-500/10
        prose-strong:px-1
        prose-strong:rounded

        prose-ul:my-5
        prose-li:my-2

        prose-blockquote:border-l-emerald-500
        prose-blockquote:bg-emerald-500/5
        prose-blockquote:px-4
        prose-blockquote:py-2
        prose-blockquote:rounded-md
      "
    >

<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    mark: ({ children }) => (
      <mark className="bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded-md">
        {children}
      </mark>
    ),
  }}
>
  {highlightUncertainty(msg.content || "")}
</ReactMarkdown>
{isTyping && (
  <span className="inline-block w-1.5 h-5 bg-indigo-500 ml-1 animate-pulse rounded-sm" />
)}
    </div>
  </div>
</div>
      </div>
    </div>
  );
}