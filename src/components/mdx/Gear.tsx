import { getGear } from "@/config/gear";

/** 本文が道具のリンクを使っているか。広告表記を出すかの判定に使う。 */
export function hasGearLinks(body: string): boolean {
  return /<\s*(Gear|UsedGear)\b/.test(body);
}

/**
 * 本文の中で道具に触れるときに使う。カードや画像は出さず、文章の一部として置く。
 * リンク先は src/config/gear.ts が持つ。url が空なら、ただの文字として出る。
 *
 *   使ったのは <Gear id="a4-laminator" /> でした。
 *   <Gear id="a4-laminator">いちばん安いもの</Gear> と書けば表示する文字を変えられる。
 */
export function Gear({ id, children }: { id: string; children?: React.ReactNode }) {
  const item = getGear(id);
  if (!item) return <>{children ?? id}</>;

  const label = children ?? item.name;
  if (!item.url) return <>{label}</>;

  return (
    <a href={item.url} target="_blank" rel="sponsored nofollow noopener noreferrer">
      {label}
    </a>
  );
}

/**
 * 記事の終わりに置く「使ったもの」。値段や星の数は出さず、名前と一行だけにする。
 *
 *   <UsedGear ids="a4-laminator, label-printer" />
 */
export function UsedGear({ ids }: { ids: string | string[] }) {
  const list = Array.isArray(ids) ? ids : String(ids ?? "").split(",");
  const items = list
    .map((id) => id.trim())
    .filter(Boolean)
    .map((id) => ({ id, item: getGear(id) }))
    .filter((entry) => entry.item);
  if (items.length === 0) return null;

  return (
    <aside className="mt-12 border-t border-line pt-6">
      <p className="text-[13px] tracking-[0.08em] text-ink-muted">使ったもの</p>
      <ul className="mt-4 list-none space-y-4 pl-0">
        {items.map(({ id, item }) => (
          <li key={id} className="pl-0">
            <Gear id={id} />
            {item?.note && (
              <span className="mt-1 block text-[13px] leading-[1.85] text-ink-muted">
                {item.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
