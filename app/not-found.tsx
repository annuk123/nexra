// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="scanlines min-h-screen py-18 bg-black text-gray-400 font-mono flex items-center justify-center px-6">
      <div className="max-w-3xl w-full border border-neutral-800 bg-black/90 p-6 rounded-xl shadow-[0_0_40px_rgba(124,58,237,0.15)]">
        <div className="flex gap-2 mb-3">
    <span className="w-3 h-3 bg-red-500 rounded-full" />
    <span className="w-3 h-3 bg-yellow-500 rounded-full" />
    <span className="w-3 h-3 bg-green-500 rounded-full" />
  </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-green-500">nexra://system/error</span>
          <span className="text-xs text-red-500">ERROR_CODE: 404</span>
        </div>

        {/* Terminal Body */}
        <pre className="text-sm leading-relaxed whitespace-pre-wrap">
{`> booting nexra kernel...
> loading decision engine...
> scanning route...

[!] PATH NOT FOUND

The path you requested does not exist.
Either it was never built,
or Nexra would have killed it anyway.

Manifesto:
- Think before you build.
- Kill weak paths fast.
- Double down on strong signals.

System suggestion:
Run another analysis.
`}
<span className="cursor-blink"></span>

        </pre>

        {/* Command Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black text-xs rounded"
          >
            $ cd /
          </Link>

          <Link
            href="/nexra-engine-v1"
            className="px-3 py-1.5 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black text-xs rounded"
          >
            $ nexra analyze
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-green-600/60">
          Nexra v1 • brutal truth mode enabled
        </p>
      </div>
    </div>
  );
}
