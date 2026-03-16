import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";


export const addToWaitlist = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();

    // basic validation
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }

    // check for existing email
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      // silently succeed (important UX choice)
      return { status: "already_exists" };
    }

    await ctx.db.insert("waitlist", {
      email,
      createdAt: Date.now(),
      source: args.source ?? "landing",
    });

    return { status: "added" };
  },
});



export const getWaitlistSocialProof = query({
  handler: async (ctx) => {
    const users = await ctx.db
      .query("waitlist")
      .order("desc")
      .take(10);

    const total = await ctx.db.query("waitlist").collect();

    const avatars = users.map((u) => ({
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${u.email}`,
    }));

    return {
      avatars,
      count: total.length,
    };
  },
});