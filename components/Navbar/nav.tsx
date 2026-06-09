"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import MenuIcon from "../menu/menuicon";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // On non-home routes, always use dark mode
  // On home, use scroll position to decide
  const useDarkNav = !isHomePage || scrolledPastHero;
  const router = useRouter();


  useEffect(() => {
  const token = localStorage.getItem("nexra_access_token");
  if (!token) {
    setIsLoggedIn(false);
    return;
  }
  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("nexra_access_token");
      localStorage.removeItem("nexra_refresh_token");
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  } catch {
    setIsLoggedIn(false);
  }
}, [pathname]);


  const linkBase =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200";
  const secondaryLink =
    "text-zinc-400 hover:text-zinc-100";
  const primaryLink =
    "inline-flex items-center justify-center rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-teal-400 active:scale-[0.98]";


 const handleSignOut = () => {
  localStorage.removeItem("nexra_access_token");
  localStorage.removeItem("nexra_refresh_token");
  localStorage.removeItem("nexra_conversation_id");
  localStorage.removeItem("nexra_chat_history");
  document.cookie = "nexra_access_token=; path=/; max-age=0; SameSite=Lax";
  setIsLoggedIn(false);
  router.push("/");
};


  useEffect(() => {
    // Reset scroll state on route change
    setScrolledPastHero(false);

    if (!isHomePage) return;

    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setScrolledPastHero(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to catch any initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, pathname]);


 return (
     <header className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-[#0C0C0E]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-medium text-zinc-100"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/nexra.png"
            alt="Nexra"
            width={28}
            height={28}
            className="h-7 w-7 rounded-md"
          />
          <span className="tracking-tight">Nexra</span>
          <span className="hidden text-xs text-zinc-500 sm:inline">
            / Thinking Partner
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {!isLoggedIn ? (
            <>
              <Link
                href="/thinking-engine-v2.0"
                className={`${linkBase} ${secondaryLink}`}
              >
                Login
              </Link>

              <Link href="/thinking-engine-v2.0" className={primaryLink}>
                Start thinking
              </Link>
            </>
          ) : (
            <>
              <Link href="/thinking-engine-v2.0" className={primaryLink}>
                Continue thinking
              </Link>

              <button
                onClick={handleSignOut}
                className={`${linkBase} ${secondaryLink}`}
              >
                Sign out
              </button>
            </>
          )}
        </nav>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
<AnimatePresence>
  {mobileOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setMobileOpen(false)}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed left-0 top-0 z-50
          h-screen w-[85%] max-w-xs
          border-r border-zinc-800
          bg-[#0C0C0E]
        "
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-5">
          <div className="flex items-center gap-2">
            <Image
              src="/nexra.png"
              alt="Nexra"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="font-medium text-zinc-100">
              Nexra
            </span>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="text-zinc-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col p-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/thinking-engine-v2.0"
                className="rounded-lg px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/thinking-engine-v2.0"
                className="mt-2 rounded-lg bg-teal-400 px-4 py-3 font-medium text-zinc-950"
              >
                Start thinking
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/thinking-engine-v2.0"
                className="rounded-lg bg-teal-400 px-4 py-3 font-medium text-zinc-950"
              >
                Continue thinking
              </Link>

              <button
                onClick={handleSignOut}
                className="mt-2 rounded-lg px-4 py-3 text-left text-zinc-400 hover:bg-zinc-900 hover:text-white"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </header>
  );
}