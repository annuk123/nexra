"use client";

import { useEffect } from "react";
import NexraModeToggle from "./NexraModeToggle";
import ScoreBar from "./ScoreBar";
import VerdictCard from "./VerdictCard";
import { useNexraStore } from "@/lib/nexraStore";

function nexraSummary(m: any) {
  if (m.decision_score >= 70)
    return "This is strong. I'd lean toward building, but validate distribution early.";
  if (m.decision_score >= 40)
    return "This has potential, but the wedge is weak. I'd pivot positioning.";
  return "This is risky. I'd rethink the problem or narrow the market.";
}

export default function MetricsPanel() {
  const metrics = useNexraStore((s) => s.metrics);

  if (!metrics) {
    return <p className="text-xs text-neutral-500">No analysis yet.</p>;
  }

  const m = metrics;
  const summary = nexraSummary(m);


  return (
<div className="backdrop-blur shadow-xl space-y-6">

  {/* Header */}
  <div className="flex justify-between items-center">
    <p className="text-sm font-medium text-neutral-300 tracking-wide">
      Decision Analysis
    </p>
    <span className="text-[10px] px-2 py-1 bg-neutral-900 border border-neutral-700 rounded text-neutral-400">
      Nexra v1 • Hybrid Brain
    </span>
  </div>

  {/* Sticky Verdict + Summary (mobile) */}
  <div className="top-0 z-10 bg-neutral-950 pb-4 space-y-3">
    <VerdictCard verdict={m.verdict} />

    <p className="text-xs text-neutral-400 italic">
      “{summary}”
    </p>
  </div>

  <div className="border-t border-neutral-800" />

  {/* Score Section */}
  <div className="space-y-2">
    <p className="text-sm font-medium text-neutral-300">
      Decision Score
    </p>

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
      
      {/* Left info */}
      <div className="space-y-4">
        <NexraModeToggle />
        <p className="text-sm text-neutral-300">
          Confidence: {m.confidence}%
        </p>
      </div>

      {/* Score Circle */}
      <div className="relative w-20 h-20 mx-auto sm:mx-0">
        <svg width="80" height="80" className="-rotate-90">
          <circle
            cx="40"
            cy="40"
            r="34"
            stroke="#262626"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            stroke="#facc15"
            strokeWidth="4"
            fill="none"
            strokeDasharray={2 * Math.PI * 34}
            strokeDashoffset={(1 - m.decision_score / 100) * 2 * Math.PI * 34}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-yellow-400">
          {m.decision_score}
        </div>
      </div>
    </div>
  </div>

  <div className="border-t border-neutral-800" />

  {/* Key Signals (collapsed on mobile) */}
  {m.breakdown && (
    <details className="space-y-4 lg:open">
      <summary className="text-xs uppercase tracking-wide text-neutral-500 cursor-pointer">
        Key Signals
      </summary>

      <div className="space-y-3">
        <ScoreBar label="Market Urgency" value={m.breakdown.market ?? 0} max={10} />
        <ScoreBar label="Execution Strength" value={m.breakdown.execution ?? 0} max={10} />
        <ScoreBar label="Founder Leverage" value={m.breakdown.founder_fit ?? 0} max={10} />
        <ScoreBar label="Moat Strength" value={m.breakdown.moat ?? 0} max={10} />
        <ScoreBar label="Revenue Clarity" value={m.breakdown.revenue ?? 0} max={10} />
      </div>
    </details>
  )}

  <div className="border-t border-neutral-800" />

  {/* Next Steps (collapsed on mobile) */}
  <details className="space-y-3 lg:open">
    <summary className="text-sm text-neutral-400 cursor-pointer">
      Next Steps
    </summary>

    <ul className="list-decimal ml-4 text-xs text-neutral-300 space-y-1">
      {m.roadmap.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ul>
  </details>

  {/* Footer Personality */}
  <div className="pt-4 space-y-1">
    <p className="text-[10px] text-neutral-600">
      Nexra combines heuristics + AI. I challenge assumptions, not founders.
    </p>
    <p className="text-[10px] text-neutral-600">
      Nexra V1 uses hybrid analysis. Full analysis coming soon.
    </p>
  </div>

</div>

  );
}
