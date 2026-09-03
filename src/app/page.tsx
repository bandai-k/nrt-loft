// src/app/page.tsx
import { WebSiteStructuredData } from "@/components/StructuredData";
import Hero from "@/components/home/Hero";
import LatestBuild from "@/components/home/LatestBuild";
import Tools from "@/components/home/Tools";
import Categories from "@/components/home/Categories";
import LatestAboutFollow from "@/components/home/LatestAboutFollow";
import NebulabBand from "@/components/home/NebulabBand";

export default function HomePage() {
  return (
    <>
      <WebSiteStructuredData />
      <Hero />
      <LatestBuild />
      <Tools />
      <Categories />
      <LatestAboutFollow />
      <NebulabBand />
    </>
  );
}
