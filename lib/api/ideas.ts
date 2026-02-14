const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/* ================================
   Core Types (V2)
================================ */

export type Verdict = "KILL" | "PIVOT" | "PROCEED";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type Assumption = {
  dimension: string;
  assumption: string;
  risk_level: RiskLevel;
  reason: string;
  confidence_weight: number;
  challenge_prompt: string;
};

export type WeakestLink = {
  dimension: string;
  score: number;
  summary: string;
  impact: string;
  urgency?: "low" | "medium" | "high" | "critical";
  recommended_action?: string;
};

export type RuleBreakdownItem = {
  score: number;
  signals: string[];
  penalties: string[];
  red_flags: number;
  blocking_failure: boolean;
};

export type RuleBreakdown = Record<string, RuleBreakdownItem>;

export type Signals = {
  market: number;
  competition: number;
  founder_fit: number;
  timing: number;
  distribution: number;
};


/* ================================
   API Response Types (V2)
================================ */

export type IdeaResponse = {
  id: number;
  text: string;
  text_length: number;

  decision_score: number;
  verdict: Verdict;
  confidence: number;

  weakest_link: WeakestLink;
  assumptions: Assumption[];

  rule_breakdown: RuleBreakdown;

  signals: Signals; // ← ADD THIS

  nexra_output: string;
  created_at: string;
};


export type IdeasPageResponse = {
  total: number;
  items: IdeaResponse[];
};

/* ================================
   API Calls
================================ */

export async function analyzeIdea(text: string): Promise<IdeaResponse> {
  const res = await fetch(`${API_BASE_URL}/ideas/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to analyze idea: ${err}`);
  }

  return res.json();
}

export async function getIdeas(
  limit = 10,
  offset = 0
): Promise<IdeasPageResponse> {
  const res = await fetch(
    `${API_BASE_URL}/ideas?limit=${limit}&offset=${offset}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch ideas: ${err}`);
  }

  return res.json();
}
