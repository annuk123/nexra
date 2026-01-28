// lib/nexraStore.ts
import { create } from "zustand";

type Breakdown = {
  market: number;
  execution: number;
  founder_fit: number;
  moat: number;
  revenue: number;
};

type Metrics = {
  verdict: string;
  decision_score: number;
  confidence: number;
  breakdown?: Breakdown;
  roadmap: string[];
};

type NexraState = {
  ideaText: string | null;
  metrics: Metrics | null;
  stage:
    | "idle"
    | "initial"
    | "questioning"
    | "founder_response"
    | "updated_decision";

  setIdeaText: (t: string) => void;
  setMetrics: (m: Metrics) => void;
  setStage: (s: NexraState["stage"]) => void;
  reset: () => void;
};

export const useNexraStore = create<NexraState>((set) => ({
  ideaText: null,
  metrics: null,
  stage: "idle",

  setIdeaText: (t) => set({ ideaText: t }),
  setMetrics: (m) => set({ metrics: m }),
  setStage: (s) => set({ stage: s }),

  reset: () =>
    set({
      ideaText: null,
      metrics: null,
      stage: "idle",
    }),
}));
