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
// lib/nexraNarrator.ts

export function narrateIdea(data: any): string[] {
  const score = data.decision_score;
  const verdict = data.verdict;

  const lines: string[] = [];

  // 1️⃣ Direct Answer
  lines.push(`Decision: ${verdict}. Score: ${score}/100.`);

  // 2️⃣ Explanation (Brutal but Calm)
  if (score < 30)
    lines.push("Why: Market urgency is weak and differentiation is unclear.");
  else if (score < 70)
    lines.push("Why: There is some signal, but distribution and positioning are risky.");
  else
    lines.push("Why: Market signal and execution feasibility look strong.");

  // 3️⃣ How to Overcome (Paths)
  lines.push("How to improve this idea:");

  lines.push("• Safe path: Interview 10 target users and validate willingness to pay.");
  lines.push("• Balanced path: Build a focused MVP and test distribution on Twitter/Indie Hackers.");
  lines.push("• Aggressive path: Ship in 7 days and push distribution hard.");

  // 4️⃣ Nexra Recommendation (Highlight One)
  if (score < 50)
    lines.push("My recommendation: Start with the Safe path. Data before code.");
  else
    lines.push("My recommendation: Follow the Balanced path. Build and test fast.");

  // 5️⃣ Tease V2
  lines.push("Conversational Nexra is coming in v2. I’ll ask questions and refine this with you.");
lines.push("This is Nexra v1. My goal is to help you avoid building bad startups.");

  return lines;
}
