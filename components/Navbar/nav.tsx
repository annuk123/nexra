"use client";
import Link from "next/link";
import { useState } from "react";
import FeedbackModal from "../FeedbackPage/Feedback";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";

export default function Navbar() {
     const addToWaitlist = useMutation(api.waitlist.addToWaitlist);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
      const [email, setEmail] = React.useState("");
        const [status, setStatus] = React.useState<
          "idle" | "success" | "error"
        >("idle");
        const [open, setOpen] = useState(false);
    
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
    <>
    <header className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
<Link href="/" className="flex items-center gap-2 text-sm font-medium text-neutral-100">
  <Image
    src="/nexra.png"
    alt="Nexra AI Logo"
    width={32}
height={32}
className="h-6 w-6 object-contain"

  />
  Nexra AI
</Link>


        {/* Nav */}
        <nav className="flex items-center gap-6 text-xs text-neutral-400">
          <Link href="/demo" className="hover:text-neutral-100 transition">
            Demo
          </Link>

          
          
                  <button
              onClick={() => setFeedbackOpen(true)}
             className="flex items-center gap-6 text-xs text-neutral-400 hover:text-neutral-100 transition"
            >
             Share feedback
            </button>
              
               

         <button
      onClick={() => setOpen(true)}
      className="flex px-2 py-2 items-center gap-6 text-xs  bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded hover:text-neutral-700 transition"
    >
      Request early access →
    </button>
        </nav>
           </div>
      
    </header>

     <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
        {open && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    onClick={() => setOpen(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative bg-neutral-950 border border-neutral-800 rounded-xl p-6 w-full max-w-md shadow-2xl"
    >
      {/* Close */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-300 transition text-sm"
      >
        ✕
      </button>

      {/* Header */}
      <h3 className="text-lg font-semibold">
        Join the waitlist
      </h3>
      <p className="text-sm text-neutral-400 mt-1">
        Early access for founders. No marketing emails.
      </p>

      {/* SUCCESS */}
      {status === "success" && (
        <div className="mt-6">
          <p className="text-neutral-200 font-medium">
            You’re on the list.
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            We’ll email you when there’s something meaningful.
          </p>
        </div>
      )}

      {/* FORM */}
      {status === "idle" && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            required
            placeholder="you@startup.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
          />

          <button
            type="submit"
            className="px-5 py-3 text-sm rounded-lg bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition font-medium"
          >
            Join →
          </button>
        </form>
      )}

      {/* ERROR */}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          Something went wrong. Try again.
        </p>
      )}

      {/* Footer */}
      <p className="mt-6 text-xs text-neutral-500">
        No newsletters. Just product updates.
      </p>

      <p className="mt-2 text-xs text-neutral-500">
        By joining, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-neutral-300">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  </div>
)}
    </>
  );
}
