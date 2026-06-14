import { Message } from "./ChatPanel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useMemo, useRef } from "react";
import Image from "next/image";

/* ================= TEXT HELPERS ================= */

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map((c) => (typeof c === "string" ? c : "")).join("");
  }
  return "";
}

/* ================= PARAGRAPH COUNT ================= */

function countParagraphNodes(content: string): number {
  const lines = content.split("\n");
  let count = 0;
  let inParagraph = false;
  let inFence = false;

  for (const line of lines) {
    if (line.startsWith("```")) { inFence = !inFence; inParagraph = false; continue; }
    if (inFence) continue;
    const trimmed = line.trim();
    const isBlank = trimmed === "";
    const isStructural = /^(#{1,6}\s|[-*+]\s|\d+\.\s|>|`{3})/.test(trimmed);

    if (!isBlank && !isStructural) {
      if (!inParagraph) { count++; inParagraph = true; }
    } else {
      inParagraph = false;
    }
  }
  return Math.max(count, 1);
}

/* ================= STREAMING CURSOR ================= */

function StreamingCursor() {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-[2px] h-[1em] bg-indigo-400 ml-0.5 align-middle animate-pulse"
      style={{ animationDuration: "0.8s" }}
    />
  );
}

/* ================= THINKING ANIMATION ================= */

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-bounce"
            style={{ animationDelay: `${i * 150}ms`, animationDuration: "1s" }}
          />
        ))}
      </div>
      <span className="text-xs text-neutral-600 italic">thinking...</span>
    </div>
  );
}

/* ================= COMPONENT ================= */

export default function ChatMessage({
  msg,
  isTyping,
}: {
  msg: Message & { isThinking?: boolean };
  isTyping?: boolean;
}) {
  const isUser = msg.role === "user";
  const content = msg.content || "";
  const isEmpty = content.trim() === "";

  const paragraphIndexRef = useRef(0);
  const totalParagraphs = useMemo(() => countParagraphNodes(content), [content]);
  paragraphIndexRef.current = 0;

  /* ================= USER MESSAGE ================= */

  if (isUser) {
    return (
      <div className="flex justify-end px-6 py-4">
        <div className="max-w-md space-y-1 text-right">
          <p className="text-xs text-neutral-500">You</p>
          {/* FIX: changed from emerald to zinc so it doesn't clash with Nexra's mark color */}
          <div className="px-4 py-3 rounded-2xl rounded-br-none bg-neutral-800 text-neutral-100 text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        </div>
      </div>
    );
  }

  /* ================= NEXRA MESSAGE ================= */

  return (
    <div className="px-6 py-6">
      <div className="max-w-2xl mx-auto">

        {/* Nexra Identity */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Image
              src="/nexra.png"
              alt="Nexra"
              width={28}
              height={28}
              className="h-7 w-7 object-cover"
            />
          </div>
          <p className="text-xs text-neutral-400">Nexra · Thinking Partner</p>
        </div>

        {/* Thinking state */}
        {msg.isThinking || (isEmpty && isTyping) ? (
          <ThinkingIndicator />
        ) : (
          /* Message Content */
          <div
            className="
              prose
              prose-invert
              max-w-none
              text-[15px]
              leading-[1.9]

              prose-strong:text-white
              prose-strong:font-semibold
              prose-strong:bg-emerald-500/10
              prose-strong:px-1
              prose-strong:rounded

              prose-ul:my-6
              prose-li:my-3

              prose-blockquote:border-l-emerald-500
              prose-blockquote:bg-emerald-500/5
              prose-blockquote:px-4
              prose-blockquote:py-2
              prose-blockquote:rounded-md
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{

                // <mark> — emerald tint, distinct from user bubble
                mark: ({ children }) => (
                  <mark className="bg-emerald-500/15 text-emerald-300 px-1.5 py-0.5 rounded-md not-prose font-medium">
                    {children}
                  </mark>
                ),

                p: ({ children }) => {
                  paragraphIndexRef.current += 1;
                  const currentIndex = paragraphIndexRef.current;
                  const text = extractText(children);
                  const isLast = currentIndex === totalParagraphs;

                  if (text.startsWith("Try this:")) {
                    return (
                      <p className="text-xs uppercase tracking-wide text-indigo-400 mt-6 mb-2 not-prose">
                        Small experiment
                      </p>
                    );
                  }

                  if (text.startsWith("Continue exploring")) {
                    return (
                      <p className="text-xs uppercase tracking-wide text-neutral-500 mt-6 mb-2 not-prose">
                        Continue exploring
                      </p>
                    );
                  }

                  if (isLast && text.includes("?")) {
                    return (
                      <p className="text-indigo-300 font-medium">
                        {children}
                        {isTyping && <StreamingCursor />}
                      </p>
                    );
                  }

                  return (
                    <p>
                      {children}
                      {isLast && isTyping && <StreamingCursor />}
                    </p>
                  );
                },

                ul: ({ children, ...props }) => (
                  <ul className="space-y-2 list-disc pl-5 my-4 text-neutral-200" {...props}>
                    {children}
                  </ul>
                ),

                li: ({ children }) => (
                  <li className="text-neutral-200">{children}</li>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}

      </div>
    </div>
  );
}