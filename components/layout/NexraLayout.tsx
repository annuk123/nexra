// components/layout/NexraLayout.tsx

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function NexraLayout({ children, sidebar }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT: CHAT PANEL */}
      <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 rounded-xl p-6 flex flex-col h-162.5">
        {children}
      </div>

      {/* RIGHT: METRICS PANEL */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-6 sticky top-10 h-fit">
        {sidebar}
      </div>

    </div>
  );
}
