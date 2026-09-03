// src/lib/og.ts
// OGP 画像用のフォント読み込み。
// satori は woff2 を扱えないので、Google Fonts から woff / ttf を取りに行く。
// text= を付けて必要な文字だけに絞ると、数十 KB で済む。

const LEGACY_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Version/5.1 Safari/534.30";

export async function loadOgFont(
  text: string,
  weight: 400 | 700,
): Promise<ArrayBuffer | undefined> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@${weight}&text=${encodeURIComponent(text)}`;
    const cssRes = await fetch(url, { headers: { "User-Agent": LEGACY_UA } });
    if (!cssRes.ok) return undefined;

    const css = await cssRes.text();
    const match = css.match(
      /src:\s*url\((.+?)\)\s*format\('(?:woff|opentype|truetype)'\)/,
    );
    if (!match) return undefined;

    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return undefined;
    return await fontRes.arrayBuffer();
  } catch {
    // フォントが取れなくてもビルドは止めない。欧文の既定フォントで描画される。
    return undefined;
  }
}

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
