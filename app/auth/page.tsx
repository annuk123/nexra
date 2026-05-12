"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { signInWithGoogle, signInWithGitHub } from "@/lib/api/chat";
import Link from "next/link";

function NexraAuthContent() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/thinking-engine-v2.0";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090B] text-white">
           <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.035),transparent_65%)] blur-3xl" />
        <div className="absolute left-1/2 top-[10%] h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.03] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.015] [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>
      
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10 lg:px-10">

      <Link
      href="/"
      className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.5c0 .806-.337 1.531-.852 2.031L3 15m0 0l3.781-3M3 15h8.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Back to home
    </Link> 

        <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_480px]">
          
          {/* LEFT */}
          <div className="hidden lg:flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              {/* Logo */}
              <div className="mb-12 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <img
                    src="/nexra.png"
                    alt="Nexra"
                    className="h-7 w-7"
                  />
                </div>

                <div>
                  <h2 className="text-[15px] font-medium tracking-tight">
                    Nexra
                  </h2>

                  <p className="text-sm text-white/45">
                    Thinking partner for founders
                  </p>
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-[58px] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
                Think clearly.
                <br />
                Build deliberately.
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-md text-[15px] leading-7 text-white/50">
                Nexra helps solo founders challenge ideas,
                uncover blind spots, and make clearer startup
                decisions before wasting months building the
                wrong thing.
              </p>

              {/* Bottom line */}
              <div className="mt-10 flex items-center gap-2 text-sm text-white/35">
                <div className="h-1 w-1 rounded-full bg-white/30" />
                Built for thoughtful founders
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
            >
              {/* Mobile logo */}
              <div className="mb-10 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <img
                    src="/nexra.png"
                    alt="Nexra"
                    className="h-7 w-7"
                  />
                </div>

                <div>
                  <h2 className="text-[15px] font-medium">
                    Nexra
                  </h2>

                  <p className="text-sm text-white/45">
                    Thinking partner for founders
                  </p>
                </div>
              </div>

              {/* Auth heading */}
              <div>
                <h2 className="text-[28px] font-semibold tracking-tight text-white">
                  Continue to Nexra
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  Sign in or create your account to continue.
                </p>
              </div>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />

                <span className="text-[11px] uppercase tracking-[0.18em] text-white/30">
                  Continue with
                </span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                         <button
          onClick={() => signInWithGoogle(redirect)}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-100 transition"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

                
         <button
          onClick={() => signInWithGitHub(redirect)}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-700 transition border border-neutral-700"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Continue with GitHub
        </button>
              </div>

               <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-white/20 text-[11px] tracking-wider uppercase">or</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>
                 {/* Email field — teaser, disabled */}
      <div className="relative">
        <input
          type="email"
          placeholder="you@company.com"
          disabled
          className="w-full h-[42px] rounded-xl bg-white/[0.03] border border-white/[0.07] px-4 text-[13.5px] text-white/20 placeholder:text-white/20 outline-none cursor-not-allowed select-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-white/25 bg-white/[0.05] border border-white/[0.07] px-2 py-0.5 rounded-md leading-none">
          soon
        </span>
      </div>

              {/* Footer */}
                    <p className="mt-8 text-[11.5px] text-white/25 text-center leading-relaxed">
        By continuing, you agree to our{" "}
        <a
          href="/privacy"
          className="text-white/40 underline underline-offset-2 hover:text-white/60 transition-colors duration-150"
        >
          Privacy Policy
        </a>
        {" "}and{" "}
        <a
          href="/terms"
          className="text-white/40 underline underline-offset-2 hover:text-white/60 transition-colors duration-150"
        >
          Terms of Service
        </a>
        .
      </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NexraAuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#09090B] text-white">
          <div className="h-2 w-2 animate-pulse rounded-full bg-white/40" />
        </div>
      }
    >
      <NexraAuthContent />
    </Suspense>
  );
}
