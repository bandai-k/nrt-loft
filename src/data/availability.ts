// src/data/availability.ts
// 空席情報(手動更新)
// 運用時はこのファイルだけ書き換えてください。
//
// 仕組み:
//   1. calendarYear / calendarMonth で表示する月を指定
//   2. weeklyClosedDays で定休曜日を指定(0=日, 1=月, ..., 6=土)
//   3. defaultAvailability で通常営業日のデフォルト残席数を指定
//   4. dayOverrides で個別の日に貸切や残席数を上書き

export type SeatStatus = number | "reserved" | "closed";
// number 0..TOTAL_SEATS = 残席数
// "reserved" = その時間帯は貸切でブロック
// "closed"   = 定休 / 営業外

export type AvailabilityBlock = {
  label: string; // "AM" | "PM"
  range: string; // "10:00 - 13:00"
  status: SeatStatus;
  note?: string;
};

export type AvailabilityDay = {
  date: string; // ISO "2026-05-04"
  day: number; // 1..31
  weekday: string; // "月"
  weekdayIndex: number; // 0=Mon ... 6=Sun (月曜始まり)
  blocks: AvailabilityBlock[];
};

export const TOTAL_SEATS = 3;

export const lastUpdated = "2026年4月28日";

// ──────────────────────────────────────────────
// 設定(運用時はここを書き換え)
// ──────────────────────────────────────────────

export const calendarYear = 2026;
export const calendarMonth = 5; // 1-12

// 定休曜日(0=日, 1=月, 2=火, 3=水, 4=木, 5=金, 6=土)
const weeklyClosedDays: number[] = []; // 定休なし

// 通常営業日のデフォルト残席数(AM / PM)
// オープン準備中につき、現在は全営業日を「終日貸切」扱い。
const defaultAvailability = {
  am: "reserved" as SeatStatus,
  pm: "reserved" as SeatStatus,
};

// 個別日のオーバーライド(キャンセル発生時の手動反映や貸切設定)
const dayOverrides: Record<
  string,
  { am?: SeatStatus; pm?: SeatStatus; amNote?: string; pmNote?: string }
> = {};

// ──────────────────────────────────────────────
// 自動生成(以下は編集不要)
// ──────────────────────────────────────────────

const weekdayNamesJa = ["日", "月", "火", "水", "木", "金", "土"];

// JS の getDay() (0=日..6=土) を月曜始まり (0=月..6=日) に変換
const toMonFirst = (jsDay: number): number => (jsDay + 6) % 7;

const pad2 = (n: number) => String(n).padStart(2, "0");

const daysInMonth = (() => {
  // month は 1-12
  return new Date(calendarYear, calendarMonth, 0).getDate();
})();

export const calendarFirstDayMonFirst: number = toMonFirst(
  new Date(calendarYear, calendarMonth - 1, 1).getDay(),
);

export const monthlyAvailability: AvailabilityDay[] = (() => {
  const days: AvailabilityDay[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${calendarYear}-${pad2(calendarMonth)}-${pad2(day)}`;
    const jsDow = new Date(calendarYear, calendarMonth - 1, day).getDay();
    const isClosed = weeklyClosedDays.includes(jsDow);
    const ov = dayOverrides[date];
    const baseAm: SeatStatus = isClosed ? "closed" : defaultAvailability.am;
    const basePm: SeatStatus = isClosed ? "closed" : defaultAvailability.pm;

    const am: SeatStatus = ov?.am ?? baseAm;
    const pm: SeatStatus = ov?.pm ?? basePm;

    days.push({
      date,
      day,
      weekday: weekdayNamesJa[jsDow],
      weekdayIndex: toMonFirst(jsDow),
      blocks: [
        {
          label: "AM",
          range: "10:00 - 13:00",
          status: am,
          ...(ov?.amNote ? { note: ov.amNote } : {}),
        },
        {
          label: "PM",
          range: "13:00 - 18:00",
          status: pm,
          ...(ov?.pmNote ? { note: ov.pmNote } : {}),
        },
      ],
    });
  }
  return days;
})();

export const calendarMonthLabel = `${calendarYear}年${calendarMonth}月`;

export const availabilityNotes = [
  "AM = 10:00 - 13:00 / PM = 13:00 - 18:00",
  "貸切利用時はその時間帯すべての席が予約されます。",
  "リアルタイム表示ではなく、手動更新です。最新の正確な状況は予約フォームよりご確認ください。",
];
