"use client";

import { useEffect, useState } from "react";
import { getDecisions } from "@/lib/nexraLocalStore";

export default function DecisionHistory() {
  const [decisions, setDecisions] = useState<any[]>([]);

  useEffect(() => {
    setDecisions(getDecisions());
  }, []);

  if (!decisions.length) return null;

  return (
    <div className="space-y-3 text-xs">
      <p className="text-neutral-500">Past Nexra Decisions</p>

      {decisions.map((d) => (
        <div key={d.id} className="p-3 bg-neutral-900 border border-neutral-800 rounded">
          <p className="text-neutral-300">{d.ideaText}</p>
          <p className="text-neutral-500">
            Verdict: {d.metrics.verdict} • Score: {d.metrics.decision_score}
          </p>
        </div>
      ))}
    </div>
  );
}
