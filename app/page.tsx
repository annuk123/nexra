import HowThink from "@/components/How-Nexra-Thinks/how-think";
import SeeAction from "@/components/See-Action/See-Action";
import StaticDemo from "@/components/StaticDemo/StaticDemo";
import Waitlist from "@/components/Waitlist/Waitlist";
import { Section } from "@/design-system/layout/Section";
import Link from "next/link";

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
        <div className="mt-8">
        <Link
          href="#join-waitlist"
          className="inline-flex items-center text-sm text-neutral-300 hover:text-neutral-100 transition"
        >
          Join waitlist →
        </Link>
      </div>
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

<section className="max-w-3xl mx-auto px-6 py-32">
  <span className="text-xs tracking-widest text-neutral-500">
    WHEN NEXRA IS USEFUL
  </span>

  <h2 className="mt-4 text-2xl sm:text-3xl font-semibold max-w-xl">
    Use Nexra when clarity matters more than speed.
  </h2>

  <div className="mt-10 space-y-4 text-neutral-400 max-w-xl">
    <p>— You’re deciding <span className="text-neutral-300">what to build</span>, not how to build it</p>
    <p>— You want to surface assumptions before committing time or money</p>
    <p>— You feel momentum pushing you forward, but certainty hasn’t caught up</p>
    <p>— You prefer structured thinking over open-ended advice</p>
    <p>— You’d rather pause and think than ship the wrong thing</p>
  </div>
</section>

      {/* Waitlist */}
      <Section size="sm">
        <Waitlist />
      </Section>

          <section className="max-w-3xl mx-auto px-6 py-32">
      <span className="text-xs tracking-widest text-neutral-500">
        FEEDBACK
      </span>

      <h2 className="mt-4 text-2xl sm:text-3xl font-semibold max-w-xl">
        Help us think better.
      </h2>

      <p className="mt-4 text-neutral-400 max-w-xl">
        If something resonated — or didn’t — we’d appreciate your perspective.
        Your feedback helps us avoid building the wrong thing.
      </p>

      <div className="mt-8">
        <Link
          href="/feedback"
          className="inline-flex items-center text-sm text-neutral-300 hover:text-neutral-100 transition"
        >
          Share feedback →
        </Link>
      </div>
    </section>
    </main>
  );
}
