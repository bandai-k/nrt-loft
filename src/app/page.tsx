// src/app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StatusSection from "@/components/sections/StatusSection";
import SNSSection from "@/components/sections/SNSSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PricingSection from "@/components/PricingSection";
import AccessSection from "@/components/sections/AccessSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatusSection />
      <SNSSection />
      <ServicesSection />
      <PricingSection />
      <AccessSection />
    </>
  );
}
