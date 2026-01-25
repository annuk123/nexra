"use client";
import { s } from "framer-motion/client";
import { useState } from "react";

export default function TimeSavedCalculator() {
  const [months, setMonths] = useState(3);

  const daysSaved = months * 30;
  const hoursSaved = daysSaved * 8;

  return (
    
    <div className=" p-8 bg-neutral-950 border border-neutral-800 rounded-2xl">
      
      <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-100">
        How much time do you usually waste before realizing an idea won’t work?
      </h2>

      <p className="mt-3 text-neutral-400">
        Most founders build for months before validating. See what that costs.
      </p>

      {/* Slider */}
      <div className="mt-8">
        <label className="text-sm text-neutral-400">
          Months before you validate:{" "}
          <span className="text-neutral-100 font-medium">{months} months</span>
        </label>

        <input
          type="range"
          min={1}
          max={12}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="w-full mt-3 accent-neutral-200"
        />

        <div className="flex justify-between text-xs text-neutral-600 mt-1">
          <span>1 month</span>
          <span>12 months</span>
        </div>
      </div>

      {/* Result */}
      <div className="mt-8 p-6 bg-neutral-900/60 border border-neutral-800 rounded-xl">
        <p className="text-lg text-neutral-100">
          You could save{" "}
          <span className="font-semibold text-emerald-400">
            {daysSaved} days
          </span>
        </p>

        <p className="mt-1 text-sm text-neutral-400">
          That’s roughly{" "}
          <span className="text-neutral-200">{hoursSaved} hours</span> of founder time.
        </p>

        <p className="mt-3 text-xs text-neutral-500">
          Nexra helps you decide before you waste it.
        </p>
      </div>
    </div>
  );
}
