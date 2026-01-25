"use client";

import { useState, useEffect } from "react";
import { analyzeIdea, IdeaResponse } from "../lib/api/ideas";

const USAGE_LIMIT = 5;
const STORAGE_KEY = "nexra_usage";

type UsageState = {
  count: number;
  date: string;
};

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function getUsageState(): UsageState {
  if (typeof window === "undefined") return { count: 0, date: todayKey() };

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { count: 0, date: todayKey() };

  const parsed = JSON.parse(raw);
  if (parsed.date !== todayKey()) return { count: 0, date: todayKey() };

  return parsed;
}

function incrementUsage() {
  const current = getUsageState();
  const next = { count: current.count + 1, date: todayKey() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function verdictColor(verdict: string) {
  if (verdict === "BUILD") return "text-green-400";
  if (verdict === "PIVOT") return "text-yellow-400";
  return "text-red-400";
}

export default function Demo() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<IdeaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setUsageCount(getUsageState().count);
  }, []);

  async function handleSubmit() {
    if (!text.trim()) return;

    const usage = getUsageState();
    if (usage.count >= USAGE_LIMIT) {
      setError("Daily limit reached. Come back tomorrow.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await analyzeIdea(text);
      setResult(data);
      incrementUsage();
      setUsageCount(getUsageState().count);
      setText("");
    } catch (err) {
      console.error(err);
      setError("Failed to analyze idea. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-neutral-100 space-y-12">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Nexra — Startup Decision Engine</h1>
        <p className="text-sm text-neutral-500">
          Paste your startup idea. Nexra will give a structured decision.
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="AI tool that helps indie hackers validate startup ideas..."
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
            {loading ? "Analyzing..." : "Analyze idea →"}
          </button>

          <p className="text-xs text-neutral-500">
            {USAGE_LIMIT - usageCount} free analyses left today
          </p>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {/* RESULT PANEL */}
      {result && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-8">

          <p className="text-xs text-neutral-500 tracking-wide">
            NEXRA ANALYSIS (v1)
          </p>

          {/* Verdict Card */}
          <div className="flex items-center justify-between">
            <p className="text-neutral-500">Verdict</p>
            <p className={`text-xl font-semibold ${verdictColor(result.verdict)}`}>
              {result.verdict}
            </p>
          </div>

          {/* Score */}
          <div className="flex items-center justify-between">
            <p className="text-neutral-500">Decision Score</p>
            <p className="text-lg font-semibold">{result.decision_score}/100</p>
          </div>

          {/* Confidence */}
          <div className="flex items-center justify-between">
            <p className="text-neutral-500">Confidence</p>
            <p className="text-neutral-300">{result.confidence}%</p>
          </div>

{/* Metrics */}
<div className="grid grid-cols-2 gap-3 text-xs pt-2">
  {Object.entries(result?.rule_breakdown || {}).map(([key, value]) => (
    <div key={key} className="flex justify-between bg-neutral-900 p-2 rounded">
      <span className="capitalize text-neutral-400">{key}</span>
      <span className="text-neutral-200">{value}/10</span>
    </div>
  ))}

 {result?.rule_breakdown && (
  <div className="grid grid-cols-2 gap-3 text-xs pt-2">
    {Object.entries(result.rule_breakdown).map(([key, value]) => (
      <div key={key} className="flex justify-between bg-neutral-900 p-2 rounded">
        <span className="capitalize text-neutral-400">{key}</span>
        <span className="text-neutral-200">{value}/10</span>
      </div>
    ))}
  </div>
)}

</div>


          {/* Roadmap */}
          <div>
            <p className="text-neutral-500 mb-2">Next Steps</p>
            <ul className="list-disc ml-5 space-y-1 text-neutral-300">
              {result.roadmap.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-neutral-600">
            Nexra v1 uses hybrid heuristics. AI insights coming soon.
          </p>
        </div>
      )}
    </main>
  );
}
