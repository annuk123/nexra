import { Message } from "./ChatPanel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useMemo } from "react";
import Image from "next/image";

/* ================= TEXT HELPERS ================= */

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map((c) => (typeof c === "string" ? c : "")).join("");
  }
  return "";
}

/* ================= LAST QUESTION DETECTOR ================= */

// Counts total paragraph nodes to identify the final one
function countParagraphs(content: string): number {
  return (content.match(/\n\n|\n(?=[A-Z])/g) || []).length + 1;
}

/* ================= COMPONENT ================= */

export default function ChatMessage({
  msg,
  isTyping,
}: {
  msg: Message;
  isTyping?: boolean;
}) {
  const isUser = msg.role === "user";

  // Track paragraph index during render
  let paragraphIndex = 0;

  const totalParagraphs = useMemo(
    () => countParagraphs(msg.content || ""),
    [msg.content]
  );

  /* ================= USER MESSAGE ================= */

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

  /* ================= NEXRA MESSAGE ================= */

  return (
    <div className="px-6 py-6">
      <div className="max-w-2xl mx-auto">

        {/* Nexra Identity */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 text-xs font-semibold">
            <Image
              src="/nexra.png"
              alt="Nexra"
              width={28}
              height={28}
              className="h-6 w-6"
            />
          </div>
          <p className="text-xs text-neutral-400">Nexra · Thinking Partner</p>
        </div>

        {/* Message Content */}
        <div
          className="
            prose
            prose-invert
            max-w-none
            text-[15px]
            leading-[1.9]

            prose-p:my-5
            prose-p:first:mt-0
            prose-p:last:mb-0

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

              // Model-driven highlights via <mark> tags
              mark: ({ children }) => (
                <mark className="bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded-md not-prose">
                  {children}
                </mark>
              ),

              p: ({ children }) => {
                paragraphIndex++;
                const text = extractText(children);
                const isLast = paragraphIndex === totalParagraphs;

                // "Small experiment" section label
                if (text.startsWith("**Try this:**") || text.startsWith("Try this:")) {
                  return (
                    <p className="text-xs uppercase tracking-wide text-indigo-400 mt-6 mb-2 not-prose">
                      Small experiment
                    </p>
                  );
                }

                // "Continue exploring" label
                if (text.startsWith("Continue exploring")) {
                  return (
                    <p className="text-xs uppercase tracking-wide text-neutral-500 mt-6 mb-2 not-prose">
                      Continue exploring
                    </p>
                  );
                }

                // Only highlight the LAST paragraph if it's a question
                if (isLast && text.includes("?")) {
                  return (
                    <p className="text-indigo-300 font-medium">{children}</p>
                  );
                }

                return <p>{children}</p>;
              },

              ul: ({ children, ...props }) => {
                // Detect experiment list by checking preceding sibling context
                // via the parent node — use a data attribute set by the p renderer
                return (
                  <ul className="space-y-2 list-disc pl-5 my-4 text-neutral-200" {...props}>
                    {children}
                  </ul>
                );
              },

              // Style experiment block if it follows a "Try this:" label
              li: ({ children }) => (
                <li className="text-neutral-200">{children}</li>
              ),
            }}
          >
            {msg.content || ""}
          </ReactMarkdown>
        </div>

        {/* Typing indicator — outside prose to avoid layout shift */}
        {isTyping && (
          <div className="flex items-center gap-2 text-neutral-400 text-sm mt-3">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Nexra is thinking through your idea…
          </div>
        )}

      </div>
    </div>
  );
}