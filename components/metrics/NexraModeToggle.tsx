"use client";
import { useNexraStore } from "@/lib/nexraStore";

export default function NexraModeToggle() {
  const mode = useNexraStore((s) => s.mode);
  const setMode = useNexraStore((s) => s.setMode);

  const modes = ["safe", "balanced", "aggressive"] as const;

  return (
    <div className="flex gap-2 text-xs">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`px-2 py-1 rounded border ${
            mode === m
              ? "bg-yellow-400 text-black border-yellow-400"
              : "bg-neutral-900 border-neutral-800 text-neutral-400"
          }`}
        >
          {m.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
