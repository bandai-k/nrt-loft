// src/app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import ConceptSection from "@/components/sections/ConceptSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/ContactSection";
import HomeSidebar from "@/components/layout/HomeSidebar";

export default function HomePage() {
  return (
    <>
      <HomeSidebar />
      <HeroSection />
      <ConceptSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
