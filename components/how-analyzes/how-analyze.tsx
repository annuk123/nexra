import { Section } from "@/design-system/layout/Section";
import { motion } from "framer-motion";

export default function HowAnalyze() {
  return (
      <Section>
      <h2 className="text-3xl sm:text-4xl font-semibold max-w-3xl">
        See how Nexra analyzes a real startup idea
      </h2>
    
      <p className="mt-4 text-neutral-400 max-w-2xl">
        This is the structured reasoning pipeline in action.
      </p>
    
      <div className="mt-10 bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-6 text-sm">
    
        <div>
          <p className="text-neutral-500">Input</p>
          <p className="mt-1 text-neutral-300">
            AI tool that validates startup ideas for founders.
          </p>
        </div>
    
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    
          <div>
            <p className="text-neutral-500">Assumptions</p>
            <ul className="mt-2 text-neutral-300 space-y-1">
              <li>Founders want fast validation</li>
              <li>They trust AI recommendations</li>
            </ul>
          </div>
    
          <div>
            <p className="text-neutral-500">Market & Demand</p>
            <ul className="mt-2 text-neutral-300 space-y-1">
              <li>Growing indie hacker ecosystem</li>
              <li>High interest in idea validation</li>
            </ul>
          </div>
    
          <div>
            <p className="text-neutral-500">Competition</p>
            <ul className="mt-2 text-neutral-300 space-y-1">
              <li>BeatAble, GPT prompts, manual validation</li>
              <li>Gap: structured decision engine</li>
            </ul>
          </div>
    
          <div>
            <p className="text-neutral-500">Risks</p>
            <ul className="mt-2 text-neutral-300 space-y-1">
              <li>False positives</li>
              <li>Founder confirmation bias</li>
            </ul>
          </div>
    
        </div>
    
        <div className="border-t border-neutral-800 pt-4">
          <p className="text-neutral-500">Decision</p>
          <p className="mt-1 text-emerald-400 font-medium">
            Recommendation: Build MVP focused on indie hackers.
          </p>
        </div>
    
        <div>
          <p className="text-neutral-500">Roadmap</p>
          <ul className="mt-2 text-neutral-300 space-y-1">
            <li>Launch landing page & waitlist</li>
            <li>Competitor analysis module</li>
            <li>Domain and brand snapshot</li>
            <li>Distribution plan</li>
          </ul>
        </div>
    
      </div>
    </Section>
  );
}