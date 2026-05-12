// import { Message } from "./ChatPanel";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
// import { useMemo } from "react";
// import Image from "next/image";

// /* ================= TEXT HELPERS ================= */

// function extractText(children: React.ReactNode): string {
//   if (typeof children === "string") return children;
//   if (Array.isArray(children)) {
//     return children.map((c) => (typeof c === "string" ? c : "")).join("");
//   }
//   return "";
// }

// /* ================= LAST QUESTION DETECTOR ================= */

// // Counts total paragraph nodes to identify the final one
// function countParagraphs(content: string): number {
//   return (content.match(/\n\n|\n(?=[A-Z])/g) || []).length + 1;
// }

// /* ================= COMPONENT ================= */

// export default function ChatMessage({
//   msg,
//   isTyping,
// }: {
//   msg: Message;
//   isTyping?: boolean;
// }) {
//   const isUser = msg.role === "user";

//   // Track paragraph index during render
//   let paragraphIndex = 0;

//   const totalParagraphs = useMemo(
//     () => countParagraphs(msg.content || ""),
//     [msg.content]
//   );

//   /* ================= USER MESSAGE ================= */

//   if (isUser) {
//     return (
//       <div className="flex justify-end px-6 py-4">
//         <div className="max-w-md space-y-1 text-right">
//           <p className="text-xs text-neutral-500">You</p>
//           <div className="px-4 py-3 rounded-2xl rounded-br-none bg-emerald-900/30 text-emerald-300 text-sm leading-relaxed whitespace-pre-wrap">
//             {msg.content}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ================= NEXRA MESSAGE ================= */

//   return (
//     <div className="px-6 py-6">
//       <div className="max-w-2xl mx-auto">

//         {/* Nexra Identity */}
//         <div className="flex items-center gap-2 mb-3">
//           <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 text-xs font-semibold">
//             <Image
//               src="/nexra.png"
//               alt="Nexra"
//               width={28}
//               height={28}
//               className="h-6 w-6"
//             />
//           </div>
//           <p className="text-xs text-neutral-400">Nexra · Thinking Partner</p>
//         </div>

//         {/* Message Content */}
//         <div
//           className="
//             prose
//             prose-invert
//             max-w-none
//             text-[15px]
//             leading-[1.9]

//             prose-p:my-5
//             prose-p:first:mt-0
//             prose-p:last:mb-0

//             prose-strong:text-white
//             prose-strong:font-semibold
//             prose-strong:bg-emerald-500/10
//             prose-strong:px-1
//             prose-strong:rounded

//             prose-ul:my-6
//             prose-li:my-3

//             prose-blockquote:border-l-emerald-500
//             prose-blockquote:bg-emerald-500/5
//             prose-blockquote:px-4
//             prose-blockquote:py-2
//             prose-blockquote:rounded-md
//           "
//         >
//           <ReactMarkdown
//             remarkPlugins={[remarkGfm]}
//             rehypePlugins={[rehypeRaw]}
//             components={{

//               // Model-driven highlights via <mark> tags
//               mark: ({ children }) => (
//                 <mark className="bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded-md not-prose">
//                   {children}
//                 </mark>
//               ),

//               p: ({ children }) => {
//                 paragraphIndex++;
//                 const text = extractText(children);
//                 const isLast = paragraphIndex === totalParagraphs;

//                 // "Small experiment" section label
//                 if (text.startsWith("**Try this:**") || text.startsWith("Try this:")) {
//                   return (
//                     <p className="text-xs uppercase tracking-wide text-indigo-400 mt-6 mb-2 not-prose">
//                       Small experiment
//                     </p>
//                   );
//                 }

//                 // "Continue exploring" label
//                 if (text.startsWith("Continue exploring")) {
//                   return (
//                     <p className="text-xs uppercase tracking-wide text-neutral-500 mt-6 mb-2 not-prose">
//                       Continue exploring
//                     </p>
//                   );
//                 }

//                 // Only highlight the LAST paragraph if it's a question
//                 if (isLast && text.includes("?")) {
//                   return (
//                     <p className="text-indigo-300 font-medium">{children}</p>
//                   );
//                 }

//                 return <p>{children}</p>;
//               },

//               ul: ({ children, ...props }) => {
//                 // Detect experiment list by checking preceding sibling context
//                 // via the parent node — use a data attribute set by the p renderer
//                 return (
//                   <ul className="space-y-2 list-disc pl-5 my-4 text-neutral-200" {...props}>
//                     {children}
//                   </ul>
//                 );
//               },

//               // Style experiment block if it follows a "Try this:" label
//               li: ({ children }) => (
//                 <li className="text-neutral-200">{children}</li>
//               ),
//             }}
//           >
//             {msg.content || ""}
//           </ReactMarkdown>
//         </div>

//         {/* Typing indicator — outside prose to avoid layout shift */}
//         {isTyping && (
//           <div className="flex items-center gap-2 text-neutral-400 text-sm mt-3">
//             <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
//             Nexra is thinking through your idea…
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }



import { Message } from "./ChatPanel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ================= TEXT HELPERS ================= */

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;

  if (Array.isArray(children)) {
    return children.map((c) => (typeof c === "string" ? c : "")).join("");
  }

  return "";
}

/* ================= PARAGRAPH DETECTOR ================= */

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

  let paragraphIndex = 0;

  const totalParagraphs = useMemo(
    () => countParagraphs(msg.content || ""),
    [msg.content]
  );

  /* ================= USER MESSAGE ================= */

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex justify-end px-5 py-4"
      >
        <div className="max-w-[640px]">
          <div
            className="
              rounded-[24px]
              rounded-br-md
              border
              border-white/8
              bg-white/[0.045]
              px-5
              py-4
              text-[15px]
              leading-7
              text-neutral-100
              shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
              backdrop-blur-sm
            "
          >
            {msg.content}
          </div>
        </div>
      </motion.div>
    );
  }

  /* ================= NEXRA MESSAGE ================= */

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="px-5 py-5"
    >
      <div className="max-w-3xl mx-auto">

        {/* Identity */}

        <div className="flex items-center gap-3 mb-5">
          <div
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-emerald-500/10
              bg-emerald-500/5
            "
          >
            <Image
              src="/nexra.png"
              alt="Nexra"
              width={30}
              height={30}
              className="h-7 w-7"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

            <p className="text-sm text-neutral-400 tracking-[-0.02em]">
              Nexra is thinking with you
            </p>
          </div>
        </div>

        {/* Assistant Container */}

        <div
          className="
            rounded-[30px]
            border
            border-white/6
            bg-white/[0.03]
            px-7
            py-6
            shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
            backdrop-blur-xl
            transition-all
            duration-300
          "
        >
          <div
            className="
              prose
              prose-invert
              max-w-none

              text-[15px]
              leading-8
              text-neutral-200

              prose-p:my-5
              prose-p:text-neutral-200

              prose-strong:text-white
              prose-strong:font-semibold

              prose-headings:text-white

              prose-ul:my-5
              prose-ul:pl-5

              prose-li:my-2
              prose-li:text-neutral-200

              prose-a:text-emerald-300
              prose-a:no-underline

              prose-blockquote:border-l
              prose-blockquote:border-emerald-500/20
              prose-blockquote:bg-white/[0.03]
              prose-blockquote:px-4
              prose-blockquote:py-1
              prose-blockquote:rounded-r-xl
              prose-blockquote:text-neutral-300

              prose-code:text-emerald-300
              prose-code:bg-white/[0.04]
              prose-code:px-1.5
              prose-code:py-0.5
              prose-code:rounded-md
              prose-code:before:content-['']
              prose-code:after:content-['']
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                mark: ({ children }) => (
                  <mark
                    className="
                      rounded-md
                      bg-emerald-500/10
                      px-1.5
                      py-0.5
                      text-emerald-200
                    "
                  >
                    {children}
                  </mark>
                ),

                p: ({ children }) => {
                  paragraphIndex++;

                  const text = extractText(children);

                  const isLast = paragraphIndex === totalParagraphs;

                  /* Small experiment */

                  if (
                    text.startsWith("**Try this:**") ||
                    text.startsWith("Try this:")
                  ) {
                    return (
                      <div className="mt-8 mb-3">
                        <p
                          className="
                            text-[11px]
                            uppercase
                            tracking-[0.2em]
                            text-indigo-400
                          "
                        >
                          Small experiment
                        </p>
                      </div>
                    );
                  }

                  /* Continue exploring */

                  if (text.startsWith("Continue exploring")) {
                    return (
                      <div className="mt-8 mb-3">
                        <p
                          className="
                            text-[11px]
                            uppercase
                            tracking-[0.2em]
                            text-neutral-500
                          "
                        >
                          Continue exploring
                        </p>
                      </div>
                    );
                  }

                  /* Final reflective question */

                  if (isLast && text.includes("?")) {
                    return (
                      <div
                        className="
                          mt-8
                          border-l
                          border-indigo-500/30
                          pl-5
                        "
                      >
                        <p className="text-indigo-200 font-medium leading-8">
                          {children}
                        </p>
                      </div>
                    );
                  }

                  return <p>{children}</p>;
                },

                ul: ({ children, ...props }) => (
                  <ul
                    className="
                      my-5
                      space-y-2
                      text-neutral-200
                    "
                    {...props}
                  >
                    {children}
                  </ul>
                ),

                li: ({ children }) => (
                  <li className="leading-7">
                    {children}
                  </li>
                ),
              }}
            >
              {msg.content || ""}
            </ReactMarkdown>
          </div>
        </div>

        {/* Typing State */}

        {isTyping && (
          <div className="mt-4 flex items-center gap-3 px-2">
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" />
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce delay-100" />
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce delay-200" />
            </div>

            <p className="text-sm text-neutral-500">
              Nexra is thinking through your situation...
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}