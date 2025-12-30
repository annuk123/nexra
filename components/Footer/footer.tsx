import Link from "next/link";
export default function Footer() {
  return (
    <main className="bg-neutral-950 ">
    <footer className="border-t border-neutral-900 mt-32 ">
      <div className="max-w-5xl mx-auto px-6 py-16 text-sm text-neutral-500">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 ">

          {/* Brand */}
          <div>
            <p className="tracking-widest text-neutral-400">
              NEXRA AI
            </p>
            <p className="mt-2 max-w-xs">
              Clarity before commitment.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2 text-neutral-500">
  <Link href="https://x.com/Nexra_Ai" className="hover:text-neutral-300 transition">
    Updates on X
  </Link>
  <Link href="/feedback" className="hover:text-neutral-300 transition">
    Share feedback
  </Link>
  <Link href="/privacy" className="hover:text-neutral-300 transition">
    Privacy
  </Link>
  <Link href="/terms" className="hover:text-neutral-300 transition">
    Terms
    </Link>
</div>


        </div>

        <p className="mt-10 text-xs text-neutral-600">
          © {new Date().getFullYear()} Nexra AI. Built thoughtfully.
        </p>

      </div>
    </footer>
    </main>
  );
}
