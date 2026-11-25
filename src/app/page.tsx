import Hero from "@/components/home/Hero";
import EventHighlights from "@/components/home/EventHighlights";
import PrizesSection from "@/components/home/PrizesSection";
import HandbookBooksSection from "@/components/home/HandbookBooksSection";
import RegistrationPricing from "@/components/home/RegistrationPricing";
import FAQSection from "@/components/home/FAQSection";
import ContactCTASection from "@/components/home/ContactCTASection";

export default function Home() {
  return (
    <>
      {/* SECTION 01 — HERO */}
      <Hero />

      {/* SECTION 02 — EVENT HIGHLIGHTS */}
      <EventHighlights />

      {/* SECTION 03 — PRIZES AND RECOGNITION */}
      <PrizesSection />

      {/* SECTION 04 — INTERACTIVE EVENT HANDBOOK */}
      <HandbookBooksSection />

      {/* SECTION 05 — PARTICIPATION AND REGISTRATION */}
      <RegistrationPricing />

      {/* SECTION 06 — FAQ */}
      <FAQSection />

      {/* SECTION 07 — CONTACT AND FINAL CTA */}
      <ContactCTASection />
    </>
  );
}
