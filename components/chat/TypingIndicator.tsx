import Image from "next/image";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-xs text-neutral-500">
      <div className="w-8 h-8 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center animate-pulse">

        <Image
src="/nexra-logo.png" alt="Nexra" width={30} height={30}
  className="rounded-full animate-spin-slow drop-shadow-[0_0_6px_rgba(234,179,8,0.4)]"
/>

      </div>
     Nexra is evaluating your idea...
    </div>
  );
}
