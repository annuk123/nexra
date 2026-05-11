import { Section } from "@/design-system/layout/Section";
import FAQ from "@/components/FAQ/FAQ";

import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/footer";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import DemoSection from "@/components/demoSection/demo";
import FounderNote from "@/components/FounderNote/FounderNote";
import Navbar from "@/components/Navbar/nav";

export default function Home() {
  return (
    <main className="  bg-black text-neutral-100">

      <Navbar />
      {/* Hero */}
      
      <Hero  />

      <Section size="md">
        <FounderNote />
</Section>

<Section size="md">
<DemoSection />
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

