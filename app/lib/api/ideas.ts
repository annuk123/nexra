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

export type IdeaResponse = {
  id: number;
  text_length: number;
  score: number;
  reasoning: string;
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
    throw new Error("Failed to analyze idea");
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
    throw new Error("Failed to fetch ideas");
  }

  return res.json();
}
