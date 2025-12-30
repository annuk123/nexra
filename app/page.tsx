import HowThink from "@/components/How-Nexra-Thinks/how-think";
import SeeAction from "@/components/See-Action/See-Action";
import StaticDemo from "@/components/StaticDemo/StaticDemo";
import Waitlist from "@/components/Waitlist/Waitlist";
import { Section } from "@/design-system/layout/Section";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Hero */}
      <Section size="md">
        <span className="text-xs tracking-widest text-neutral-500">
          NEXRA AI
        </span>

        <h1 className="mt-6 text-5xl sm:text-6xl font-semibold leading-tight max-w-3xl">
          Clarity before
          <br />
          commitment.
        </h1>

        <div className="w-12 h-px bg-neutral-700 my-8" />

        <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed">
          Evaluate startup ideas, uncover blind spots, and make confident
          decisions — before you invest time, money, or energy.
        </p>

        <p className="mt-6 text-sm text-neutral-500 max-w-xl">
          Built for solo founders and indie hackers who prefer signal over
          noise.
        </p>
      </Section>

      {/* How Nexra Thinks */}
      <Section size="sm">
        <HowThink />
      </Section>

      {/* See Nexra in Action */}
      <Section size="sm">
        <SeeAction />
      </Section>

      {/* Static Demo */}
      <Section size="sm">
        <StaticDemo />
      </Section>

      {/* Waitlist */}
      <Section size="sm">
        <Waitlist />
      </Section>
    </main>
  );
}
