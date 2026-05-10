"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderNote() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32">
      <div className="max-w-2xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="h-px w-6 bg-zinc-600" />
            <span
              className="text-[11px] tracking-[0.18em] uppercase text-zinc-500"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              A note from the founder
            </span>
          </motion.div>

          {/* Body */}
          {[
            "I built three products nobody wanted.",
            "A reminders app. An algo visualizer. A contact manager. Each time, I jumped straight into building — no research, no validation, no one to stop me. I'd get lost halfway through, confused about direction, and eventually quit. The AIs I talked to just agreed with me. I had to remind them about my own startup mid-conversation.",
            "I'm also introverted. Talking to people to validate ideas felt harder than just building. So I built. And cried later.",
            "The hard lesson: building randomly and figuring it out midway isn't hustle — it's expensive confusion. If I'd had something that challenged me before I committed, I'd have saved months.",
            "That's Nexra. I built it for the version of me that was lost and had no one honest enough to say — wait, have you actually thought this through?",
          ].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`leading-[1.85] mb-5 ${
                i === 0
                  ? "text-[#e8e6e1] text-[18px] font-medium"
                  : "text-zinc-400 text-[15px] font-light"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {para}
            </motion.p>
          ))}

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 pt-8 border-t border-white/[0.06] flex items-center gap-4"
          >
<div
  className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center"
>
  <Image
    src="/founder.jpeg"
    alt="Annu"
    width={40}
    height={40}
    className="object-cover w-full h-full"
  />
</div>
            <div>
              <p
                className="text-[12px] text-[#e8e6e1]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Annu
              </p>
              <p
                className="text-[11px] text-zinc-600"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Solo founder, Nexra AI
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}