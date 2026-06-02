"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { getAccessToken, isSignedIn } from "@/lib/api/chat";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const FREE_FEATURES = [
  { text: "5 messages per day", included: true },
  { text: "Idea stress-testing", included: true },
  { text: "URL analysis", included: true },
  { text: "Founder memory", included: true },
  { text: "Last conversation only", included: false },
  { text: "Full history", included: false },
];

const PRO_FEATURES = [
  { text: "Unlimited messages", included: true },
  { text: "Idea stress-testing", included: true },
  { text: "URL analysis", included: true },
  { text: "Founder memory", included: true },
  { text: "Full conversation history", included: true },
  { text: "Priority support", included: true },
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [mounted, setMounted]   = useState(false);
  const [userPlan, setUserPlan] = useState<string>("free");
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

useEffect(() => {
  setMounted(true);
  const token = getAccessToken();
  if (token) {
    fetch(`${API_URL}/api/payments/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) return { plan: "free" };
        return res.json();
      })
      .then(data => setUserPlan(data.plan ?? "free"))
      .catch(() => setUserPlan("free"));
  }
}, []);

useEffect(() => {
  const token = localStorage.getItem("nexra_access_token");
  if (!token) {
    setIsLoggedIn(false);
    return;
  }
  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("nexra_access_token");
      localStorage.removeItem("nexra_refresh_token");
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  } catch {
    setIsLoggedIn(false);
  }
}, [pathname]);

  const loggedIn = mounted && isSignedIn();
  const isPro = mounted && userPlan === "pro";

  const proMonthly = 9;
  const proAnnual  = 7;

  const handleGetPro = async () => {
    setError(null);
    if (isPro) return;

    if (!loggedIn) {
      router.push("/auth?redirect=%2Fpricing");
      return;
    }

    setLoading(true);
    try {
      const token = getAccessToken();

      const res = await fetch(`${API_URL}/api/payments/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ billing_period: isAnnual ? "annual" : "monthly" }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Something went wrong. Please try again.");
      }

      const { checkout_url } = await res.json();
      window.location.href = checkout_url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  const handleStartFree = () => {
    if (loggedIn) return;
    router.push("/auth");
  };

  return (
    <section className="bg-[#141414] text-[#f0ece4] py-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#c8a96e] font-medium mb-4">
            Pricing
          </p>
          <h2 className="text-4xl font-semibold text-[#f0ece4] leading-tight mb-3">
            One tool. No second-guessing.
          </h2>
          <p className="text-[#888680] text-[15px]">
            Start free. Upgrade when you&apos;re ready to go all in.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          <span
            className={`text-sm cursor-pointer transition-colors duration-200 ${
              !isAnnual ? "text-[#f0ece4]" : "text-[#888680]"
            }`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </span>

          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-10 h-[22px] rounded-full border transition-all duration-200 ${
              isAnnual
                ? "bg-[#c8a96e22] border-[#c8a96e55]"
                : "bg-[#2a2a2a] border-[#333]"
            }`}
            aria-label="Toggle billing period"
          >
            <motion.div
              animate={{ left: isAnnual ? "20px" : "2px" }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className={`absolute top-[2px] w-4 h-4 rounded-full transition-colors duration-200 ${
                isAnnual ? "bg-[#c8a96e]" : "bg-[#888]"
              }`}
            />
          </button>

          <span
            className={`text-sm cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
              isAnnual ? "text-[#f0ece4]" : "text-[#888680]"
            }`}
            onClick={() => setIsAnnual(true)}
          >
            Annual
            <span className="text-[10px] bg-[#c8a96e15] text-[#c8a96e] border border-[#c8a96e33] px-2 py-[2px] rounded-full font-medium">
              2 months free
            </span>
          </span>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-8"
          >
            <p className="text-[13px] font-medium tracking-widest uppercase text-[#888680] mb-5">
              Free
            </p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[18px] text-[#888680]">$</span>
              <span className="text-5xl font-semibold text-[#f0ece4] leading-none">0</span>
            </div>
            <p className="text-[13px] text-[#555] mb-6">forever</p>
            <p className="text-[13px] text-[#666] leading-relaxed mb-7">
              Get a feel for what an honest AI co-founder is like.
            </p>
            <div className="h-px bg-[#2a2a2a] mb-6" />
            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map((f, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 text-[13px] ${
                    f.included ? "text-[#c8c8c0]" : "text-[#555]"
                  }`}
                >
                  <span
                    className={`mt-[1px] w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                      f.included
                        ? "bg-[#c8a96e22] text-[#c8a96e]"
                        : "bg-[#222] text-[#444]"
                    }`}
                  >
                    {f.included
                      ? <Check size={9} strokeWidth={3} />
                      : <Minus size={9} strokeWidth={2.5} />}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
            <button
  onClick={handleStartFree}
  className="w-full py-3 rounded-xl text-[14px] font-medium border border-[#333] text-[#a09e9a] hover:border-[#555] hover:text-[#f0ece4] transition-all duration-200"
>
  {!loggedIn ? "Start for free" : isPro ? "Free plan" : "Current plan"}
</button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative bg-[#1e1c18] border border-[#c8a96e44] rounded-2xl p-8"
          >
            <div className="absolute -top-[11px] left-1/2 -translate-x-1/2">
              <span className="bg-[#c8a96e] text-[#1a1500] text-[10px] font-semibold tracking-widest uppercase px-3 py-[3px] rounded-full whitespace-nowrap">
                Most popular
              </span>
            </div>

            <p className="text-[13px] font-medium tracking-widest uppercase text-[#c8a96e] mb-5">
              Pro
            </p>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[18px] text-[#888680]">$</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={isAnnual ? "annual" : "monthly"}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="text-5xl font-semibold text-[#f0ece4] leading-none"
                >
                  {isAnnual ? proAnnual : proMonthly}
                </motion.span>
              </AnimatePresence>
              {isAnnual && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[14px] text-[#555] line-through ml-1 self-center"
                >
                  $108
                </motion.span>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={isAnnual ? "annual-period" : "monthly-period"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-[13px] text-[#555] mb-6"
              >
                {isAnnual ? "per month, billed $84/year" : "per month"}
              </motion.p>
            </AnimatePresence>

            <p className="text-[13px] text-[#666] leading-relaxed mb-7">
              For founders who are serious about getting it right.
            </p>

            <div className="h-px bg-[#c8a96e22] mb-6" />

            <ul className="space-y-3 mb-8">
              {PRO_FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-[13px] text-[#c8c8c0]">
                  <span className="mt-[1px] w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-[#c8a96e22] text-[#c8a96e]">
                    <Check size={9} strokeWidth={3} />
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>

            {error && (
              <p className="text-[12px] text-red-400 mb-3 text-center">{error}</p>
            )}

            <button
  onClick={handleGetPro}
  disabled={loading || isPro}
  className={`w-full py-3 rounded-xl text-[14px] font-medium transition-all duration-200 flex items-center cursor-pointer  justify-center gap-2
    ${isPro
      ? "bg-[#2a2a2a] text-[#c8a96e]  border border-[#c8a96e44] "
      : "bg-[#c8a96e] text-[#1a1500] hover:bg-[#d9ba82] disabled:opacity-60 disabled:cursor-not-allowed"
    }`}
>
  {isPro ? "Current plan ✓" : loading ? (
    <><Loader2 size={14} className="animate-spin" />Redirecting...</>
  ) : "Get Pro"}
</button>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center text-[12px] text-[#555] mt-7"
        >
          No credit card required for free plan &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; Billed via Dodo Payments
        </motion.p>

      </div>
    </section>
  );
}