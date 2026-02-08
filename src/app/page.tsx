// src/app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StatusSection from "@/components/sections/StatusSection";
import SNSSection from "@/components/sections/SNSSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AccessSection from "@/components/sections/AccessSection";

export default function HomePage() {
  return (
    <main className="min-h-dvh pt-[var(--header-height)]">
      <HeroSection />
      <AboutSection />
      <StatusSection />
      <SNSSection />
      <ServicesSection />
      <AccessSection />
    </main>
  );
}
