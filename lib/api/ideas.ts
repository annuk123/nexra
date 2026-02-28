const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/* ================================
   Core Types (V2 - aligned with backend)
================================ */

export type Verdict = "KILL" | "PIVOT" | "PROCEED";

export type RiskLevel = "low" | "medium" | "high" | "critical";

/* ================================
   Assumptions
================================ */

export type Assumption = {
  dimension: string;
  assumption: string;
  risk_level: RiskLevel;
  reason: string;
  confidence_weight: number;
  challenge_prompt: string;
};

/* ================================
   Weakest Link
================================ */

export type WeakestLink = {
  dimension: string;
  summary: string;
  impact: string;

  score?: number;
  urgency?: RiskLevel;
  recommended_action?: string;
};

/* ================================
   Rule Breakdown
================================ */

export type RuleBreakdownItem = {
  score: number;
  signals: string[];
  penalties: string[];
  red_flags: number;
  blocking_failure: boolean;
};

export type RuleBreakdown = Record<string, RuleBreakdownItem>;

/* ================================
   Structural Signals (UPDATED)
================================ */

export type Signals = {
  market: number;
  founder_fit: number;
  execution: number;
  moat: number;
  revenue: number;
};

/* ================================
   API Response Types (V2 FULL)
================================ */

export type IdeaResponse = {
  id: number;

  text: string;

  text_length: number;

  decision_score: number;

  verdict: Verdict;

  verdict_severity?: RiskLevel;

  confidence: number;

  weakest_link?: WeakestLink | null;

  assumptions: Assumption[];

  rule_breakdown: RuleBreakdown;

  signals: Signals;

  nexra_output: string;

  engine_version?: string;

  created_at: string;
};

export type IdeasPageResponse = {
  total: number;
  items: IdeaResponse[];
};

/* ================================
   Internal Fetch Helper (with timeout)
================================ */

async function safeFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 45000); // 20s timeout

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Request failed");
    }

    return (await res.json()) as T;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Request timeout. Nexra took too long to respond.");
    }

    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

/* ================================
   API Calls
================================ */

export async function analyzeIdea(
  text: string
): Promise<IdeaResponse> {

  return safeFetch<IdeaResponse>(
    `${API_BASE_URL}/ideas/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }
  );
}

export async function getIdeas(
  limit = 10,
  offset = 0
): Promise<IdeasPageResponse> {

  return safeFetch<IdeasPageResponse>(
    `${API_BASE_URL}/ideas?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
}

/* ================================
   Optional helper (future use)
================================ */

export async function getIdeaById(
  id: number
): Promise<IdeaResponse> {

  return safeFetch<IdeaResponse>(
    `${API_BASE_URL}/ideas/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
}