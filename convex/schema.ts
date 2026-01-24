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
  message: v.string(),
  email: v.optional(v.string()),
  source: v.optional(v.string()),
  createdAt: v.number(),

  }),
});
