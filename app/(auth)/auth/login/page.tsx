"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:8000/auth/dev-login?email=${encodeURIComponent(email)}`,
        { method: "POST" }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || "Unable to sign in");
      }

      localStorage.setItem("access_token", data.access_token);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-200 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 backdrop-blur p-8 shadow-xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Internal access only. This page is not publicly linked.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@nexra.dev"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-2.5 text-sm outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-700"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-white text-neutral-900 py-2.5 text-sm font-medium hover:bg-neutral-200 transition disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Continue"}
            </button>
          </form>

          {/* Feedback */}
          {error && (
            <p className="mt-4 text-sm text-red-400">{error}</p>
          )}

          {success && (
            <p className="mt-4 text-sm text-emerald-400">
              Login successful. Token stored locally.
            </p>
          )}
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-center text-xs text-neutral-500">
          Dev-only authentication. Will be replaced before launch.
        </p>
      </div>
    </main>
  );
}
