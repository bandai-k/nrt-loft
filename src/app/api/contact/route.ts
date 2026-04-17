// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const INQUIRY_TYPES = ["drop-in", "membership", "business", "other"] as const;
type InquiryType = (typeof INQUIRY_TYPES)[number];

const INQUIRY_LABELS: Record<InquiryType, string> = {
  "drop-in": "ドロップイン利用希望",
  membership: "月額プラン検討中",
  business: "法人利用・登記相談",
  other: "その他",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  email: string;
  inquiryType: InquiryType;
  message: string;
  preferredDate?: string;
};

function validate(
  raw: unknown
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "リクエスト本文が不正です。" };
  }
  const body = raw as Record<string, unknown>;

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) return { ok: false, error: "お名前を入力してください。" };
  if (name.length > 50)
    return { ok: false, error: "お名前は50文字以内で入力してください。" };

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) return { ok: false, error: "メールアドレスを入力してください。" };
  if (!EMAIL_REGEX.test(email))
    return { ok: false, error: "メールアドレスの形式が正しくありません。" };

  const inquiryTypeRaw =
    typeof body.inquiryType === "string" ? body.inquiryType : "";
  if (!INQUIRY_TYPES.includes(inquiryTypeRaw as InquiryType)) {
    return { ok: false, error: "問い合わせ種別を選択してください。" };
  }
  const inquiryType = inquiryTypeRaw as InquiryType;

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
      name,
      email,
      inquiryType,
      message,
      preferredDate: preferredDate || undefined,
    },
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderText(data: ContactPayload): string {
  const lines = [
    "NRT-LOFT お問い合わせフォーム",
    "----------------------------------------",
    `お名前       : ${data.name}`,
    `メール       : ${data.email}`,
    `問い合わせ種別: ${INQUIRY_LABELS[data.inquiryType]}`,
  ];
  if (data.preferredDate) lines.push(`ご希望日     : ${data.preferredDate}`);
  lines.push("", "メッセージ:", data.message);
  return lines.join("\n");
}

function renderHtml(data: ContactPayload): string {
  const rows: Array<[string, string]> = [
    ["お名前", data.name],
    ["メール", data.email],
    ["問い合わせ種別", INQUIRY_LABELS[data.inquiryType]],
  ];
  if (data.preferredDate) rows.push(["ご希望日", data.preferredDate]);

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;color:#92400e;font-weight:normal;white-space:nowrap;">${escapeHtml(
          k
        )}</th><td style="padding:6px 0;color:#1f2937;">${escapeHtml(v)}</td></tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="ja"><body style="font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;color:#1f2937;line-height:1.7;">
  <h2 style="margin:0 0 16px;font-size:18px;letter-spacing:0.06em;">NRT-LOFT お問い合わせ</h2>
  <table style="border-collapse:collapse;margin-bottom:20px;">${tableRows}</table>
  <div style="border-top:1px solid #e5e7eb;padding-top:16px;">
    <div style="color:#92400e;font-size:12px;margin-bottom:8px;">メッセージ</div>
    <div style="white-space:pre-wrap;">${escapeHtml(data.message)}</div>
  </div>
</body></html>`;
}

export async function POST(req: Request) {
  const isProd = process.env.NODE_ENV === "production";

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "JSONの解析に失敗しました。" },
      { status: 400 }
    );
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 400 }
    );
  }
  const data = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO || "hello@nebulab.jp";

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error: isProd
          ? "メール送信の設定が完了していません。時間をおいて再度お試しください。"
          : "RESEND_API_KEY が設定されていません。.env.local を確認してください。",
      },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const subject = `[NRT-LOFT] 新規問い合わせ（${INQUIRY_LABELS[data.inquiryType]}）`;

  try {
    const { error } = await resend.emails.send({
      from: "NRT-LOFT <onboarding@resend.dev>",
      to: [to],
      replyTo: data.email,
      subject,
      text: renderText(data),
      html: renderHtml(data),
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
        { status: 500 }
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
      { status: 500 }
    );
  }
}
