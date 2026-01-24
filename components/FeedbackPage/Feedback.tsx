"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function FeedbackModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const submitFeedback = useMutation(api.feedback.submitFeedback);

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await submitFeedback({
        message,
        email,
        source: "homepage-modal",
      });

      setStatus("success");
      setMessage("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 w-full max-w-md">

        {/* Header */}
        <h3 className="text-lg font-medium text-neutral-100">
          Help us improve Nexra
        </h3>
        <p className="mt-1 text-sm text-neutral-400">
          What should we build, fix, or change?
        </p>

        {status === "success" ? (
          <div className="mt-6 flex flex-col gap-4 items-start">
          <p className="mt-6 text-sm text-neutral-300">
            Thanks. We read every message.
          </p>
          <button
                type="button"
                onClick={onClose}
                className="text-xs text-neutral-500 hover:text-neutral-300"
              >
                Close
              </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <Textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your thoughts, criticism, or ideas..."
              className="h-32 text-neutral-200 bg-neutral-900 border-neutral-800"
            />

            <input
              type="email"
              placeholder="Optional email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-neutral-500 hover:text-neutral-300"
              >
                Cancel
              </button>

              <Button type="submit" variant="ghost" className="text-stone-400">
                Send feedback →
              </Button>
            </div>
          </form>
        )}

        {status === "error" && (
          <p className="mt-2 text-xs text-red-500">Something went wrong.</p>
        )}
      </div>
    </div>
  );
}
