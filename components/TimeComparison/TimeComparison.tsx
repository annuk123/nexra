"use client"

import { motion } from "framer-motion"

export function TimeComparison() {
  return (
    <section className="py-24">
      <h2 className="text-3xl sm:text-4xl font-semibold max-w-3xl">
        Most founders waste months before realizing their idea was wrong.
      </h2>

      <p className="mt-4 text-neutral-400 max-w-2xl">
        Nexra helps you decide in minutes, not months.
      </p>

      <div className="mt-10 space-y-8 border border-neutral-800 rounded-xl p-6 bg-neutral-900/40">

        {/* Without Nexra */}
        <div>
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span>Without Nexra</span>
            <span>~3 months wasted</span>
          </div>

          <div className="mt-2 h-2 bg-red-500/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100%", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full bg-red-500/60 rounded-full"
            />
          </div>
        </div>

        {/* With Nexra */}
        <div>
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span>With Nexra</span>
            <span>~5 minutes clarity</span>
          </div>

          <div className="mt-2 h-2 bg-emerald-500/10 rounded-full overflow-hidden relative">
            {/* subtle glow */}
            <div className="absolute inset-0 blur-xl bg-emerald-500/10" />

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "8%", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full bg-emerald-500/70 rounded-full"
            />
          </div>
        </div>

      </div>

      <p className="mt-6 text-sm text-neutral-400 max-w-xl">
        Most founders optimize code. Nexra helps you optimize decisions.
      </p>
    </section>
  )
}
