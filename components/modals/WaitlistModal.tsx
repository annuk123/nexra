"use client";
import Link from "next/link";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
  status: "idle" | "success" | "error";
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function WaitlistModal({ open, onClose, status, email, setEmail, handleSubmit }: WaitlistModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-neutral-950 border border-neutral-800 rounded-xl p-6 w-full max-w-md shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-300">
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
          <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
            <input
              type="email"
              required
              placeholder="you@startup.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm"
            />

            <button className="px-5 py-3 bg-neutral-100 text-neutral-900 rounded-lg font-medium">
              Join →
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-red-400">Something went wrong.</p>
        )}

        <p className="mt-6 text-xs text-neutral-500">
          No newsletters. Just product updates.
        </p>

        <p className="mt-2 text-xs text-neutral-500">
          By joining, you agree to our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
