// components/layout/NexraLayout.tsx
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function NexraLayout({ children, sidebar }: Props) {
  return (
    <div className="h-full overflow-hidden bg-neutral-950">
      <div
        className="
          max-w-7xl mx-auto px-4 lg:px-6
          grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6
          h-full
        "
      >
        {/* LEFT: CHAT PANEL */}
        <div
          className="
            bg-neutral-950
            border border-neutral-800
            rounded-2xl
            p-4 sm:p-6
            flex flex-col
            overflow-hidden
          "
        >
          {children}
        </div>

        {/* RIGHT: METRICS PANEL */}

        <aside
          className="
            bg-neutral-950
            border border-neutral-800
            rounded-2xl
            p-4 sm:p-6
            flex flex-col
            overflow-y-auto
          "
        >
          <div className="flex-1  space-y-6 pr-2">
            {sidebar}
          </div>
        </aside>
      </div>
    </div>
  );
}

