"use client";
import React from "react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

export default function Waitlist() {
  const addToWaitlist = useMutation(api.waitlist.addToWaitlist);

  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addToWaitlist({
        email,
        source: "homepage",
      });

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <span className="text-xs tracking-widest text-neutral-400">
        WAITLIST
      </span>

      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold max-w-xl">
        Build with clarity, not momentum.
      </h2>

      <p className="mt-4 text-neutral-400 max-w-xl">
        Nexra is being built slowly and intentionally.
        Join the waitlist if this way of thinking resonates with you.
      </p>

      {/* SUCCESS STATE */}
      {status === "success" && (
        <div className="mt-10 max-w-md">
          <p className="text-neutral-300">
            Thanks for joining.
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            We’ll share updates only when there’s something meaningful.
          </p>
        </div>
      )}

      {/* FORM */}
      {status === "idle" && (
        <form
          className="mt-10 flex flex-col sm:flex-row gap-4 max-w-md"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
          />
          <button
            type="submit"
            className="px-6 py-3 text-sm text-neutral-300 border border-neutral-800 rounded-lg hover:border-neutral-600 hover:text-neutral-100 transition"
          >
            Join waitlist
          </button>
        </form>
      )}

      {/* ERROR (rare, but polite) */}
      {status === "error" && (
        <p className="mt-6 text-sm text-neutral-500">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="mt-6 text-xs text-neutral-500 max-w-md">
        No spam. No hype. Occasional updates when there’s something meaningful
        to share.
      </p>

      <p className="mt-2 text-xs text-neutral-500">
        By joining, you agree to our{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
