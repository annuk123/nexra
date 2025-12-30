import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexra AI — Feedback",
  description:
    "Share feedback to help shape Nexra thoughtfully and intentionally.",

  openGraph: {
    title: "Help shape Nexra",
    url: "https://nexra.pixelui.studio/feedback", 
    description:
      "Your feedback helps us avoid building the wrong thing.",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Nexra AI Feedback",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Help shape Nexra",
    description:
      "Your feedback helps us avoid building the wrong thing.",
    images: ["/image.png"],
  },
};

import Feedback from "@/components/FeedbackPage/Feedback";
import { Section } from "@/design-system/layout/Section";

export default function FeedbackPage() {
  return (
    <main className=" bg-neutral-950">
      <Section size="sm">
        <Feedback />
      </Section>
    </main>
  );
}
