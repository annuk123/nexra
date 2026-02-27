import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  Verdict,
  RuleBreakdown,
  WeakestLink,
  Assumption,
} from "@/lib/api/ideas";

export type Signals = {
  market: number;
  founder_fit: number;
  execution: number;
  moat: number;
  revenue: number;
};

export type NexraMode = "safe" | "balanced" | "aggressive";

/* ================================
   V2 Metrics (SOURCE OF TRUTH)
================================ */
type Metrics = {
  verdict: Verdict;
  decision_score: number;
  confidence: number;

  breakdown: RuleBreakdown;
  weakest_link: WeakestLink;
  assumptions: Assumption[];
  signals: Signals;
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
