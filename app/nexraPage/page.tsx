// app/page.tsx

import NexraLayout from "@/components/layout/NexraLayout";
import ChatPanel from "@/components/chat/ChatPanel";
import MetricsPanel from "@/components/metrics/MetricsPanel";

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 space-y-2">
        <h1 className="text-2xl font-semibold">Nexra — Startup Decision Engine</h1>
        <p className="text-sm text-neutral-500">
          Talk about your startup idea. Nexra will challenge your thinking.
        </p>
      </div>

      {/* Main Layout */}
      <NexraLayout sidebar={<MetricsPanel />}>
        <ChatPanel />
      </NexraLayout>

    </main>
  );
}
