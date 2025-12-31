// src/components/ui/Card.tsx
interface CardProps {
  title: string;
  description: string;
}

export default function Card({ title, description }: CardProps) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        border: "1px solid var(--color-steel-border)",
        backgroundColor: "var(--color-steel-surface)",
      }}
    >
      <div className="text-sm font-semibold" style={{ color: "var(--color-orbital-steel)" }}>
        {title}
      </div>
      <p className="mt-2 text-sm leading-6" style={{ color: "var(--color-text-secondary)" }}>
        {description}
      </p>
    </div>
  );
}
