import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitFeedback = mutation({
  args: {
    reasonForJoining: v.string(),
    hardestPart: v.optional(v.string()),
    decisionProcess: v.optional(v.string()),
    usefulness: v.optional(v.string()),
    confusion: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // minimal validation
    if (args.reasonForJoining.trim().length < 3) {
      throw new Error("Feedback too short");
    }

    await ctx.db.insert("feedback", {
      reasonForJoining: args.reasonForJoining.trim(),
      hardestPart: args.hardestPart?.trim(),
      decisionProcess: args.decisionProcess?.trim(),
      usefulness: args.usefulness?.trim(),
      confusion: args.confusion?.trim(),
      source: args.source ?? "feedback-page",
      createdAt: Date.now(),
    });

    return { status: "saved" };
  },
});
