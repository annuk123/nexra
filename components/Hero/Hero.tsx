"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: HERO_EASE,
  },
});

const founderThoughts = [
  {
    text: "Am I wasting 6 months on this?",
    className: "left-[8%] top-[22%] hidden md:block",
  },
  {
    text: "Should I pivot now?",
    className: "right-[10%] top-[35%] hidden lg:block",
  },
  {
    text: "I can't tell if this is real progress.",
    className: "left-[10%] bottom-[28%] hidden lg:block",
  },
  {
    text: "What if nobody wants this?",
    className: "right-[12%] bottom-[26%] hidden md:block",
  },
];

const trustItems = [
  "Less noise",
  "Clearer thinking",
  "Built for solo founders",
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen overflow-hidden bg-[#050505] px-6">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.035),transparent_65%)] blur-3xl" />
        <div className="absolute left-1/2 top-[10%] h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.03] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.015] [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Floating Founder Thoughts */}
      {founderThoughts.map((thought, index) => (
        <motion.div
          key={thought.text}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay: 1 + index * 0.2, duration: 1 },
            y: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`absolute z-[1] ${thought.className}`}
        >
          <div className="rounded-full border border-white/[0.04] bg-white/[0.015] px-4 py-2 backdrop-blur-sm">
            <p className="text-[13px] tracking-[-0.02em] text-white/14">
              {thought.text}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative py-16 z-10 mx-auto flex w-full max-w-6xl flex-1 items-center justify-center">
        <div className="flex max-w-[860px] flex-col items-center text-center">

          {/* Early Access */}
          <motion.div
            {...fadeUp(0.15)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-[7px] backdrop-blur-md"
          >
            <div className="relative flex h-2 w-2">
              <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <div className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
            </div>
            <span className="text-[12px] font-medium tracking-[-0.02em] text-white/45">
              Early access — first 10 spots at $9/mo
            </span>
          </motion.div>

          {/* Heading — tightened to 2 lines */}
          <div className="relative">
            <motion.h1
              {...fadeUp(0.3)}
              className="max-w-[720px] text-[clamp(44px,7.5vw,84px)] font-semibold leading-[0.95] tracking-[-0.07em] text-white"
            >
              The thinking partner solo founders never had.
            </motion.h1>
            <div className="absolute inset-0 -z-10 bg-white/5 blur-3xl" />
          </div>

          

          {/* Description — rewritten for empathy */}
          <motion.p
            {...fadeUp(0.52)}
            className="mt-6 max-w-[580px] text-[15px] leading-[1.85] tracking-[-0.02em] text-white/38 md:text-[17px]"
          >
            Not a chatbot. Not a coach. Nexra challenges your assumptions,
            surfaces blind spots, and tells you what you need to hear —
            before the market does.
          </motion.p>

          {/* CTA */}
          <motion.div
            {...fadeUp(0.65)}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              size="lg"
              className="group h-12 rounded-xl bg-white px-7 text-[14px] font-semibold tracking-[-0.03em] text-black shadow-[0_0_24px_rgba(255,255,255,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-100 hover:shadow-[0_0_32px_rgba(255,255,255,0.22)]"
            >
              Start thinking
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="h-12 rounded-xl border border-white/[0.08] bg-white/[0.015] px-7 text-[14px] tracking-[-0.03em] text-white/50 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.03] hover:text-white"
            >
              Watch Nexra think
            </Button>
          </motion.div>

          {/* Emotional line — moved up, right after headline */}
          <motion.p
            {...fadeUp(0.42)}
            className="mt-5 text-[14px] tracking-[-0.02em] text-white/35"
          >
            For the nights when your brain won&apos;t stop thinking.
          </motion.p>

          {/* Trust Strip */}
          <motion.div
            {...fadeUp(0.8)}
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
          >
            {trustItems.map((item, index) => (
              <div key={item} className="flex items-center gap-6">
                {index !== 0 && (
                  <div className="hidden h-3 w-px bg-white/[0.08] md:block" />
                )}
                <span className="text-[12px] tracking-[-0.02em] text-white/28">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
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
