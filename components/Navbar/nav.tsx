"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import MenuIcon from "../menu/menuicon";
import { useRouter } from "next/navigation";

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
  setIsLoggedIn(!!token);
}, [pathname]);
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
    <>
      <header
        className="fixed top-0 w-full z-50 transition-colors duration-500 bg-black/20 backdrop-blur-md border-b border-neutral-800"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium transition-colors duration-500"
            style={{ color: useDarkNav ? "#ffffff" : "#0a0a0a" }}
          >
            <Image
              src="/nexra.png"
              alt="Nexra"
              width={28}
              height={28}
              className="h-6 w-6 bg-black rounded-md"
            />
            <span className="tracking-tight text-neutral-300">Nexra</span>
            <span
              className="text-xs transition-colors duration-500 text-neutral-400"
            >
              / Thinking Partner
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-3 text-xs">
  {!isLoggedIn ? (
    <>
      <Link
        href="/thinking-engine-v2.0"
        className="px-3 py-1.5 rounded-md text-neutral-400 hover:text-white transition"
      >
        Login
      </Link>

      <Link
        href="/thinking-engine-v2.0"
        className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md
        bg-[#e8e6e1] text-[#141414] hover:bg-white active:scale-[0.98]
        transition-all duration-150 no-underline"
      >
        Start thinking
      </Link>
    </>
  ) : (
    <>
      <Link
        href="/thinking-engine-v2.0"
        className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md
        bg-[#e8e6e1] text-[#141414] hover:bg-white active:scale-[0.98]
        transition-all duration-150 no-underline"
      >
        Continue thinking
      </Link>

      <button
        onClick={handleSignOut}
        className="px-3 py-1.5 rounded-md text-neutral-400 hover:text-white transition cursor-pointer"
      >
        Sign out
      </button>
    </>
  )}
</nav>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden transition-colors duration-500"
            style={{ color: useDarkNav ? "#a3a3a3" : "#6b6560" }}
          >
            {mobileOpen ? <X size={20} /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
<div className="flex flex-col gap-4">
  {!isLoggedIn ? (
    <>
      <Link
        href="/thinking-engine-v2.0"
        onClick={() => setMobileOpen(false)}
        className="text-neutral-400 hover:text-white transition"
      >
        Login
      </Link>

      <Link
        href="/thinking-engine-v2.0"
        onClick={() => setMobileOpen(false)}
        className="text-neutral-300 hover:text-white transition"
      >
        Start thinking
      </Link>
    </>
  ) : (
    <>
      <Link
        href="/thinking-engine-v2.0"
        onClick={() => setMobileOpen(false)}
        className="text-neutral-300 hover:text-white transition"
      >
        Continue thinking
      </Link>

      <button
        onClick={() => {
          handleSignOut();
          setMobileOpen(false);
        }}
        className="text-left text-neutral-400 hover:text-white transition"
      >
        Sign out
      </button>
    </>
  )}
</div>
        )}
      </header>

    </>
  );
}