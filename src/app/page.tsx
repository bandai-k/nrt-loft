// src/app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import UsageSection from "@/components/sections/UsageSection";
import PolicySection from "@/components/sections/PolicySection";
import ContactSection from "@/components/sections/ContactSection";
import ScrollNavigation from "@/components/nav/ScrollNavigation";

export default function HomePage() {
  return (
    <main id="top" className="min-h-dvh pt-[var(--header-height)]">
      <ScrollNavigation />

      <HeroSection />

      {/* ↓ モバイル下ナビ分だけ pb を増やす */}
      <div className="space-y-16 pb-28 sm:space-y-20 lg:pb-20">
        <AboutSection />
        <UsageSection />
        <PolicySection />
        <ContactSection />
      </div>
    </main>
  );
}
