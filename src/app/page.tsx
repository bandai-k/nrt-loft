// src/app/page.tsx
import Link from "next/link";
import { CTA_LABEL_HERO } from "@/lib/site";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-[1120px] px-5 py-20 md:px-8">
      <h1 className="max-w-[16em] text-[28px] leading-[1.6] md:text-[40px]">
        欲しいものが無かったので、
        <br />
        <span className="marker">自分で作ることにした。</span>
      </h1>
      <Link href="/build" className="btn btn-primary mt-8">
        {CTA_LABEL_HERO}
      </Link>
    </section>
  );
}
