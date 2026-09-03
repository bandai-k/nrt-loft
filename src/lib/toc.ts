// src/lib/toc.ts
import GithubSlugger from "github-slugger";

export type TocEntry = {
  depth: 2 | 3;
  text: string;
  id: string;
};

/** 見出しに残るインライン記法を落として、表示テキストと slug の元を作る。 */
function toPlainText(markdown: string): string {
  return markdown
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\*([^*]*)\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .trim();
}

/**
 * MDX 本文から h2 / h3 を拾って目次を組む。
 * id は rehype-slug と同じ github-slugger で採番するため、
 * 実際に描画される見出しの id と一致する。
 */
export function buildToc(body: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;
  let fenceMarker = "";

  for (const line of body.split("\n")) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      const marker = fence[1];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker[0];
      } else if (marker[0] === fenceMarker) {
        inFence = false;
      }
      continue;
    }
    if (inFence) continue;

    const heading = line.match(/^(#{2,3})\s+(.*\S)\s*$/);
    if (!heading) continue;

    const text = toPlainText(heading[2]);
    if (!text) continue;

    entries.push({
      depth: heading[1].length as 2 | 3,
      text,
      id: slugger.slug(text),
    });
  }

  return entries;
}
