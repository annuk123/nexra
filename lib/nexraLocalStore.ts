export type SavedDecision = {
  id: string;
  ideaText: string;
  metrics: any;
  createdAt: string;
};

const KEY = "nexra_decisions";

export function saveDecision(decision: SavedDecision) {
  const existing = getDecisions();
  localStorage.setItem(KEY, JSON.stringify([decision, ...existing]));
}

export function getDecisions(): SavedDecision[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function clearDecisions() {
  localStorage.removeItem(KEY);
}
