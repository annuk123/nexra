"use client";
import Link from "next/link";
import { useState } from "react";
import FeedbackModal from "../FeedbackPage/Feedback";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { button } from "framer-motion/client";
import { Button } from "../ui/button";
import MenuIcon from "../menu/menuicon";

export default function Navbar() {
  const addToWaitlist = useMutation(api.waitlist.addToWaitlist);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <>
<header className="fixed top-0 w-full z-50 bg-neutral-950/60 backdrop-blur border-b border-neutral-900">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

    {/* Logo */}
    <Link href="/" className="flex items-center gap-2 text-sm font-medium text-white">
      <Image src="/nexra.png" alt="Nexra" width={28} height={28} className="h-6 w-6" />
      <span className="tracking-tight">Nexra</span>
      <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded">
        beta
      </span>
    </Link>

    {/* Desktop Nav */}
    <nav className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
      <Link href="/demo" className="hover:text-white transition relative after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-white/20 after:transition-all"
>Product</Link>

      <button
        onClick={() => setFeedbackOpen(true)}
        className="hover:text-white transition relative after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-white/20 after:transition-all"

      >
        Feedback
      </button>

      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white text-xs hover:bg-white/10 transition"
      >
        Start session
      </button>
    </nav>

    {/* Mobile Button */}
    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="md:hidden text-neutral-400 hover:text-white"
    >
      {mobileOpen ? <X size={20} /> : <MenuIcon />}
    </button>
  </div>

  {/* Mobile Dropdown */}
  {mobileOpen && (
    <div className="md:hidden bg-neutral-950 border-t border-neutral-900 px-4 py-4 space-y-4 text-sm">
      <Link href="/demo" className="block text-neutral-400 hover:text-white">Product</Link>

      <button
        onClick={() => {
          setFeedbackOpen(true);
          setMobileOpen(false);
        }}
        className="block text-neutral-400 hover:text-white"
      >
        Feedback
      </button>

      <button
        onClick={() => {
          setOpen(true);
          setMobileOpen(false);
        }}
        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-md"
      >
        Start session
      </button>
    </div>
  )}
</header>



      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />

      {/* Waitlist Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-neutral-950 border border-neutral-800 rounded-xl p-5 sm:p-6 w-full max-w-md shadow-2xl"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-300"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold">Join the waitlist</h3>
            <p className="text-sm text-neutral-400 mt-1">
              Early access for founders. No marketing emails.
            </p>

            {status === "success" && (
              <div className="mt-6">
                <p className="text-neutral-200 font-medium">You’re on the list.</p>
                <p className="mt-2 text-sm text-neutral-500">
                  We’ll email you when there’s something meaningful.
                </p>
              </div>
            )}

            {status === "idle" && (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
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

            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">Something went wrong. Try again.</p>
            )}

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
