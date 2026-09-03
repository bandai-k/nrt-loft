// src/components/ui/PageHeader.tsx
export default function PageHeader({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  return (
    <div className="border-b border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        <h1 className="text-[26px] leading-[1.5] md:text-[34px]">{title}</h1>
        {lead && (
          <p className="mt-3 max-w-[36em] text-[14px] leading-[1.95] text-ink-muted md:text-[15px]">
            {lead}
          </p>
        )}
      </div>
    </div>
  );
}
