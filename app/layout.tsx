import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/footer";
import { ConvexAppProvider } from "@/components/ConvexProvider/ConvexProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexra AI - Clarity before commitment",
  description:
    "Evaluate startup ideas, uncover blind spots, and make confident decisions before you invest time, money, or energy.",

  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Nexra AI - Clarity before commitment",
    description:
      "A thoughtful way to evaluate startup ideas before you commit.",
    url: "https://nexra.pixelui.studio/", // change after deploy
    siteName: "Nexra AI",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nexra AI",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nexra AI - Clarity before commitment",
    description:
      "Evaluate startup ideas with structured thinking, not hype.",
    images: ["/og.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black `}
      >
        <ConvexAppProvider>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </ConvexAppProvider>
      </body>
    </html>
  );
}
