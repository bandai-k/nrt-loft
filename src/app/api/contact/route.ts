// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// ──────────────────────────────────────────────
// 共通定義
// ──────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// レガシー(ContactSection / DayReservationModal)向け
const LEGACY_INQUIRY_TYPES = ["drop-in", "membership", "business", "other"] as const;
type LegacyInquiryType = (typeof LEGACY_INQUIRY_TYPES)[number];
const LEGACY_INQUIRY_LABELS: Record<LegacyInquiryType, string> = {
  "drop-in": "ドロップイン利用希望",
  membership: "月額プラン検討中",
  business: "法人利用・登記相談",
  other: "その他",
};

// BookingForm 向け
const PLAN_TYPES = ["drop-in", "light", "regular", "reserved", "consultation"] as const;
type PlanType = (typeof PLAN_TYPES)[number];

const PLAN_LABELS: Record<PlanType, string> = {
  "drop-in": "ドロップイン",
  light: "ライトメンバー",
  regular: "月額レギュラー",
  reserved: "貸切",
  consultation: "その他相談",
};

const PLAN_PRICE_INFO: Record<PlanType, string> = {
  "drop-in": "¥1,200 / 3時間",
  light: "¥7,800 / 月",
  regular: "¥15,000 / 月",
  reserved: "¥4,000 / 2時間〜",
  consultation: "ご相談",
};

const PLAN_NEXT_ACTIONS: Record<PlanType, string[]> = {
  "drop-in": [
    "✅ カレンダーで空き状況を確認",
    "✅ Stripe Payment Link を発行(Drop-In Price)",
    "✅ 利用者にメール返信(空き有無 + Stripe Link + SESAME暗証番号送信予告)",
    "✅ 決済確認後に SESAME 暗証番号を発行・送信",
  ],
  light: [
    "✅ Stripe Subscription Link を発行(Light Plan Monthly)",
    "✅ 利用者にメール返信(加入手続き + 利用開始日 + 暗証番号は決済後)",
    "✅ 決済確認後、永続的な暗証番号と利用ガイドを送信",
  ],
  regular: [
    "✅ Stripe Subscription Link を発行(Regular Monthly Price)",
    "✅ 利用者にメール返信(加入手続き + 利用開始日 + 法人登記オプション可否)",
    "✅ 決済確認後、永続的な暗証番号と利用ガイドを送信",
  ],
  reserved: [
    "✅ 利用人数・時間・目的を確認",
    "✅ 必要に応じて見積メール返信",
    "✅ 決定後、Stripe Payment Link 発行(時間別カスタム価格)",
    "✅ 決済確認後、当日の暗証番号を送信",
  ],
  consultation: [
    "✅ ご相談内容を確認",
    "✅ メール / LINE で対応(必要なら通話・面談を提案)",
  ],
};

const TIME_SLOT_LABELS: Record<string, string> = {
  "08-11": "08:00 - 11:00",
  "11-14": "11:00 - 14:00",
  "14-17": "14:00 - 17:00",
  "17-20": "17:00 - 20:00",
  "19-22": "19:00 - 22:00",
};

const RESERVED_DURATION_LABELS: Record<string, string> = {
  "2h": "2時間 / ¥4,000",
  "3h": "3時間 / ¥5,500",
  "4h": "4時間 / ¥7,000",
  "6h": "6時間 / ¥10,000",
  "8h": "8時間(1日定額) / ¥13,000",
};

// ──────────────────────────────────────────────
// 型定義
// ──────────────────────────────────────────────

type LegacyPayload = {
  kind: "legacy";
  name: string;
  email: string;
  inquiryType: LegacyInquiryType;
  message: string;
  preferredDate?: string;
};

type BookingPayload = {
  kind: "booking";
  name: string;
  email: string;
  phone?: string;
  planType: PlanType;
  dropInDate?: string;
  dropInTimeSlot?: string;
  membershipStartDate?: string;
  registrationOption?: boolean;
  reservedDate?: string;
  reservedDuration?: string;
  reservedAttendees?: number;
  reservedPurpose?: string;
  message?: string;
  preferredContact: "email" | "phone";
  agreesToPolicy: true;
};

type Payload = LegacyPayload | BookingPayload;

// ──────────────────────────────────────────────
// バリデーション
// ──────────────────────────────────────────────

function validate(
  raw: unknown,
): { ok: true; data: Payload } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "リクエスト本文が不正です。" };
  }
  const body = raw as Record<string, unknown>;

  // 共通: name
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) return { ok: false, error: "お名前を入力してください。" };
  if (name.length > 50)
    return { ok: false, error: "お名前は50文字以内で入力してください。" };

  // 共通: email
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) return { ok: false, error: "メールアドレスを入力してください。" };
  if (!EMAIL_REGEX.test(email))
    return { ok: false, error: "メールアドレスの形式が正しくありません。" };

  // BookingForm 形式判定: planType フィールドがあれば新形式
  if (typeof body.planType === "string") {
    const planType = body.planType as string;
    if (!PLAN_TYPES.includes(planType as PlanType)) {
      return { ok: false, error: "プランの種別が不正です。" };
    }
    if (body.agreesToPolicy !== true) {
      return {
        ok: false,
        error: "利用規約・キャンセルポリシーにご同意ください。",
      };
    }
    const preferredContact =
      body.preferredContact === "phone" ? "phone" : "email";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (planType === "consultation") {
      if (message.length < 10) {
        return {
          ok: false,
          error: "ご相談内容を10文字以上で入力してください。",
        };
      }
    }
    if (message.length > 2000) {
      return {
        ok: false,
        error: "メッセージは2000文字以内で入力してください。",
      };
    }

    let reservedAttendees: number | undefined;
    if (planType === "reserved") {
      const n = body.reservedAttendees;
      if (typeof n === "number" && n >= 1 && n <= 5) {
        reservedAttendees = n;
      }
    }

    return {
      ok: true,
      data: {
        kind: "booking",
        name,
        email,
        phone: phone || undefined,
        planType: planType as PlanType,
        dropInDate:
          typeof body.dropInDate === "string"
            ? body.dropInDate.trim() || undefined
            : undefined,
        dropInTimeSlot:
          typeof body.dropInTimeSlot === "string"
            ? body.dropInTimeSlot.trim() || undefined
            : undefined,
        membershipStartDate:
          typeof body.membershipStartDate === "string"
            ? body.membershipStartDate.trim() || undefined
            : undefined,
        registrationOption:
          typeof body.registrationOption === "boolean"
            ? body.registrationOption
            : undefined,
        reservedDate:
          typeof body.reservedDate === "string"
            ? body.reservedDate.trim() || undefined
            : undefined,
        reservedDuration:
          typeof body.reservedDuration === "string"
            ? body.reservedDuration.trim() || undefined
            : undefined,
        reservedAttendees,
        reservedPurpose:
          typeof body.reservedPurpose === "string"
            ? body.reservedPurpose.trim() || undefined
            : undefined,
        message: message || undefined,
        preferredContact,
        agreesToPolicy: true,
      },
    };
  }

  // レガシー形式
  const inquiryTypeRaw =
    typeof body.inquiryType === "string" ? body.inquiryType : "";
  if (!LEGACY_INQUIRY_TYPES.includes(inquiryTypeRaw as LegacyInquiryType)) {
    return { ok: false, error: "問い合わせ種別を選択してください。" };
  }
  const inquiryType = inquiryTypeRaw as LegacyInquiryType;

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (message.length < 10)
    return { ok: false, error: "メッセージは10文字以上で入力してください。" };
  if (message.length > 2000)
    return { ok: false, error: "メッセージは2000文字以内で入力してください。" };

  const preferredDate =
    typeof body.preferredDate === "string" ? body.preferredDate.trim() : "";

  return {
    ok: true,
    data: {
      kind: "legacy",
      name,
      email,
      inquiryType,
      message,
      preferredDate: preferredDate || undefined,
    },
  };
}

// ──────────────────────────────────────────────
// エスケープ
// ──────────────────────────────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ──────────────────────────────────────────────
// Booking テンプレート(運営者宛)
// ──────────────────────────────────────────────

function bookingOperatorText(d: BookingPayload): string {
  const lines = [
    `[NRT-LOFT 予約・申込] ${PLAN_LABELS[d.planType]} - ${d.name}様`,
    "",
    "NRT-LOFT 予約・申込フォームから新規申込がありました。",
    "",
    "== 基本情報 ==",
    `お名前         : ${d.name}`,
    `メール         : ${d.email}`,
  ];
  if (d.phone) lines.push(`電話           : ${d.phone}`);
  lines.push(
    `希望連絡方法   : ${d.preferredContact === "email" ? "メール" : "電話"}`,
    "",
    "== 利用希望プラン ==",
    `${PLAN_LABELS[d.planType]}(${PLAN_PRICE_INFO[d.planType]})`,
    "",
  );

  // プラン別詳細
  if (d.planType === "drop-in") {
    lines.push("== ドロップイン詳細 ==");
    if (d.dropInDate) lines.push(`利用希望日     : ${d.dropInDate}`);
    if (d.dropInTimeSlot)
      lines.push(
        `希望時間帯     : ${TIME_SLOT_LABELS[d.dropInTimeSlot] ?? d.dropInTimeSlot}`,
      );
    lines.push("");
  } else if (d.planType === "light" || d.planType === "regular") {
    lines.push("== 月額会員詳細 ==");
    if (d.membershipStartDate)
      lines.push(`利用開始希望日 : ${d.membershipStartDate}`);
    lines.push(
      `法人登記オプション: ${d.registrationOption ? "希望" : "希望しない"}`,
    );
    lines.push("");
  } else if (d.planType === "reserved") {
    lines.push("== 貸切詳細 ==");
    if (d.reservedDate) lines.push(`利用希望日     : ${d.reservedDate}`);
    if (d.reservedDuration)
      lines.push(
        `利用時間       : ${RESERVED_DURATION_LABELS[d.reservedDuration] ?? d.reservedDuration}`,
      );
    if (d.reservedAttendees)
      lines.push(`利用人数       : ${d.reservedAttendees}名`);
    if (d.reservedPurpose) {
      lines.push("利用目的       :");
      lines.push(d.reservedPurpose);
    }
    lines.push("");
  }

  if (d.message) {
    lines.push("== ご質問・備考 ==");
    lines.push(d.message);
    lines.push("");
  }

  lines.push("== 次のアクション ==");
  for (const a of PLAN_NEXT_ACTIONS[d.planType]) lines.push(a);
  lines.push("");

  lines.push("== 利用規約への同意 ==");
  lines.push(`✅ 同意済み(${new Date().toISOString()})`);

  return lines.join("\n");
}

function bookingOperatorHtml(d: BookingPayload): string {
  const escapeMultiline = (s: string) =>
    `<div style="white-space:pre-wrap;">${escapeHtml(s)}</div>`;

  const rows: Array<[string, string]> = [
    ["お名前", d.name],
    ["メール", d.email],
  ];
  if (d.phone) rows.push(["電話", d.phone]);
  rows.push([
    "希望連絡方法",
    d.preferredContact === "email" ? "メール" : "電話",
  ]);
  rows.push(["プラン", `${PLAN_LABELS[d.planType]}(${PLAN_PRICE_INFO[d.planType]})`]);

  if (d.planType === "drop-in") {
    if (d.dropInDate) rows.push(["利用希望日", d.dropInDate]);
    if (d.dropInTimeSlot)
      rows.push([
        "希望時間帯",
        TIME_SLOT_LABELS[d.dropInTimeSlot] ?? d.dropInTimeSlot,
      ]);
  } else if (d.planType === "light" || d.planType === "regular") {
    if (d.membershipStartDate)
      rows.push(["利用開始希望日", d.membershipStartDate]);
    rows.push([
      "法人登記オプション",
      d.registrationOption ? "希望" : "希望しない",
    ]);
  } else if (d.planType === "reserved") {
    if (d.reservedDate) rows.push(["利用希望日", d.reservedDate]);
    if (d.reservedDuration)
      rows.push([
        "利用時間",
        RESERVED_DURATION_LABELS[d.reservedDuration] ?? d.reservedDuration,
      ]);
    if (d.reservedAttendees) rows.push(["利用人数", `${d.reservedAttendees}名`]);
  }

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;color:#92400e;font-weight:normal;white-space:nowrap;">${escapeHtml(
          k,
        )}</th><td style="padding:6px 0;color:#1f2937;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const purposeBlock =
    d.planType === "reserved" && d.reservedPurpose
      ? `<div style="border-top:1px solid #e5e7eb;padding-top:16px;margin-bottom:16px;"><div style="color:#92400e;font-size:12px;margin-bottom:8px;">利用目的</div>${escapeMultiline(
          d.reservedPurpose,
        )}</div>`
      : "";

  const messageBlock = d.message
    ? `<div style="border-top:1px solid #e5e7eb;padding-top:16px;margin-bottom:16px;"><div style="color:#92400e;font-size:12px;margin-bottom:8px;">ご質問・備考</div>${escapeMultiline(
        d.message,
      )}</div>`
    : "";

  const actionsList = PLAN_NEXT_ACTIONS[d.planType]
    .map((a) => `<li style="margin-bottom:4px;">${escapeHtml(a)}</li>`)
    .join("");

  return `<!doctype html>
<html lang="ja"><body style="font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;color:#1f2937;line-height:1.7;max-width:680px;margin:0 auto;padding:24px;">
  <h2 style="margin:0 0 16px;font-size:18px;letter-spacing:0.06em;">[NRT-LOFT 予約・申込] ${escapeHtml(
    PLAN_LABELS[d.planType],
  )} - ${escapeHtml(d.name)}様</h2>
  <table style="border-collapse:collapse;margin-bottom:20px;">${tableRows}</table>
  ${purposeBlock}
  ${messageBlock}
  <div style="border-top:1px solid #e5e7eb;padding-top:16px;margin-bottom:16px;">
    <div style="color:#92400e;font-size:12px;margin-bottom:8px;">次のアクション</div>
    <ul style="margin:0;padding-left:18px;">${actionsList}</ul>
  </div>
  <div style="color:#6b7280;font-size:11px;">利用規約への同意: 済み(${new Date().toISOString()})</div>
</body></html>`;
}

// ──────────────────────────────────────────────
// Booking 自動返信(利用者宛)
// ──────────────────────────────────────────────

function bookingAutoReplyText(d: BookingPayload, lineUrl: string): string {
  const lines = [
    `${d.name} 様`,
    "",
    "NRT-LOFT へのお申込みありがとうございます。",
    "以下の内容で受け付けました。",
    "",
    "── 申込内容 ──",
    `プラン   : ${PLAN_LABELS[d.planType]}`,
  ];

  if (d.planType === "drop-in") {
    if (d.dropInDate) lines.push(`利用希望日: ${d.dropInDate}`);
    if (d.dropInTimeSlot)
      lines.push(
        `希望時間帯: ${TIME_SLOT_LABELS[d.dropInTimeSlot] ?? d.dropInTimeSlot}`,
      );
  } else if (d.planType === "light" || d.planType === "regular") {
    if (d.membershipStartDate)
      lines.push(`利用開始希望日: ${d.membershipStartDate}`);
    if (d.registrationOption) lines.push("法人登記オプション: 希望");
  } else if (d.planType === "reserved") {
    if (d.reservedDate) lines.push(`利用希望日: ${d.reservedDate}`);
    if (d.reservedDuration)
      lines.push(
        `利用時間  : ${RESERVED_DURATION_LABELS[d.reservedDuration] ?? d.reservedDuration}`,
      );
    if (d.reservedAttendees) lines.push(`利用人数  : ${d.reservedAttendees}名`);
  }

  lines.push(
    "",
    "通常24時間以内に運営者からご返信いたします。",
    "決済方法・利用方法の詳細は、ご返信メールにてお伝えします。",
    "",
    "お急ぎの場合は、LINE 公式アカウントからもご連絡いただけます。",
    lineUrl,
    "",
    "----",
    "NRT LOFT",
    "運営: Nebulab合同会社",
    "hello@nebulab.jp",
  );
  return lines.join("\n");
}

function bookingAutoReplyHtml(d: BookingPayload, lineUrl: string): string {
  const summaryRows: Array<[string, string]> = [
    ["プラン", PLAN_LABELS[d.planType]],
  ];
  if (d.planType === "drop-in") {
    if (d.dropInDate) summaryRows.push(["利用希望日", d.dropInDate]);
    if (d.dropInTimeSlot)
      summaryRows.push([
        "希望時間帯",
        TIME_SLOT_LABELS[d.dropInTimeSlot] ?? d.dropInTimeSlot,
      ]);
  } else if (d.planType === "light" || d.planType === "regular") {
    if (d.membershipStartDate)
      summaryRows.push(["利用開始希望日", d.membershipStartDate]);
    if (d.registrationOption)
      summaryRows.push(["法人登記オプション", "希望"]);
  } else if (d.planType === "reserved") {
    if (d.reservedDate) summaryRows.push(["利用希望日", d.reservedDate]);
    if (d.reservedDuration)
      summaryRows.push([
        "利用時間",
        RESERVED_DURATION_LABELS[d.reservedDuration] ?? d.reservedDuration,
      ]);
    if (d.reservedAttendees)
      summaryRows.push(["利用人数", `${d.reservedAttendees}名`]);
  }
  const tableRows = summaryRows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:4px 12px 4px 0;color:#92400e;font-weight:normal;white-space:nowrap;font-size:12px;">${escapeHtml(
          k,
        )}</th><td style="padding:4px 0;color:#1f2937;font-size:13px;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="ja"><body style="font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;color:#1f2937;line-height:1.7;max-width:600px;margin:0 auto;padding:24px;">
  <p style="margin:0 0 16px;">${escapeHtml(d.name)} 様</p>
  <p style="margin:0 0 16px;">NRT-LOFT へのお申込みありがとうございます。<br>以下の内容で受け付けました。</p>
  <div style="background:#faf7f0;padding:14px 16px;border-radius:2px;margin-bottom:16px;">
    <div style="color:#92400e;font-size:11px;letter-spacing:0.15em;margin-bottom:8px;">申込内容</div>
    <table style="border-collapse:collapse;">${tableRows}</table>
  </div>
  <p style="margin:0 0 16px;">通常 24 時間以内に運営者からご返信いたします。<br>決済方法・利用方法の詳細は、ご返信メールにてお伝えします。</p>
  <p style="margin:0 0 16px;">お急ぎの場合は、LINE 公式アカウントからもご連絡いただけます。<br><a href="${escapeHtml(
    lineUrl,
  )}" style="color:#d97706;">LINE 友だち追加</a></p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;">
  <p style="margin:0;color:#6b7280;font-size:12px;">NRT LOFT<br>運営: Nebulab合同会社<br>hello@nebulab.jp</p>
</body></html>`;
}

// ──────────────────────────────────────────────
// Legacy テンプレート(従来の単発メール)
// ──────────────────────────────────────────────

function legacyText(d: LegacyPayload): string {
  const lines = [
    "NRT-LOFT お問い合わせフォーム",
    "----------------------------------------",
    `お名前       : ${d.name}`,
    `メール       : ${d.email}`,
    `問い合わせ種別: ${LEGACY_INQUIRY_LABELS[d.inquiryType]}`,
  ];
  if (d.preferredDate) lines.push(`ご希望日     : ${d.preferredDate}`);
  lines.push("", "メッセージ:", d.message);
  return lines.join("\n");
}

function legacyHtml(d: LegacyPayload): string {
  const rows: Array<[string, string]> = [
    ["お名前", d.name],
    ["メール", d.email],
    ["問い合わせ種別", LEGACY_INQUIRY_LABELS[d.inquiryType]],
  ];
  if (d.preferredDate) rows.push(["ご希望日", d.preferredDate]);
  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;color:#92400e;font-weight:normal;white-space:nowrap;">${escapeHtml(
          k,
        )}</th><td style="padding:6px 0;color:#1f2937;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<!doctype html>
<html lang="ja"><body style="font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;color:#1f2937;line-height:1.7;">
  <h2 style="margin:0 0 16px;font-size:18px;letter-spacing:0.06em;">NRT-LOFT お問い合わせ</h2>
  <table style="border-collapse:collapse;margin-bottom:20px;">${tableRows}</table>
  <div style="border-top:1px solid #e5e7eb;padding-top:16px;">
    <div style="color:#92400e;font-size:12px;margin-bottom:8px;">メッセージ</div>
    <div style="white-space:pre-wrap;">${escapeHtml(d.message)}</div>
  </div>
</body></html>`;
}

// ──────────────────────────────────────────────
// POST handler
// ──────────────────────────────────────────────

export async function POST(req: Request) {
  const isProd = process.env.NODE_ENV === "production";

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "JSONの解析に失敗しました。" },
      { status: 400 },
    );
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 400 },
    );
  }
  const data = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO || "hello@nebulab.jp";
  const lineUrl =
    process.env.NEXT_PUBLIC_LINE_FRIEND_URL ||
    "https://line.me/R/ti/p/@nrt-loft";

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error: isProd
          ? "メール送信の設定が完了していません。時間をおいて再度お試しください。"
          : "RESEND_API_KEY が設定されていません。.env.local を確認してください。",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const fromAddress = "NRT-LOFT <onboarding@resend.dev>";

  try {
    if (data.kind === "booking") {
      const subject = `[NRT-LOFT 予約・申込] ${PLAN_LABELS[data.planType]} - ${data.name}様`;

      // 運営者宛
      const { error: opErr } = await resend.emails.send({
        from: fromAddress,
        to: [to],
        replyTo: data.email,
        subject,
        text: bookingOperatorText(data),
        html: bookingOperatorHtml(data),
      });
      if (opErr) {
        console.error("[contact] resend operator error:", opErr);
        return NextResponse.json(
          {
            success: false,
            error: isProd
              ? "送信に失敗しました。時間をおいて再度お試しください。"
              : `Resend: ${opErr.message}`,
          },
          { status: 500 },
        );
      }

      // 利用者宛(自動返信)
      const { error: replyErr } = await resend.emails.send({
        from: fromAddress,
        to: [data.email],
        replyTo: to,
        subject: "【NRT-LOFT】お申込みを受け付けました",
        text: bookingAutoReplyText(data, lineUrl),
        html: bookingAutoReplyHtml(data, lineUrl),
      });
      if (replyErr) {
        // 自動返信エラーは運営者には届いているので致命的ではない。ログに残す。
        console.error("[contact] resend auto-reply error:", replyErr);
      }

      return NextResponse.json({ success: true }, { status: 200 });
    }

    // legacy
    const subject = `[NRT-LOFT] 新規問い合わせ(${LEGACY_INQUIRY_LABELS[data.inquiryType]})`;
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [to],
      replyTo: data.email,
      subject,
      text: legacyText(data),
      html: legacyHtml(data),
    });
    if (error) {
      console.error("[contact] resend error:", error);
      return NextResponse.json(
        {
          success: false,
          error: isProd
            ? "送信に失敗しました。時間をおいて再度お試しください。"
            : `Resend: ${error.message}`,
        },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        error: isProd
          ? "送信に失敗しました。時間をおいて再度お試しください。"
          : `Unexpected: ${(err as Error).message}`,
      },
      { status: 500 },
    );
  }
}
