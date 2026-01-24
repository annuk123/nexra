import { mutation } from "./_generated/server";

export const submitFeedback = mutation(async ({ db }, { message, email, source }: { message: string; email: string; source: string }) => {
  await db.insert("feedback", {
    message,
    email,
    source,
    createdAt: Date.now(),
  });
});
