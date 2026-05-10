"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";


const PAIN_POINTS = [
  "I just need more users to validate this.",
  "My friends said they'd pay for it.",
  "I'll figure out monetization later.",
  "One more feature and it'll be ready.",
];

const FALLBACK_COLORS = ["#3d3d3d", "#4a4a4a", "#555555", "#3a3a3a"];
const SPOTS_LEFT = 8;

// framer-motion Variants typing can be strict about function-based variants — use any here
const fadeUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const strikeVariant: any = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const data = useQuery(api.waitlist.getWaitlistSocialProof);

  const MAX_VISIBLE = 4;
  const avatars = data?.avatars?.slice(0, MAX_VISIBLE) ?? [];
  const remaining = data ? Math.max(0, data.count - MAX_VISIBLE) : 0;
  const showFallbackDots = !data;

  return (
    <div
      className={`relative min-h-screen bg-neutral-950 overflow-hidden flex flex-col justify-center`}
    >
      {/* Subtle radial gradient — top right */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-zinc-800/30 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-zinc-900/60 blur-[100px]" />
      </div>

      {/* Thin vertical rule — editorial feel */}
      <div className="pointer-events-none absolute left-[calc(61%-1px)] top-0 bottom-0 w-px bg-zinc-800/40 hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-24 lg:py-0 lg:min-h-[calc(100vh-65px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-16 lg:gap-20 w-full items-center">
          {/* ── LEFT ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-3 py-12 px-4 "
            >
              <div className="h-px w-6 bg-zinc-600" />
              <span
                className="text-[11px] tracking-[0.18em] uppercase  text-zinc-500"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                For founders building alone
              </span>
            </motion.div>

            {/* Big question */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              
              style={{
  fontSize: "clamp(40px, 5vw, 68px)",
}}
className="text-[#e8e6e1] leading-[1.04] tracking-[-0.04em] mb-6 font-semibold"
            >
              When did someone
              <br />
              last tell you your
              <br />
              <span className="italic text-zinc-500">idea might be wrong?</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-zinc-400 text-[16px] leading-[1.8] max-w-md mb-10 font-light"
            >
             {" "}
              <span className="text-[#e8e6e1]">
                You don't have a co-founder to push back. Nexra does.
              </span>
            </motion.p>

            {/* CTA */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Link
                href="/thinking-engine-v2.0"
                className="group inline-flex items-center gap-2.5 bg-[#e8e6e1] text-[#0a0a0a] text-[13px] font-medium px-6 py-3 rounded-lg hover:bg-white active:scale-[0.98] transition-all duration-150 no-underline"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Start thinking
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                >
                  <path
                    d="M2.5 6.5h8M7 3.5l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <div
                className="flex items-center gap-2 text-[12px] text-zinc-500"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span className="text-[#e8e6e1] font-medium">$9/mo</span>
<span className="text-zinc-700">·</span>
<span className="text-zinc-500">5 sessions free</span>
              </div>
            </motion.div>

            

            {/* Social proof */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-4 pt-6 border-t border-white/[0.06]"
            >
              <div className="flex shrink-0">
                {showFallbackDots ? (
                  FALLBACK_COLORS.map((bg, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-neutral-950"
                      style={{
                        marginLeft: i === 0 ? 0 : "-6px",
                        background: bg,
                      }}
                    />
                  ))
                ) : (
                  <>
                    {avatars.map((user, i) => (
                      <img
                        key={i}
                        src={user.avatar}
                        alt=""
                        className="w-6 h-6 rounded-full border-2 border-neutral-950 object-cover"
                        style={{ marginLeft: i === 0 ? 0 : "-6px" }}
                      />
                    ))}
                    {remaining > 0 && (
                      <div
                        className="w-6 h-6 rounded-full border-2 border-neutral-950 bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400"
                        style={{
                          marginLeft: "-6px",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        +{remaining}
                      </div>
                    )}
                  </>
                )}
              </div>
              <p
                className="text-[11px] text-zinc-500 leading-snug m-0"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Trusted by {data?.count ?? "32"}+ solo founders
                <br />
                building in public
              </p>
            </motion.div>

            {/* Bottom re-conversion CTA — catches scrollers */}
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2.6, duration: 0.6 }}
  className="absolute bottom-1 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3"
>
  <p className="text-[11px] text-zinc-600 tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
    Still thinking?
  </p>
  <Link
    href="/thinking-engine-v2.0"
    className="text-[12px] text-zinc-400 hover:text-[#e8e6e1] underline underline-offset-4 transition-colors duration-150"
    style={{ fontFamily: "var(--font-mono)" }}
  >
    Try 5 sessions free →
  </Link>
</motion.div>
          </div>
          

          {/* ── RIGHT — Pain list ── */}
          <div className="block mt-12 lg:mt-0">
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <p
                className="text-[11px] tracking-[0.16em] uppercase text-zinc-600 mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Things founders tell themselves
              </p>

              <div className="flex flex-col gap-4">
                {PAIN_POINTS.map((point, i) => (
                  <motion.div
                    key={i}
                    custom={i + 3}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="relative flex items-start gap-4 group"
                  >
                    {/* Index */}
                    <span
                      className="text-[11px] text-zinc-700 mt-1 shrink-0 w-4"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Text + strikethrough */}
                    <div className="relative">
                      <span
                        className="text-zinc-400 text-[15px] leading-relaxed"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontWeight: 300,
                        }}
                      >
                        {point}
                      </span>

                      {/* Animated strikethrough */}
                      <motion.div
                        className="absolute left-0 right-0 top-[52%] h-px bg-zinc-500 origin-left"
                        initial="hidden"
                        animate="visible"
                        variants={strikeVariant}
                        transition={{
                          delay: 1.2 + i * 0.15,
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Closer line */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="mt-8 text-[13px] text-zinc-500 leading-relaxed border-l-2 border-zinc-700 pl-4"
                style={{ fontFamily: "var(--font-mono)", fontWeight: 300 }}
              >
                Nexra is the voice that stops you
                <br />
                <span className="text-[#e8e6e1]">
                  before you convince yourself.
                </span>
              </motion.p>
            </motion.div>
          </div>
          
        </div>
      
      </div>
    </div>
  );
}

// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Zap } from "lucide-react";

// const STAGGER = 0.08;

// const fadeUp = (delay: number) => ({
//   initial: { opacity: 0, y: 24 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
// });

// const BLIND_SPOTS = [
//   "your assumptions",
//   "your market",
//   "your moat",
//   "your pricing",
//   "your timing",
//   "your narrative",
// ];

// export default function NexraHero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });
//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen bg-zinc-950 overflow-hidden flex flex-col"
//     >
//       {/* Grid overlay — structural, not decorative */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.035]"
//         style={{
//           backgroundImage:
//             "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
//           backgroundSize: "80px 80px",
//         }}
//       />

//       {/* Noise grain */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.025]"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
//         }}
//       />

//       {/* Top rule */}
//       <motion.div
//         className="w-full h-px bg-zinc-800"
//         initial={{ scaleX: 0, originX: 0 }}
//         animate={{ scaleX: 1 }}
//         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
//       />

//       {/* Nav strip */}
//       <div className="flex items-center justify-between px-8 md:px-16 py-5 border-b border-zinc-800/50">
//         <motion.span
//           className="text-white font-semibold tracking-tight text-sm"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4, delay: 0.1 }}
//         >
//           Nexra
//         </motion.span>
//         <motion.div
//           className="flex items-center gap-6 text-zinc-500 text-xs"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4, delay: 0.15 }}
//         >
//           <span className="hidden md:block">For solo founders</span>
//           <span className="flex items-center gap-1.5">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//             Early access — $9/mo
//           </span>
//         </motion.div>
//       </div>

//       {/* Main content */}
//       <motion.div
//         style={{ y, opacity }}
//         className="flex-1 flex flex-col justify-center px-8 md:px-16 pt-16 pb-24"
//       >
//         {/* Label */}
//         <motion.div {...fadeUp(0.1)} className="mb-10">
//           <Badge
//             variant="outline"
//             className="border-zinc-700 text-zinc-400 bg-transparent text-[11px] tracking-widest uppercase rounded-sm px-3 py-1"
//           >
//             <Zap className="w-3 h-3 mr-1.5 text-amber-400" />
//             AI co-founder for solopreneurs
//           </Badge>
//         </motion.div>

//         {/* Headline */}
//         <div className="max-w-5xl space-y-1 mb-10">
//           <motion.h1
//             {...fadeUp(0.2)}
//             className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95]"
//           >
//             Stop building
//           </motion.h1>
//           <motion.h1
//             {...fadeUp(0.2 + STAGGER)}
//             className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
//           >
//             <span className="text-zinc-600">the wrong</span>
//             <span className="text-white"> thing.</span>
//           </motion.h1>
//         </div>

//         {/* Rotating blind spots line */}
//         <motion.div
//           {...fadeUp(0.2 + STAGGER * 3)}
//           className="flex items-center gap-3 mb-14"
//         >
//           <span className="text-zinc-500 text-base md:text-lg">
//             Nexra challenges
//           </span>
//           <div className="relative h-7 overflow-hidden">
//             <motion.div
//               animate={{ y: ["0%", "-100%", "-200%", "-300%", "-400%", "-500%", "0%"] }}
//               transition={{
//                 duration: 7,
//                 ease: "easeInOut",
//                 repeat: Infinity,
//                 repeatType: "loop",
//                 times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
//               }}
//               className="flex flex-col"
//             >
//               {BLIND_SPOTS.map((s) => (
//                 <span
//                   key={s}
//                   className="h-7 flex items-center text-base md:text-lg font-semibold text-amber-400 whitespace-nowrap"
//                 >
//                   {s}
//                 </span>
//               ))}
//             </motion.div>
//           </div>
//           <span className="text-zinc-500 text-base md:text-lg">
//             — before the market does.
//           </span>
//         </motion.div>

//         {/* Description + CTA */}
//         <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20">
//           <motion.p
//             {...fadeUp(0.2 + STAGGER * 4)}
//             className="max-w-sm text-zinc-400 text-[15px] leading-relaxed"
//           >
//             Not a chatbot. Not a rubber duck. Nexra stress-tests your startup
//             idea, surfaces the questions you're afraid to ask, and tells you
//             what advisors won't.
//           </motion.p>

//           <motion.div
//             {...fadeUp(0.2 + STAGGER * 5)}
//             className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
//           >
//             <Button
//               size="lg"
//               className="bg-white text-zinc-950 hover:bg-zinc-100 rounded-sm font-semibold text-sm px-7 h-11 group transition-all duration-200"
//             >
//               Get early access
//               <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//             </Button>
//             <span className="text-zinc-600 text-xs">
//               1–10 spots at $9/mo · No credit card required
//             </span>
//           </motion.div>
//         </div>

//         {/* Bottom divider + meta row */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.7 }}
//           className="mt-20 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
//         >
//           <div className="flex items-center gap-8">
//             {[
//               ["Idea stress-test", "Challenge mode"],
//               ["Blind spot engine", "Pattern memory"],
//               ["URL analyzer", "Founder history"],
//             ].map(([label, sub]) => (
//               <div key={label} className="hidden md:block">
//                 <p className="text-white text-xs font-medium">{label}</p>
//                 <p className="text-zinc-600 text-[11px] mt-0.5">{sub}</p>
//               </div>
//             ))}
//           </div>
//           <p className="text-zinc-700 text-[11px] tracking-wide">
//             Built solo · Shipping in public · India
//           </p>
//         </motion.div>
//       </motion.div>

//       {/* Side label — rotated */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1, duration: 0.5 }}
//         className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-2 -rotate-90 origin-right"
//       >
//         <span className="w-8 h-px bg-zinc-700" />
//         <span className="text-zinc-700 text-[10px] tracking-[0.2em] uppercase">
//           nexralab.com
//         </span>
//       </motion.div>
//     </section>
//   );
// }
