import { Message } from "./ChatPanel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMark from "remark-mark"; 
import rehypeRaw from "rehype-raw";

let isExperimentList = false;

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;

  if (Array.isArray(children)) {
    return children.map((c) => (typeof c === "string" ? c : "")).join("");
  }

  return "";
}

/* ================= THINKING HIGHLIGHTS ================= */
function highlightThinking(text: string) {
  const patterns = [
    /I’m not sure[^.?!]*[.?!]/gi,
    /What worries me[^.?!]*[.?!]/gi,
    /Where I get stuck[^.?!]*[.?!]/gi,
    /I’m trying to see[^.?!]*[.?!]/gi,
    /I might be wrong[^.?!]*[.?!]/gi,
    /I’m not convinced[^.?!]*[.?!]/gi,
    /This is where it feels fragile[^.?!]*[.?!]/gi,
    /Something here feels[^.?!]*[.?!]/gi,
    /The fragile part[^.?!]*[.?!]/gi,
    /The risk here[^.?!]*[.?!]/gi,
/This raises something interesting[^.?!]*[.?!]/gi,
  ];

  let processed = text;

  patterns.forEach((pattern) => {
    processed = processed.replace(
      pattern,
      (match) =>
        `<mark class="bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded-md">${match}</mark>`
    );
  });

  return processed;
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
            N
          </div>

          <p className="text-xs text-neutral-400">
            Nexra · Thinking Partner
          </p>
        </div>

        {/* Message Content */}
        <div
          className="
            prose
            prose-invert
            max-w-none
            text-[16px]
            leading-[1.9]

            prose-p:my-6
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
    mark: ({ children }) => (
      <mark className="bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded-md">
        {children}
      </mark>
    ),

    p: ({ children }) => {
      const text = extractText(children);

      if (text.startsWith("A small test")) {
        isExperimentList = true;

        return (
          <p className="text-xs uppercase tracking-wide text-indigo-400 mt-6 mb-2">
            Small experiment
          </p>
        );
      }

      if (text.startsWith("Continue exploring")) {
        return (
          <p className="text-xs uppercase tracking-wide text-neutral-500 mt-6 mb-2">
            Continue exploring
          </p>
        );
      }

      if (text.includes("?")) {
        return (
          <p className="text-indigo-300 font-medium">
            {children}
          </p>
        );
      }

      return <p>{children}</p>;
    },

    ul: ({ children }) => {
      if (isExperimentList) {
        isExperimentList = false;

        return (
          <div className="border border-indigo-500/20 bg-indigo-500/5 rounded-lg p-4 my-3">
            <ul className="space-y-2 list-disc pl-5 text-neutral-200">
              {children}
            </ul>
          </div>
        );
      }

      return (
        <ul className="space-y-2 list-disc pl-5 my-4 text-neutral-200">
          {children}
        </ul>
      );
    },
  }}
>
  {highlightThinking(msg.content || "")}
</ReactMarkdown>
          {/* Thinking indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-neutral-400 text-sm mt-3">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              Nexra is thinking
            </div>
          )}
        </div>
      </div>
    </div>
  );
}