// components/metrics/VerdictCard.tsx

const colors: Record<string, string> = {
  KILL: "text-red-400",
  PIVOT: "text-yellow-400",
  VALIDATE: "text-blue-400",
  BUILD: "text-emerald-400",
  MOONSHOT: "text-purple-400",
};

const verdictSummary: Record<string, string> = {
  KILL: "This is high risk. I’d rethink the problem or narrow the market.",
  PIVOT: "There’s potential, but positioning or distribution needs a pivot.",
  VALIDATE: "Promising. Validate demand before committing engineering time.",
  BUILD: "Strong signal. I’d build and test distribution aggressively.",
  MOONSHOT: "Rare signal. This could scale fast if executed correctly.",
};

export default function VerdictCard({ verdict }: { verdict: string }) {
  const color = colors[verdict] || "text-neutral-200";
  const summary =
    verdictSummary[verdict] ||
    "I need more data to give a strong recommendation.";

  return (
    <div className="space-y-1">
      {/* Label */}
      <p className="text-sm text-neutral-400">Verdict</p>

      {/* Verdict Row */}
      <div className="flex items-center gap-2">
        <h2
          className={`text-xl font-semibold ${color} drop-shadow-[0_0_8px_rgba(255,255,255,0.05)]`}
        >
          {verdict}
        </h2>

        {/* Enterprise Badge */}
        <span className="text-[10px] px-2 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-neutral-400">
          Nexra Signal
        </span>
      </div>

      {/* AI Co-founder Commentary */}
      <p className="text-xs text-neutral-400 italic">
        “{summary}”
      </p>
    </div>
  );
}
