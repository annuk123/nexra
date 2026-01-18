
"use client";

import { useState, useEffect } from "react";
import { analyzeIdea, IdeaResponse, getIdeas } from "../lib/api/ideas";

function getVerdict(score: number) {
  if (score >= 80) return "Strong idea";
  if (score >= 50) return "Promising idea";
  return "Early-stage idea";
}

function verdictColor(score: number) {
  if (score >= 80) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-gray-200";
}


const USAGE_LIMIT = 5;
const STORAGE_KEY = "nexra_usage";

type UsageState = {
  count: number;
  date: string;
};

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

function getUsageState(): UsageState {
  if (typeof window === "undefined") {
    return { count: 0, date: todayKey() };
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { count: 0, date: todayKey() };
  }

  const parsed: UsageState = JSON.parse(raw);

  if (parsed.date !== todayKey()) {
    return { count: 0, date: todayKey() };
  }

  return parsed;
}

function incrementUsage() {
  const current = getUsageState();
  const next: UsageState = {
    count: current.count + 1,
    date: todayKey(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}


export default function Demo() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<IdeaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  
  const [error, setError] = useState("");
const [ideas, setIdeas] = useState<IdeaResponse[]>([]);



async function handleSubmit() {
  if (!text.trim()) return;

  const usage = getUsageState();

  if (usage.count >= USAGE_LIMIT) {
    setError("Usage limit reached. Come back tomorrow.");
    return;
  }

  setLoading(true);
  setError("");
  setResult(null);

  try {
    const data = await analyzeIdea(text);

    setResult(data);
    setIdeas((prev) => [data, ...prev]);

    incrementUsage();
    setUsageCount(getUsageState().count);

    setText("");
  } catch (err) {
    console.error(err);
    setError("Failed to analyze idea");
  } finally {
    setLoading(false);
  }
}




useEffect(() => {
  setUsageCount(getUsageState().count);
}, []);


  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6 py-28">
      <h1 className="text-2xl font-bold text-gray-200">Nexra — Validate Your Idea</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe your startup idea in 1–2 sentences (problem + solution)"

        className="w-full border text-white rounded p-3"
        rows={4}
      />

     <button
  onClick={handleSubmit}
  disabled={loading || !text.trim() || usageCount >= USAGE_LIMIT}
  className={`px-4 py-2 rounded ${
    loading || !text.trim() || usageCount >= USAGE_LIMIT
      ? "opacity-50 cursor-not-allowed bg-gray-700 text-white"
      : "bg-gray-800 text-white"
  }`}
>
   {usageCount >= USAGE_LIMIT
    ? "Usage limit reached"
    : loading
    ? "Analyzing..."
    : "Analyze Idea"}
</button>
<p className="text-xs text-neutral-500">
  {USAGE_LIMIT - usageCount} free analyses left today
</p>


{usageCount >= USAGE_LIMIT && (
  <p className="text-sm text-gray-400">
    You’ve reached the free limit for now.  
    This helps me understand real usage.
  </p>
)}



      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="border rounded p-4 space-y-2">
  <div className="flex items-center justify-between">
    <span className="text-md text-gray-400">AI Score</span>
    
    <span className="text-lg text-gray-400 font-semibold">{result.score}/100</span>
  </div>

  <div>
    <span className="text-sm text-gray-300">Verdict</span>
    <p className={`font-medium ${verdictColor(result.score)}`}>
  {getVerdict(result.score)}
</p>

  </div>

  <div>
    <span className="text-sm text-gray-400">Why?</span>
    <p className="text-sm text-gray-300">{result.reasoning}</p>
  </div>
</div>

      )}

     <div className="border rounded p-4 space-y-3">
  <h2 className="text-lg font-semibold text-white">Previous Ideas</h2>

  {ideas.length === 0 && (
    <p className="text-sm text-gray-400">No ideas yet</p>
  )}

  {ideas.map((idea) => (
    <div
      key={idea.id}
      className="border rounded p-3 space-y-1 text-sm"
    >
      <p className="text-gray-400 text-md">Score</p>
      <p className="font-medium text-gray-300 ">{idea.score}/100</p>

      {idea.reasoning && (
        <>
          <p className="text-gray-400">Why?</p>
          <p className="text-gray-300">{idea.reasoning}</p>
        </>
      )}
    </div>
  ))}
</div>


    </main>
  );
}
