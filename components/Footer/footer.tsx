"use client";
import React from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  const addToWaitlist = useMutation(api.waitlist.addToWaitlist);

  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addToWaitlist({ email, source: "homepage" });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-semibold leading-tight text-neutral-100">
              For the decision
              <br />
              you're sitting with
              <br />
              <span className="text-neutral-500">right now.</span>
            </h2>

            <p className="mt-6 text-neutral-400 max-w-md leading-relaxed">
              Nexra thinks with you — not at you.
              Start a session anytime. No agenda, no judgment.
              Just clearer thinking on the other side.
            </p>
          </div>

          {/* RIGHT: Waitlist */}
          <div className="max-w-md w-full flex flex-col justify-center">

            {status === "idle" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-neutral-400">
                    Your email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@startup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-md bg-neutral-900 border border-neutral-800 px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md border border-neutral-700 px-4 py-3 text-sm text-neutral-300 hover:border-neutral-500 hover:text-neutral-100 transition"
                >
                  Join waitlist →
                </button>
                <p className="text-xs text-neutral-600">
                  Early access for founders. No spam. No newsletters.
                </p>
              </form>
            )}

            {status === "success" && (
              <div className="space-y-2">
                <p className="text-neutral-100 font-medium">
                  You're on the list.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  We'll reach out when there's something worth your time.
                  Until then — keep building.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-4">
                <p className="text-sm text-neutral-500">
                  Something went wrong. Try again.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs text-neutral-400 underline underline-offset-2 hover:text-neutral-200 transition"
                >
                  Retry
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-600">
          <div className="flex items-center gap-6">
            <Link
              href="https://x.com/Nexra_Ai"
              className="hover:text-neutral-400 transition"
            >
              X
            </Link>
            <Link
              href="/feedback"
              className="hover:text-neutral-400 transition"
            >
              Feedback
            </Link>
            <Link
              href="/privacy"
              className="hover:text-neutral-400 transition"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-neutral-400 transition"
            >
              Terms
            </Link>

            <Link
    href="mailto:annu@nexralab.com"
    className=" flex items-center gap-2  hover:text-neutral-400 transition"
  >
    <Mail size={16} />
    Email
  </Link>
          </div>
          <p>© {new Date().getFullYear()} Nexra AI</p>
        </div>

      </div>
    </footer>
  );
}