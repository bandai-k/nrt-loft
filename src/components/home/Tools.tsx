// src/components/home/Tools.tsx
import { SparkIcon, TerminalIcon } from "@/components/ui/Icons";

// 実物を見せたあとに道具を明かす。ヒーローには置かない。
const TOOLS = [
  { name: "Claude Code", Icon: SparkIcon },
  { name: "Codex", Icon: TerminalIcon },
];

export default function Tools() {
  return (
    <section className="bg-paper">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-3 border-t border-line px-5 py-7 md:px-8">
        <h2 className="text-[13px] text-ink-muted">使っている道具</h2>
        <ul className="flex flex-wrap gap-2.5">
          {TOOLS.map(({ name, Icon }) => (
            <li
              key={name}
              className="flex items-center gap-2 rounded-lg border border-line-strong bg-paper px-3.5 py-2 text-[12.5px] text-ink"
            >
              <Icon className="h-[15px] w-[15px] text-ink-muted" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
