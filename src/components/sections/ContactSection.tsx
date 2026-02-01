// src/components/sections/ContactSection.tsx
import Reveal from "@/components/ui/Reveal";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="
        mx-auto w-full max-w-5xl px-6
        scroll-mt-28
        py-14 sm:py-16
      "
    >
      <Reveal y={14} durationMs={900}>
        <div className="mb-6 sm:mb-8">
          <h2
            id="use-heading"
            className="text-xl font-semibold tracking-wide"
            style={{ color: "var(--color-orbital-steel)" }}
          >
            Contact
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            利用希望やイベント相談は、まずメールで。詳細は個別にすり合わせします。
          </p>
        </div>
      </Reveal>

      <Reveal y={16} durationMs={900}>
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            border: "1px solid var(--color-steel-border)",
            backgroundColor: "var(--color-steel-surface)",
          }}
        >
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <span
              className="
                inline-flex items-center justify-center rounded-xl px-5 py-3
                text-sm font-semibold select-none
              "
              aria-disabled="true"
              style={{
                border: "1px solid var(--color-steel-border)",
                backgroundColor: "var(--color-steel-surface)",
                color: "var(--color-orbital-steel)",
                opacity: 0.65,
                cursor: "not-allowed",
              }}
            >
              （準備中）メールでお問い合わせ
            </span>

            {/* 準備中：クリック不可にする（イベントなし） */}
            <span
              className="
                inline-flex items-center justify-center rounded-xl px-5 py-3
                text-sm font-semibold select-none
              "
              aria-disabled="true"
              style={{
                border: "1px solid var(--color-steel-border)",
                backgroundColor: "var(--color-steel-surface)",
                color: "var(--color-orbital-steel)",
                opacity: 0.65,
                cursor: "not-allowed",
              }}
            >
              （準備中）利用案内PDF
            </span>
          </div>

          <p className="mt-4 text-xs text-secondary">
            ※返信は通常24〜48時間以内を目安にしています（繁忙期は前後します）
          </p>
        </div>
      </Reveal>
    </section>
  );
}
