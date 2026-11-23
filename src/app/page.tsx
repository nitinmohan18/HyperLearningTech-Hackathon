import Hero from "@/components/home/Hero";
import EventHighlights from "@/components/home/EventHighlights";
import PrizesSection from "@/components/home/PrizesSection";
import ScheduleSection from "@/components/home/ScheduleSection";
import RegistrationPricing from "@/components/home/RegistrationPricing";
import HowItWorks from "@/components/home/HowItWorks";
import JudgingSection from "@/components/home/JudgingSection";
import GithubSubmissionSection from "@/components/home/GithubSubmissionSection";
import RulesSection from "@/components/home/RulesSection";
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

      {/* SECTION 04 — EVENT SCHEDULE */}
      <ScheduleSection />

      {/* SECTION 05 — PARTICIPATION AND REGISTRATION */}
      <RegistrationPricing />

      {/* SECTION 06 — HOW IT WORKS */}
      <HowItWorks />

      {/* SECTION 07 — JUDGING AND SCORING */}
      <JudgingSection />

      {/* SECTION 08 — GITHUB AND PROJECT SUBMISSION */}
      <GithubSubmissionSection />

      {/* SECTION 09 — RULES AND GUIDELINES */}
      <RulesSection />

      {/* SECTION 10 — FAQ */}
      <FAQSection />

      {/* SECTION 11 — CONTACT AND FINAL CTA */}
      <ContactCTASection />
    </>
  );
}
