// src/components/home/Tools.tsx

// 実物を見せたあとに道具を明かす。ヒーローには置かない。
const TOOLS = ["Claude Code", "Codex"];

export default function Tools() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-x-5 gap-y-3 px-5 py-6 md:px-8">
        <h2 className="text-[13px] text-ink-muted">使っている道具</h2>
        <ul className="flex flex-wrap gap-2">
          {TOOLS.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-line-strong bg-paper px-3 py-1.5 text-[12px] text-ink"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
