// import { IdeaResponse } from "@/lib/api/ideas";

// export function narrateIdea(data: IdeaResponse) {
//   const lines: string[] = [];

//   // Opening reaction
//   lines.push(
//     `Initial take: this idea scores ${data.decision_score}/100.`
//   );
//   lines.push("Before going further, I’d ask:");
// lines.push("1) Who is the exact user and when do they feel this pain?");
// lines.push("2) Why would they switch from existing tools?");
// lines.push("3) How will you get your first 100 users?");


//   // Verdict in calm mentor tone
//   if (data.verdict === "BUILD") {
//     lines.push("This looks promising, but execution will matter a lot.");
//   } 
//   else if (data.verdict === "PIVOT") {
//     lines.push("I’d pivot unless you significantly improve distribution or differentiation.");
//   } 
//   else {
//     lines.push("I’d likely kill this unless you find a stronger wedge or urgency signal.");
//   }

//   // Risks
//   if (data.risks?.length) {
//     lines.push(`Main risk: ${data.risks[0]}.`);
//   }

//   // Competitors
//   if (data.competitors?.length) {
//     lines.push(`Closest competitor: ${data.competitors[0]}. You’ll need a clear wedge.`);
//   }

//   // Direction
//   if (data.roadmap?.length) {
//     lines.push(`Next step: ${data.roadmap[0]}.`);
//   }

//   return lines;
// }

// lib/nexraNarrator.ts

// import { NexraMode } from "./nexraStore";

// function isLikelyIdea(input: any): boolean {
//   if (!input) return false;

//   const text = typeof input === "string" ? input : input.idea || input.text;

//   if (!text || text.length < 20) return false;

//   const ideaKeywords = [
//     "build",
//     "startup",
//     "app",
//     "platform",
//     "tool",
//     "SaaS",
//     "AI",
//     "market",
//     "users",
//     "problem",
//   ];

//   return ideaKeywords.some(k => text.toLowerCase().includes(k));
// }


// export function narrateIdea(data: any, mode: NexraMode): string[] {
//   const lines: string[] = [];

//   // 🚨 If not an idea → show waitlist message
//   if (!isLikelyIdea(data)) {
//     lines.push("This doesn’t look like a startup idea.");
//     lines.push("Nexra v1 only analyzes startup ideas.");
//     lines.push("Nexra v2 will understand any context like a co-founder.");
//     lines.push("Join the waitlist to unlock Nexra v2.");

//     return lines;
//   }

//   // Normal idea flow
//   const score = data.decision_score;
//   const verdict = data.verdict;

//   lines.push(`Decision: ${verdict}. Score: ${score}/100.`);

//   if (score < 30) {
//     lines.push("This is weak. Market urgency is low and differentiation is unclear.");
//   } else if (score < 70) {
//     lines.push("There is signal, but distribution and positioning are risky.");
//   } else {
//     lines.push("Strong signal. Execution and market fit look promising.");
//   }

//   lines.push("Paths forward:");

//   if (mode === "safe") {
//     lines.push("• Talk to 10 users. Validate willingness to pay.");
//     lines.push("• Prototype manually before writing code.");
//     lines.push("• Kill fast if no strong signal.");
//     lines.push("My recommendation: Do not build yet. Learn first.");
//   }

//   if (mode === "balanced") {
//     lines.push("• Interview users to validate pain.");
//     lines.push("• Build a focused MVP.");
//     lines.push("• Test distribution on Twitter / Indie Hackers.");
//     lines.push("My recommendation: Build fast and measure traction.");
//   }

//   if (mode === "aggressive") {
//     lines.push("• Ship in 7 days.");
//     lines.push("• Push distribution hard.");
//     lines.push("• Iterate in public. Kill or scale fast.");
//     lines.push("My recommendation: Go aggressive. High risk, high upside.");
//   }

//   lines.push("I’m Nexra v1 — decision mode only. My job is to stop you wasting months.");
//   lines.push("In v2, I’ll challenge your assumptions and refine this with you like a co-founder.");

//   return lines;
// }
