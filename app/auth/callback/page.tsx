"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const redirect = searchParams.get("redirect") || "/thinking-engine-v2.0";

    if (accessToken) {
      localStorage.setItem("nexra_access_token", accessToken);
      if (refreshToken) {
        localStorage.setItem("nexra_refresh_token", refreshToken);
      }
      document.cookie = `nexra_access_token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      setTimeout(() => router.replace(redirect), 100);
    } else {
      router.replace("/?auth_error=true");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-2 h-2 rounded-full bg-white/40 mx-auto animate-pulse" />
        <p className="text-neutral-500 text-sm">Signing you in…</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-500 text-sm">Loading…</p>
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
}