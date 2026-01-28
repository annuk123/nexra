// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// export type IdeaResponse = {
//   id: number;
//   text_length: number;
//   score: number;
//   reasoning: string;
// };

// export async function analyzeIdea(text: string): Promise<IdeaResponse> {
//   const res = await fetch(`${API_BASE_URL}/ideas/analyze`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ text }),
//   });

//   if (!res.ok) {
//     throw new Error("Failed to analyze idea");
//   }

//   return res.json();
// }

// export async function getIdeas(limit = 10, offset = 0): Promise<IdeaResponse[]> {
//   const res = await fetch(
//     `${API_BASE_URL}/ideas?limit=${limit}&offset=${offset}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch ideas");
//   }

//   return res.json();
// }

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
export type RuleBreakdown = {
  market: number;
  execution: number;
  founder_fit: number;
  moat: number;
  revenue: number;
};

export type IdeaResponse = {
  id: number;
  text: string;
  text_length: number;

  decision_score: number;
  verdict: "BUILD" | "PIVOT" | "KILL";
  confidence?: number;

  rule_score: number;
  ai_score: number;

  assumptions: string[];
  market_analysis: string;
  competitors: string[];
  risks: string[];
  roadmap: string[];

  rule_breakdown?: RuleBreakdown;
  created_at: string;
};


export type IdeasPageResponse = {
  total: number;
  items: IdeaResponse[];
};

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
