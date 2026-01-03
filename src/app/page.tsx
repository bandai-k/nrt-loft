// src/app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import UsageSection from "@/components/sections/UsageSection";
import PolicySection from "@/components/sections/PolicySection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <HeroSection />

      <div className="space-y-16 pb-20 sm:space-y-20">
        <AboutSection />
        <UsageSection />
        <PolicySection />
        <ContactSection />
      </div>
    </main>
  );
}
