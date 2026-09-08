// src/components/ui/SectionHeading.tsx
// トップページの節見出し。左に金のシンボルを添えて、
// 記事本文の h2 とは別物であることを見た目で分ける。
import { MARK_IMAGE, MARK_IMAGE_ASPECT } from "@/lib/images";

export default function SectionHeading({
  children,
  size = "lg",
  id,
}: {
  children: React.ReactNode;
  /** lg = 主要セクション、sm = 3カラムの小見出し */
  size?: "lg" | "sm";
  id?: string;
}) {
  const large = size === "lg";

  return (
    <h2
      id={id}
      className={`flex items-center ${large ? "gap-3.5 text-[20px] md:text-[23px]" : "gap-2.5 text-[17px]"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MARK_IMAGE}
        alt=""
        aria-hidden="true"
        className="w-auto shrink-0"
        style={{ height: large ? 28 : 22, aspectRatio: MARK_IMAGE_ASPECT }}
      />
      {children}
    </h2>
  );
}
