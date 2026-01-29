// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center px-6">
      <div className="max-w-xl w-full border border-neutral-800 bg-neutral-950/80 p-8 rounded-xl">
        
        {/* Header */}
        <p className="text-xs text-neutral-500 mb-2">Nexra • Not Found</p>

        <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">
          This page doesn’t exist
        </h1>

        <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
          The page you’re looking for isn’t available.  
          It may have been removed, renamed, or never built.
        </p>

        {/* Subtle Nexra Philosophy */}
        <p className="mt-4 text-sm text-neutral-500 italic">
          Think before you build. Kill weak paths early.
        </p>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Link
            href="/"
            className="px-4 py-2 bg-neutral-100 text-neutral-900 text-sm rounded-lg hover:bg-neutral-200 transition"
          >
            Go home
          </Link>

          <Link
            href="/nexra-engine-v1"
            className="px-4 py-2 border border-neutral-700 text-sm rounded-lg hover:bg-neutral-900 transition"
          >
            Analyze an idea
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-neutral-600">
          Nexra v1 • Decision Engine
        </p>
      </div>
    </div>
  );
}
