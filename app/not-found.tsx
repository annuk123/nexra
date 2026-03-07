"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center px-6 overflow-hidden ">

      {/* Background glow */}
      <div className="absolute w-175 h-175 bg-emerald-500/10 blur-[160px] rounded-full -top-40 -left-40" />
      <div className="absolute w-150 h-150 bg-teal-500/10 blur-[140px] rounded-full bottom-0 right-0" />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="relative max-w-2xl w-full">

        {/* System header */}
        <p className="text-xs text-neutral-600 mb-4 tracking-widest mt-8">
          NEXRA • THINKING ENGINE
        </p>

        {/* Glass container */}
        <div className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 space-y-7 shadow-xl">

          {/* Thinking indicator */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:120ms]" />
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:240ms]" />
            </div>

            <p className="text-neutral-400 text-sm">
              Nexra is analyzing the path you attempted to reach...
            </p>
          </div>

          {/* Observation */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
              Observation
            </p>

            <p className="text-neutral-200 text-lg">
              The requested route does not exist.
            </p>
          </div>

          {/* Possible causes */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
              Possible causes
            </p>

            <ul className="space-y-2 text-neutral-400 text-sm">
              <li>• The page may have been removed</li>
              <li>• The route may have been renamed</li>
              <li>• The link you followed might be incorrect</li>
            </ul>
          </div>

          {/* Recommendation */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
              Recommendation
            </p>

            <p className="text-neutral-300 text-sm leading-relaxed">
              Not every direction leads somewhere useful.  
              Choose a valid path and continue building.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-3 flex-wrap">

            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm transition"
            >
              Return home
            </Link>

            <Link
              href="/thinking-engine-v2.0"
              className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-sm transition"
            >
              Analyze a startup idea
            </Link>

          </div>

          {/* system code */}
          <p className="text-xs text-neutral-600 pt-4">
            system_code: 404 • route_not_found
          </p>

        </div>

      </div>
    </div>
  );
}