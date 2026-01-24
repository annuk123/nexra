
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
<main className="max-w-3xl mx-auto p-6 space-y-10 py-24 text-neutral-100">

  {/* Header */}
  <div>
    <h1 className="text-2xl font-semibold">
      Nexra — Startup Decision Engine
    </h1>
    <p className="text-sm text-neutral-500 mt-1">
      Describe your idea. Nexra will analyze assumptions, market, risks, and give a decision.
    </p>
  </div>

  {/* Idea Input Panel */}
  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 space-y-4">
    <p className="text-xs text-neutral-500 tracking-wide">IDEA INPUT</p>

    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="AI tool that validates startup ideas for founders..."
      className="w-full h-28 bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
    />

    <div className="flex items-center justify-between">
      <button
        onClick={handleSubmit}
        disabled={loading || !text.trim() || usageCount >= USAGE_LIMIT}
        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
          loading || !text.trim() || usageCount >= USAGE_LIMIT
            ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
        }`}
      >
        {usageCount >= USAGE_LIMIT
          ? "Usage limit reached"
          : loading
          ? "Analyzing..."
          : "Analyze idea →"}
      </button>

      <p className="text-xs text-neutral-500">
        {USAGE_LIMIT - usageCount} free analyses left today
      </p>
    </div>

    {usageCount >= USAGE_LIMIT && (
      <p className="text-xs text-neutral-600">
        Free limit reached. This helps measure real demand.
      </p>
    )}
  </div>

  {/* Error */}
  {error && <p className="text-sm text-red-400">{error}</p>}

  {/* AI RESULT PANEL */}
  {result && (
    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-6 text-sm">
      <p className="text-xs text-neutral-500 tracking-wide">
        STRUCTURED ANALYSIS
      </p>

      {/* Score + Verdict */}
      <div className="flex items-center justify-between">
        <p className="text-neutral-500">Decision Score</p>
        <p className="text-lg font-semibold text-neutral-200">
          {result.score}/100
        </p>
      </div>

      <div>
        <p className="text-neutral-500">Verdict</p>
        <p className={`font-medium ${verdictColor(result.score)}`}>
          {getVerdict(result.score)}
        </p>
      </div>

      <div>
        <p className="text-neutral-500">Reasoning</p>
        <p className="text-neutral-300">{result.reasoning}</p>
      </div>
    </div>
  )}

  {/* Previous Ideas Panel */}
  <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 space-y-4">
    <p className="text-sm font-medium">Previous Analyses</p>

    {ideas.length === 0 && (
      <p className="text-sm text-neutral-500">
        Your analyzed ideas will appear here.
      </p>
    )}

    {ideas.map((idea) => (
      <div
        key={idea.id}
        className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 space-y-2 text-sm"
      >
        <div className="flex items-center justify-between">
          <p className="text-neutral-500">Score</p>
          <p className="font-medium text-neutral-300">{idea.score}/100</p>
        </div>

        {idea.reasoning && (
          <>
            <p className="text-neutral-500">Why?</p>
            <p className="text-neutral-300">{idea.reasoning}</p>
          </>
        )}
      </div>
    ))}
  </div>

</main>

  );
}
