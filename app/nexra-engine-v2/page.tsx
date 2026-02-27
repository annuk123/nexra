// import NexraLayout from "@/components/layout/NexraLayout";
// import ChatPanel from "@/components/chat/ChatPanel";
// import MetricsPanel from "@/components/metrics/MetricsPanel";

// export default function Page() {
//   return (
//     <main className="h-screen bg-neutral-950 py-5 text-neutral-100 flex flex-col overflow-hidden">
      
//       {/* Header */}
//       <div className="shrink-0 max-w-7xl lg:ml-12 px-6 pt-12 pb-6 space-y-2">
//         <h1 className="text-2xl font-semibold">
//           Nexra — Startup Decision Engine V1
//         </h1>
//         <p className="text-sm text-neutral-500">
//           Talk about your startup idea. Nexra will challenge your thinking.
//         </p>
//       </div>

//       {/* Main Layout */}
//       <div className="flex-1 overflow-hidden">
//         <NexraLayout sidebar={<MetricsPanel />}>
//           <ChatPanel />
//         </NexraLayout>
//       </div>

//     </main>
//   );
// }


"use client";

import { useState } from "react";
import NexraLayout from "@/components/layout/NexraLayout";
import ChatPanel from "@/components/chat/ChatPanel";
import MetricsPanel from "@/components/metrics/MetricsPanel";

export default function Page() {
  const [mobileTab, setMobileTab] = useState<"chat" | "analysis">("chat");

  return (
    <main className="h-screen bg-neutral-950 py-5 text-neutral-100 flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="shrink-0 max-w-7xl lg:ml-12 px-6 pt-12 pb-4 space-y-2">
        <h1 className="text-2xl font-semibold">
          Nexra — Startup Decision Engine V2
        </h1>
        <p className="text-sm text-neutral-500">
          Talk about your startup idea. Nexra will challenge your thinking.
        </p>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden px-6 pb-3">
        <div className="flex rounded-xl border border-neutral-800 overflow-hidden">
          <button
            onClick={() => setMobileTab("chat")}
            className={`flex-1 py-2 text-sm ${
              mobileTab === "chat"
                ? "bg-neutral-800 text-white"
                : "text-neutral-400"
            }`}
          >
            Chat
          </button>

          <button
            onClick={() => setMobileTab("analysis")}
            className={`flex-1 py-2 text-sm ${
              mobileTab === "analysis"
                ? "bg-neutral-800 text-white"
                : "text-neutral-400"
            }`}
          >
            Analysis
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 overflow-hidden">
        <NexraLayout
          mobileTab={mobileTab}
          sidebar={<MetricsPanel />}
        >
          <ChatPanel />
        </NexraLayout>
      </div>

    </main>
  );
}
