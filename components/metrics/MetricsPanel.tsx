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
        <p className="text-sm font-medium text-neutral-300 tracking-wide">Decision Analysis</p>
        <span className="text-[10px] px-2 py-1 bg-neutral-900 border border-neutral-700 rounded text-neutral-400">
          Nexra v1 • Hybrid Brain
        </span>
      </div>
      <div className="border border-t-0 border-gray-900 p-0" />

      {/* Verdict */}
      <VerdictCard verdict={m.verdict} />

      {/* Nexra Personality Summary */}
      <p className="text-xs text-neutral-400 italic">
        “{summary}”
      </p>

      <div className="border border-t-0 border-gray-900 p-0" />

      {/* Score */}
      <div className="flex items-center gap-4">
       
<div className="flex items-center justify-between w-full">

  {/* Left text block */}
  <div className="space-y-1">
    <p className="text-sm font-medium text-neutral-300">Decision Score</p>
    <NexraModeToggle />
    <p className="text-sm font-medium text-neutral-300 mt-8">Confidence: {m.confidence}%</p>
  </div>

  {/* Right Score Circle */}

<div className="relative w-20 h-20">
  <svg width="80" height="80" className="-rotate-90">
    <circle cx="40" cy="40" r="34" stroke="#262626" strokeWidth="4" fill="none" />
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

      <div className="border border-t-0 border-gray-900 p-0" />

      {/* Key Signals */}
      <p className="text-xs uppercase tracking-wide text-neutral-500">
        Key Signals
      </p>

      {m.breakdown && (
        <div className="space-y-3">
          <ScoreBar label="Market Urgency" value={m.breakdown.market ?? 0} max={10} />
          <ScoreBar label="Execution Strength" value={m.breakdown.execution ?? 0} max={10} />
          <ScoreBar label="Founder Leverage" value={m.breakdown.founder_fit ?? 0} max={10} />
          <ScoreBar label="Moat Strength" value={m.breakdown.moat ?? 0} max={10} />
          <ScoreBar label="Revenue Clarity" value={m.breakdown.revenue ?? 0} max={10} />
        </div>
      )}

      <div className="border border-t-0 border-gray-900 p-0" />

      {/* Next Steps */}
      <div>
        <p className="text-sm text-neutral-400 mb-2">Next Steps</p>
        <ul className="list-decimal ml-4 text-xs text-neutral-300 space-y-1">
          {m.roadmap.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>

      {/* Footer Personality */}
      <div>
      <p className="text-[10px] text-neutral-600">
        Nexra combines heuristics + AI. I challenge assumptions, not founders.
      </p>
            <p className="text-[10px] text-neutral-600">
        Nexra V1 uses hybrid anallysis. Full analysis coming soon.
      </p>
      </div>
    </div>
  );
}
