import { Section } from "@/design-system/layout/Section";
import FAQ from "@/components/FAQ/FAQ";

import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/footer";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import FounderNote from "@/components/FounderNote/FounderNote";
import Navbar from "@/components/Navbar/nav";
import PricingSection from "@/components/Pricingsection/Pricingsection";
import { WhyNotChatGPTSection } from "@/components/WhyNotChatGPTSection/WhyNotChatGPT";


export default function Home() {
  return (
    <main className="  bg-black text-neutral-100">

      <Navbar />
      
      <Hero  />

<Section size="md">
      <WhyNotChatGPTSection />
      </Section>

<Section size="md">
       <HowItWorks />
      </Section>


      {/* See Nexra in Action */}


            <Section size="md">
        <PricingSection />
      </Section>

            <Section size="md">
        <FAQ />
      </Section>
            <Section size="md">
        <FounderNote />
</Section>
 <Footer />
    </main>
  );
}

