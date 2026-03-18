"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import FeedbackModal from "../FeedbackPage/Feedback";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import MenuIcon from "../menu/menuicon";

export default function Navbar() {
  const addToWaitlist = useMutation(api.waitlist.addToWaitlist);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // On non-home routes, always use dark mode
  // On home, use scroll position to decide
  const useDarkNav = !isHomePage || scrolledPastHero;

  useEffect(() => {
    // Reset scroll state on route change
    setScrolledPastHero(false);

    if (!isHomePage) return;

    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setScrolledPastHero(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to catch any initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, pathname]);

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
      <header
        className="fixed top-0 w-full z-50 transition-colors duration-500 bg-black/20 backdrop-blur-md border-b border-neutral-800"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium transition-colors duration-500"
            style={{ color: useDarkNav ? "#ffffff" : "#0a0a0a" }}
          >
            <Image
              src="/nexra.png"
              alt="Nexra"
              width={28}
              height={28}
              className="h-6 w-6 bg-black rounded-md"
            />
            <span className="tracking-tight text-neutral-300">Nexra</span>
            <span
              className="text-xs transition-colors duration-500 text-neutral-400"
            >
              / Thinking Partner
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs">
            <Link
              href="/thinking-engine-v2.0"
              className="transition-colors duration-500 relative after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-px after:transition-all text-neutral-400 hover:text-neutral-300"
            >
              Thinking Engine
            </Link>

            <Link
              href="/changelog"
              className="transition-colors duration-500 relative after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-px after:transition-all text-neutral-400 hover:text-neutral-300"
            >
              Changelog
            </Link>

            <span
              onClick={() => setFeedbackOpen(true)}
              className="transition-colors duration-500 relative after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-px after:transition-all text-neutral-400 cursor-pointer  hover:text-neutral-300 bg-transparent border-0"

            >
              Report a bug
            </span>

            <button
              onClick={() => setOpen(true)}
              className="px-3 py-1.5 rounded-md text-xs cursor-pointer transition-all duration-500 bg-neutral-300 hover:bg-neutral-400"
            >
              Join Waitlist
            </button>
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden transition-colors duration-500"
            style={{ color: useDarkNav ? "#a3a3a3" : "#6b6560" }}
          >
            {mobileOpen ? <X size={20} /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 py-4 space-y-4 text-sm transition-colors duration-500"
            style={{
              background: useDarkNav ? "#0a0a0a" : "#f5f2ed",
              borderColor: useDarkNav
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.08)",
            }}
          >
            <Link
              href="/thinking-engine-v2.0"
              className="block transition-colors duration-200"
              style={{ color: useDarkNav ? "#a3a3a3" : "#6b6560" }}
            >
              Thinking Engine
            </Link>

            <Link
              href="/changelog"
              className="block transition-colors duration-200"
              style={{ color: useDarkNav ? "#a3a3a3" : "#6b6560" }}
            >
              Changelog
            </Link>

            <button
              onClick={() => {
                setFeedbackOpen(true);
                setMobileOpen(false);
              }}
              className="block bg-transparent border-0 cursor-pointer transition-colors duration-200"
              style={{ color: useDarkNav ? "#a3a3a3" : "#6b6560" }}
            >
              Report a bug
            </button>

            <button
              onClick={() => {
                setOpen(true);
                setMobileOpen(false);
              }}
              className="w-full px-3 py-2 rounded-md text-sm cursor-pointer transition-all duration-500"
              style={
                useDarkNav
                  ? {
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#ffffff",
                    }
                  : {
                      background: "#0a0a0a",
                      border: "1px solid #0a0a0a",
                      color: "#f5f2ed",
                    }
              }
            >
              Join Waitlist
            </button>
          </div>
        )}
      </header>

      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />

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

            <h3 className="text-lg font-semibold text-white">
              Join the waitlist
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Early access for founders. No marketing emails.
            </p>

            {status === "success" && (
              <div className="mt-6">
                <p className="text-neutral-200 font-medium">
                  You're on the list.
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  We'll email you when there's something meaningful.
                </p>
              </div>
            )}

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

            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">
                Something went wrong. Try again.
              </p>
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