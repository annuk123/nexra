export default function ScoreBar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const percent = Math.min(100, Math.round((value / max) * 100));

  const color =
    percent > 70
      ? "from-emerald-400 to-emerald-500"
      : percent > 40
      ? "from-yellow-400 to-yellow-500"
      : "from-red-400 to-red-500";

  return (
    <div className="space-y-1">
      {/* Label Row */}
      <div className="flex justify-between text-xs text-neutral-400">
        <span>{label}</span>
        <span>
          {value}/{max} • {percent}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-neutral-800/80 h-0.75 rounded-full relative overflow-hidden">

        {/* Scale Lines (Enterprise dashboard feel) */}
        <div className="absolute inset-0 flex justify-between opacity-10">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="w-px bg-white" />
          ))}
        </div>

        {/* Actual Progress */}
        <div
          className={`h-0.75 bg-linear-to-r ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* AI Co-founder Commentary */}
      {percent < 30 && <p className="text-[10px] text-red-400">Low conviction. Validate demand.</p>}
{percent > 70 && <p className="text-[10px] text-emerald-400">High conviction signal.</p>}

    </div>
  );
}
