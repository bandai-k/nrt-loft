// src/components/ui/Badge.tsx
interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs"
      style={{
        border: "1px solid var(--color-steel-border)",
        backgroundColor: "var(--color-steel-surface)",
        color: "var(--color-orbital-steel)",
      }}
    >
      {children}
    </span>
  );
}
