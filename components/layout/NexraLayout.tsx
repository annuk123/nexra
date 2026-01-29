// components/layout/NexraLayout.tsx
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function NexraLayout({ children, sidebar }: Props) {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

        {/* LEFT: CHAT PANEL */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sm:p-6 flex flex-col h-[calc(100vh-6rem)]">
          {children}
        </div>

        {/* RIGHT: METRICS PANEL */}
        <aside className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-6 lg:sticky lg:top-6 h-fit">
          {sidebar}
        </aside>

      </div>
    </div>
  );
}
