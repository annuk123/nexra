
import PricingSection from "@/components/Pricingsection/Pricingsection";
import Link from "next/dist/client/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#1a1500] text-white py-12 px-4">

      <Link
      href="/"
      className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.5c0 .806-.337 1.531-.852 2.031L3 15m0 0l3.781-3M3 15h8.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Back to home
    </Link> 
  <PricingSection />
  </div>
);
}