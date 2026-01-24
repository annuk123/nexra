"use client";
import React from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";

export default function Footer() {
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
<footer className="border-t border-neutral-900 bg-neutral-950">
  <div className="max-w-6xl mx-auto px-6 py-20">

    {/* Main Footer Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

      {/* LEFT */}
      <div>
        <h2 className="text-4xl sm:text-5xl font-semibold leading-tight text-neutral-100">
          Better decisions.
          <br />
          Fewer regrets.
        </h2>

        <p className="mt-6 text-neutral-400 max-w-md leading-relaxed">
          Nexra helps founders evaluate ideas, surface blind spots,
          and decide what’s worth building before commitment.
        </p>
      </div>

      {/* RIGHT: Waitlist */}
      <div className="max-w-md w-full">
        {status === "idle" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-neutral-400">Work email</label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md bg-neutral-900 border border-neutral-800 px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md border border-neutral-800 px-4 py-3 text-sm text-neutral-300 hover:border-neutral-600 hover:text-neutral-100 transition"
            >
              Request early access
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-neutral-500">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="mt-4 text-xs text-neutral-600">
          Early access for serious builders. No spam.
        </p>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-600">

      {/* Social + Links */}
      <div className="flex items-center gap-6">
        <Link href="https://x.com/Nexra_Ai" className="hover:text-neutral-400 transition">
          X
        </Link>
        <Link href="/feedback" className="hover:text-neutral-400 transition">
          Feedback
        </Link>
        <Link href="/privacy" className="hover:text-neutral-400 transition">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-neutral-400 transition">
          Terms
        </Link>
      </div>

      {/* Copyright */}
      <p>© {new Date().getFullYear()} Nexra AI</p>
    </div>

  </div>
</footer>


  );
}
