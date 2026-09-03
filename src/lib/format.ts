// src/lib/format.ts

/**
 * YYYY-MM-DD を日本語表記にする。
 * 実行環境のタイムゾーンで日付がずれないよう、UTC 固定で整形する。
 */
export function formatDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

/** <time datetime> 用 */
export function toDateTimeAttr(date: string): string {
  return date;
}
