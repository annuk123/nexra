"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isSignedIn } from "@/lib/api/chat";
import ChatPanel from "@/components/chat/ChatPanel";

export default function ThinkingPartnerPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isSignedIn()) {
      router.replace("/auth?redirect=/thinking-engine-v2.0");
    }
  }, [router]);

  // Don't render anything until mounted client-side
  if (!mounted) return null;
  if (!isSignedIn()) return null;

  return (
    <main className="h-dvh bg-neutral-950 text-neutral-100">
      <ChatPanel />
    </main>
  );
}