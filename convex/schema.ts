import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    email: v.string(),

    // metadata (safe + useful)
    createdAt: v.number(),
    source: v.optional(v.string()), // e.g. "landing", "demo", "twitter"
  })
    // prevent duplicate emails
    .index("by_email", ["email"]),

     feedback: defineTable({
    reasonForJoining: v.string(), // Q1
    hardestPart: v.optional(v.string()), // Q2
    decisionProcess: v.optional(v.string()), // Q3
    usefulness: v.optional(v.string()), // Q4
    confusion: v.optional(v.string()), // Q5

    createdAt: v.number(),
    source: v.optional(v.string()), // "feedback-page", "post-decision"
  }),
});
