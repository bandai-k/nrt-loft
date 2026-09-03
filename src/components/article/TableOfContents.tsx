// src/components/article/TableOfContents.tsx
import type { TocEntry } from "@/lib/toc";

function List({ entries }: { entries: TocEntry[] }) {
  return (
    <ol className="space-y-2.5">
      {entries.map((entry) => (
        <li key={entry.id} className={entry.depth === 3 ? "pl-4" : undefined}>
          <a
            href={`#${entry.id}`}
            className="block text-[13px] leading-[1.7] text-ink-muted transition-colors hover:text-ink"
          >
            {entry.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * variant="inline" はモバイル用の折りたたみ、"aside" は広い画面の追従目次。
 * 同じ内容を2つ出すと目次のランドマークが重複するので、呼び出し側で出し分ける。
 */
export default function TableOfContents({
  entries,
  variant,
}: {
  entries: TocEntry[];
  variant: "inline" | "aside";
}) {
  // 見出しが1つだけの記事に目次は要らない
  if (entries.length < 2) return null;

  if (variant === "inline") {
    return (
      <details className="mb-8 rounded-lg border border-line bg-paper-alt px-4 py-3">
        <summary className="cursor-pointer text-[13px] font-medium">目次</summary>
        <nav className="mt-3" aria-label="目次">
          <List entries={entries} />
        </nav>
      </details>
    );
  }

  return (
    <nav
      className="sticky"
      style={{ top: "calc(var(--header-height) + 32px)" }}
      aria-label="目次"
    >
      <h2 className="mb-3 text-[10px] font-medium tracking-[0.24em] text-ink-faint">
        INDEX
      </h2>
      <List entries={entries} />
    </nav>
  );
}
