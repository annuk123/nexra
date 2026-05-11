"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FeedbackModal from "../FeedbackPage/Feedback";

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Changelog", href: "/changelog" },
  { label: "Feedback", href: "/feedback" },
];

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com/Nexra_Ai" },
  { label: "Email", href: "mailto:annu@nexralab.com" },
];

export default function Footer() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <footer className="border-t border-white/[0.05] bg-[#050505]">
      <div className="mx-auto max-w-6xl px-6 py-20">

        {/* Top: Brand + tagline + links */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto]">

          {/* Left: Brand */}
          <div>
            <div className="flex items-center gap-2">
              {/* Logo mark — reuse whatever you have in navbar */}
              <span className="text-[15px] font-semibold tracking-[-0.03em] text-white">
                Nexra
              </span>
              <span className="text-white/20">/</span>
              <span className="text-[13px] tracking-[-0.02em] text-white/35">
                Thinking Partner
              </span>
            </div>

            <p className="mt-4 max-w-[340px] text-[13px] leading-[1.8] tracking-[-0.01em] text-white/30">
              The thinking partner solo founders never had. Challenge your
              assumptions, surface blind spots, and make decisions with
              clarity — not panic.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-1 text-[12px] tracking-[-0.01em] text-white/30 transition-colors duration-200 hover:text-white/60"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: CTA block */}
          <div className="flex flex-col justify-between gap-8 md:items-end">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 md:text-right">
              <p className="text-[13px] font-medium tracking-[-0.02em] text-white/70">
                Early access — first 10 spots at $9/mo
              </p>
              <p className="mt-1 text-[12px] tracking-[-0.01em] text-white/25">
                Price increases as spots fill. No refills after launch.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-[13px] font-semibold tracking-[-0.02em] text-black transition-all duration-200 hover:bg-zinc-100"
              >
                Start thinking
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 h-px bg-white/[0.04]" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

          <div className="flex flex-wrap items-center gap-5">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12px] tracking-[-0.01em] text-white/25 transition-colors duration-200 hover:text-white/50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-[12px] tracking-[-0.01em] text-white/20">
            © {new Date().getFullYear()} Nexra AI. All rights reserved.
          </p>

        </div>
      </div>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </footer>
  );
}