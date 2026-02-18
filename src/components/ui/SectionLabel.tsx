// src/components/ui/SectionLabel.tsx
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span
        className="text-[11px] tracking-[0.4em]"
        style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
      >
        {children}
      </span>
      <div className="h-px flex-1" style={{ background: "rgba(217,119,6,0.2)" }} />
    </div>
  );
}
