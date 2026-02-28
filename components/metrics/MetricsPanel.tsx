"use client";

import NexraModeToggle from "./NexraModeToggle";
import VerdictCard from "./VerdictCard";
import { useNexraStore,  } from "@/lib/nexraStore";
import { Assumption, RuleBreakdownItem } from "@/lib/api/ideas";


function nexraSummary(m: any) {
  if (m.verdict === "PROCEED")
    return "Directionally sound. Execution discipline will decide the outcome.";

  if (m.verdict === "PIVOT")
    return "Potential exists, but a core assumption needs revision.";

  return "Structurally weak. Continuing without new evidence is not recommended.";
}

// Simple heuristic to convert reasons → visual strength
function strengthFromReasons(reasons: string[]) {
  if (!reasons || reasons.length === 0) return 3;
  if (reasons.some((r) => r.toLowerCase().includes("no clear"))) return 1;
  return Math.max(1, Math.min(5, 5 - reasons.length));
}

// V2 signal strength heuristic
function strengthFromBreakdown(b: RuleBreakdownItem): number {
  if (b.blocking_failure) return 1;
  if (b.penalties.length >= 2) return 2;
  if (b.penalties.length === 1) return 3;
  if (b.signals.length >= 2) return 5;
  return 4;
}

export default function MetricsPanel() {
  const metrics = useNexraStore((s) => s.metrics);

  if (!metrics) {
    return <p className="text-xs text-neutral-500">No analysis yet.</p>;
  }

  const m = metrics;
  const summary = nexraSummary(m);



 const highRiskAssumptions = (m.assumptions ?? []).filter(
    (a: Assumption) =>
      a.risk_level === "high" || a.risk_level === "critical"
  );

  return (
    <div className="backdrop-blur shadow-xl space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-neutral-300 tracking-wide">
          Decision Analysis
        </p>
        <span className="text-[10px] px-2 py-1 bg-neutral-900 border border-neutral-700 rounded text-neutral-400">
          Nexra v2 • Decision Engine
        </span>
      </div>

      {/* Verdict */}
      <div className="space-y-2">
        <VerdictCard verdict={m.verdict} />
        <p className="text-xs text-neutral-400 italic">
          “{summary}”
        </p>
      </div>

      <div className="border-t border-neutral-800" />

      {/* Score + Confidence */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-300">
            Decision Score
          </p>
          <NexraModeToggle />
          <p className="text-xs text-neutral-400">
            Confidence: {m.confidence}%
          </p>
        </div>

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
            {m.decision_score}%
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800" />


     {/* Weakest Link */}
{m.weakest_link ? (
  <div className="border border-red-900/40 bg-red-950/30 rounded-lg p-3">
    <p className="text-xs font-semibold text-red-400 mb-1">
      Primary Risk
    </p>
    <p className="text-sm text-neutral-200">
      {m.weakest_link?.summary ?? "No dominant structural weakness detected."}
    </p>
    <p className="text-[11px] text-neutral-400 mt-1">
      {m.weakest_link.impact}
    </p>
  </div>
) : (
  <div className="border border-neutral-800 bg-neutral-900/40 rounded-lg p-3">
    <p className="text-xs text-neutral-500">
      No dominant structural weakness detected.
    </p>
  </div>
)}

      <div className="border-t border-neutral-800" />

      {/* Assumption Risk */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-300">
          Assumption Risk
        </p>

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-6 rounded-sm ${
                i < highRiskAssumptions.length
                  ? "bg-red-500"
                  : "bg-neutral-800"
              }`}
            />
          ))}
        </div>

        <p className="text-[10px] text-neutral-500">
          {highRiskAssumptions.length} high-risk assumptions detected
        </p>
      </div>

      <div className="border-t border-neutral-800" />

      {/* Signal Strength (V2) */}
{/* Signal Strength (V2) */}
{/* Signal Strength (V2) */}
<div className="space-y-3">
  <p className="text-sm font-medium text-neutral-300">
    Signal Strength
  </p>

  {m.breakdown && Object.keys(m.breakdown).length > 0 ? (
    <div className="space-y-3">
      {Object.entries(m.breakdown).map(([key, breakdownItem]) => {
        const strength = strengthFromBreakdown(breakdownItem);

        return (
          <div key={key} className="flex items-center gap-3">
            <span className="w-24 text-xs capitalize text-neutral-400">
              {key.replace("_", " ")}
            </span>

            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-4 rounded-sm ${
                    i < strength
                      ? "bg-yellow-400"
                      : "bg-neutral-800"
                  }`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-xs text-neutral-500">
      No signal data available for this analysis.
    </p>
  )}
</div>



      {/* Footer */}
      <div className="pt-3">
        <p className="text-[10px] text-neutral-600">
          Nexra v2 visualizes structural risk. Detailed reasoning lives in the analysis.
        </p>
      </div>

    </div>
  );
}
