import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NexraMode = "safe" | "balanced" | "aggressive";

type Metrics = {
  verdict: string;
  decision_score: number;
  confidence: number;
  breakdown?: Record<string, number>;
  roadmap: string[];
};

type NexraState = {
  metrics: Metrics | null;
  stage: "initial" | "locked";
  mode: NexraMode;
  setMetrics: (m: Metrics) => void;
  setStage: (s: NexraState["stage"]) => void;
  setMode: (m: NexraMode) => void;
};

export const useNexraStore = create<NexraState>()(
  persist(
    (set) => ({
      metrics: null,
      stage: "initial",
      mode: "balanced",

      setMetrics: (m) => set({ metrics: m }),
      setStage: (s) => set({ stage: s }),
      setMode: (m) => set({ mode: m }),
    }),
    {
      name: "nexra-store",
    }
  )
);
