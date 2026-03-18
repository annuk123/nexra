import { Section } from "@/design-system/layout/Section";
import FAQ from "@/components/FAQ/FAQ";

import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/footer";
import HowItWorks from "@/components/HowItWorks/HowItWorks";

export default function Home() {
  return (
    <main className="  bg-black text-neutral-100">
      {/* Hero */}
      
      <Hero  />

<Section size="md">
  {/* add a wrapper div with reduced bottom padding */}
  <div className="pb-0 h-100 flex flex-col justify-center">
    <p className="text-xs tracking-widest text-neutral-500">
      FOUNDER MANIFESTO
    </p>
    <h2 className="mt-4 text-3xl font-semibold">
      Clarity &gt; Speed
    </h2>
    <div className="mt-6 space-y-4 max-w-2xl text-neutral-300 text-lg leading-relaxed">
      <p>Startups don't fail because founders move too slowly. They fail because founders move fast in the wrong direction.</p>
      <p>Nexra is built for the moment before commitment — when assumptions are still invisible and decisions are still reversible.</p>
    </div>
  </div>
</Section>

<Section size="md">
       <HowItWorks />
      </Section>


      {/* See Nexra in Action */}
      <Section size="md">
        <FAQ />
      </Section>
 <Footer />
    </main>
  );
}

