import NexraLayout from "@/components/layout/NexraLayout";
import ChatPanel from "@/components/chat/ChatPanel";
import MetricsPanel from "@/components/metrics/MetricsPanel";

export default function Page() {
  return (
    <main className="lg:h-screen bg-neutral-950 py-5 text-neutral-100 flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="shrink-0 max-w-7xl lg:ml-12 px-6 pt-12 pb-6 space-y-2">
        <h1 className="text-2xl font-semibold">
          Nexra — Startup Decision Engine V1
        </h1>
        <p className="text-sm text-neutral-500">
          Talk about your startup idea. Nexra will challenge your thinking.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 overflow-hidden">
        <NexraLayout sidebar={<MetricsPanel />}>
          <ChatPanel />
        </NexraLayout>
      </div>

    </main>
  );
}