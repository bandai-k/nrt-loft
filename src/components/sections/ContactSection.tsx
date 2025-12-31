// src/components/sections/ContactSection.tsx
export default function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-5xl rounded-2xl px-6 py-6"
      style={{ border: "1px solid var(--color-steel-border)", backgroundColor: "var(--color-steel-surface)" }}
    >
      <h2 className="text-lg font-semibold" style={{ color: "var(--color-orbital-steel)" }}>
        Contact
      </h2>
      <p className="mt-2 text-sm leading-6" style={{ color: "var(--color-text-secondary)" }}>
        利用希望やイベント相談は、まずメールで。詳細は個別にすり合わせします。
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold"
          href="mailto:hello@nrt-loft.jp"
          style={{ backgroundColor: "var(--color-orbital-steel)", color: "var(--color-text-on-steel)" }}
        >
          hello@nrt-loft.jp にメール
        </a>
        <a
          className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold"
          href="#"
          style={{ border: "1px solid var(--color-steel-border)", backgroundColor: "var(--color-steel-surface)", color: "var(--color-orbital-steel)" }}
        >
          （準備中）利用案内PDF
        </a>
      </div>
    </section>
  );
}
