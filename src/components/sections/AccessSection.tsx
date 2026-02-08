// src/components/sections/AccessSection.tsx
import Reveal from "@/components/ui/Reveal";

export default function AccessSection() {
  return (
    <section id="access" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2
            className="mb-10 text-xl font-bold tracking-wide sm:text-2xl"
            style={{ color: "var(--color-orbital-steel)" }}
          >
            アクセス
          </h2>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="space-y-2">
            <p
              className="text-sm sm:text-base"
              style={{ color: "var(--color-text-primary)" }}
            >
              〒286-0033 千葉県成田市花崎町
            </p>
            <p
              className="text-sm sm:text-base"
              style={{ color: "var(--color-text-primary)" }}
            >
              旧山中釣具店 2階
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={200}>
          <div className="mt-8 overflow-hidden rounded-2xl" style={{ border: "1px solid var(--color-steel-border)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.5!2d140.316!3d35.776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5oiQ55Sw5biC6Iqx5bSO55S6!5e0!3m2!1sja!2sjp!4v1700000000000"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NRT LOFT 所在地"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
