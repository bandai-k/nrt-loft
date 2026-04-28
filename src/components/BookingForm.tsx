// src/components/BookingForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CancellationPolicyDisplay from "@/components/CancellationPolicyDisplay";

// ──────────────────────────────────────────────
// 送信機能の有効化フラグ
// オープン準備中はフォーム送信を無効化。Resend 連携 / 運営フローが整い次第 true に。
// ──────────────────────────────────────────────
const FORM_SUBMISSION_ENABLED = false;

// ──────────────────────────────────────────────
// 型定義
// ──────────────────────────────────────────────

export type PlanType =
  | "drop-in"
  | "light"
  | "regular"
  | "reserved"
  | "consultation";

const PLAN_OPTIONS: {
  id: PlanType;
  code: string;
  label: string;
  price: string;
  desc: string;
}[] = [
  {
    id: "drop-in",
    code: "P-01",
    label: "ドロップイン",
    price: "¥1,200 / 3時間",
    desc: "まずは試しに立ち寄りたい方",
  },
  {
    id: "light",
    code: "P-02L",
    label: "ライトメンバー",
    price: "¥7,800 / 月",
    desc: "週に数回の副業・勉強利用",
  },
  {
    id: "regular",
    code: "P-02",
    label: "月額レギュラー",
    price: "¥15,000 / 月",
    desc: "成田を拠点にする方",
  },
  {
    id: "reserved",
    code: "P-03",
    label: "貸切",
    price: "¥4,000 / 2時間〜",
    desc: "チームでの利用・ワークショップ",
  },
  {
    id: "consultation",
    code: "—",
    label: "その他相談",
    price: "ご相談",
    desc: "見積依頼・取材・コラボ等",
  },
];

const TIME_SLOTS = [
  { value: "08-11", label: "08:00 - 11:00" },
  { value: "11-14", label: "11:00 - 14:00" },
  { value: "14-17", label: "14:00 - 17:00" },
  { value: "17-20", label: "17:00 - 20:00" },
  { value: "19-22", label: "19:00 - 22:00" },
];

const RESERVED_DURATIONS = [
  { value: "2h", label: "2時間 / ¥4,000" },
  { value: "3h", label: "3時間 / ¥5,500" },
  { value: "4h", label: "4時間 / ¥7,000" },
  { value: "6h", label: "6時間 / ¥10,000" },
  { value: "8h", label: "8時間(1日定額) / ¥13,000" },
];

type Status = "idle" | "loading" | "success" | "error";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "rgba(217,119,6,0.04)",
  border: "1px solid rgba(217,119,6,0.22)",
  borderRadius: "1px",
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  letterSpacing: "0.04em",
  color: "#e8e2d4",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  letterSpacing: "0.3em",
  color: "#92400e",
};

// ──────────────────────────────────────────────
// 本体
// ──────────────────────────────────────────────

const VALID_PLANS: PlanType[] = [
  "drop-in",
  "light",
  "regular",
  "reserved",
  "consultation",
];

export default function BookingForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const initialPlan: PlanType = VALID_PLANS.includes(planParam as PlanType)
    ? (planParam as PlanType)
    : "drop-in";

  // === 基本情報 ===
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // === プラン ===
  const [planType, setPlanType] = useState<PlanType>(initialPlan);

  // === ドロップイン ===
  const [dropInDate, setDropInDate] = useState("");
  const [dropInTimeSlot, setDropInTimeSlot] = useState("");

  // === ライト/レギュラー ===
  const [membershipStartDate, setMembershipStartDate] = useState("");
  const [registrationOption, setRegistrationOption] = useState(false);

  // === 貸切 ===
  const [reservedDate, setReservedDate] = useState("");
  const [reservedDuration, setReservedDuration] = useState<string>("2h");
  const [reservedAttendees, setReservedAttendees] = useState<number | "">(2);
  const [reservedPurpose, setReservedPurpose] = useState("");

  // === 共通 ===
  const [message, setMessage] = useState("");
  const [preferredContact, setPreferredContact] = useState<"email" | "phone">(
    "email",
  );
  const [agreesToPolicy, setAgreesToPolicy] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // URLパラメータが後から変わった場合に追従
  useEffect(() => {
    if (planParam && VALID_PLANS.includes(planParam as PlanType)) {
      setPlanType(planParam as PlanType);
    }
  }, [planParam]);

  const disabled = status === "loading";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled) return;

    if (!agreesToPolicy) {
      setStatus("error");
      setErrorMsg("利用規約・キャンセルポリシーにご同意ください。");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const payload = {
      name,
      email,
      phone: phone || undefined,
      planType,
      dropInDate: planType === "drop-in" ? dropInDate || undefined : undefined,
      dropInTimeSlot:
        planType === "drop-in" ? dropInTimeSlot || undefined : undefined,
      membershipStartDate:
        planType === "light" || planType === "regular"
          ? membershipStartDate || undefined
          : undefined,
      registrationOption:
        planType === "light" || planType === "regular"
          ? registrationOption
          : undefined,
      reservedDate: planType === "reserved" ? reservedDate || undefined : undefined,
      reservedDuration:
        planType === "reserved" ? reservedDuration || undefined : undefined,
      reservedAttendees:
        planType === "reserved" && typeof reservedAttendees === "number"
          ? reservedAttendees
          : undefined,
      reservedPurpose:
        planType === "reserved" ? reservedPurpose || undefined : undefined,
      message: message || undefined,
      preferredContact,
      agreesToPolicy,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };
      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMsg(data.error || "送信に失敗しました。");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(
        "通信エラーが発生しました。しばらく経ってから再度お試しください。",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-sm px-6 py-8 text-[13px] leading-[1.95] tracking-[0.05em]"
        style={{
          border: "1px solid rgba(217,119,6,0.5)",
          background: "rgba(217,119,6,0.06)",
          color: "#e8e2d4",
        }}
      >
        <div
          className="mb-3 text-[10px] tracking-[0.35em]"
          style={{ fontFamily: "var(--font-mono)", color: "#f59e0b" }}
        >
          — RECEIVED
        </div>
        <p className="mb-2">お申込みを受け付けました。</p>
        <p style={{ color: "#c8bfa8" }}>
          内容を確認のうえ、通常 24 時間以内に運営者からメール / LINE にてご連絡いたします。
          決済方法・利用方法の詳細は、ご返信メールにてお伝えします。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* ============ プラン選択 ============ */}
      <div>
        <span style={labelStyle}>— PLAN / ご利用プラン *</span>
        <div className="grid gap-3 md:grid-cols-2">
          {PLAN_OPTIONS.map((p) => {
            const checked = planType === p.id;
            return (
              <label
                key={p.id}
                className="relative flex cursor-pointer flex-col gap-1 rounded-sm px-4 py-3 transition-colors"
                style={{
                  border: checked
                    ? "1px solid rgba(245,158,11,0.7)"
                    : "1px solid rgba(217,119,6,0.22)",
                  background: checked
                    ? "rgba(245,158,11,0.08)"
                    : "rgba(255,255,255,0.01)",
                  boxShadow: checked
                    ? "0 0 0 1px rgba(245,158,11,0.3), 0 8px 24px -12px rgba(217,119,6,0.4)"
                    : "none",
                }}
              >
                <input
                  type="radio"
                  name="planType"
                  value={p.id}
                  checked={checked}
                  onChange={() => setPlanType(p.id)}
                  className="sr-only"
                />
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className="text-[10px] tracking-[0.3em]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: checked ? "#f59e0b" : "#92400e",
                    }}
                  >
                    {p.code}
                  </span>
                  <span
                    className="text-[12px]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: checked ? "#f59e0b" : "#7a6a4a",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {p.price}
                  </span>
                </div>
                <span
                  className="text-[15px] tracking-[0.06em]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "#e8e2d4",
                  }}
                >
                  {p.label}
                </span>
                <span
                  className="text-[11px] leading-[1.7] tracking-[0.04em]"
                  style={{
                    color: checked ? "#c8bfa8" : "#7a6a4a",
                  }}
                >
                  {p.desc}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ============ プラン別の追加項目 ============ */}
      {planType === "drop-in" && (
        <div className="space-y-5">
          <div
            className="text-[10px] tracking-[0.4em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            — DETAILS / ドロップイン詳細
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="bf-dropin-date" style={labelStyle}>
                利用希望日
              </label>
              <input
                id="bf-dropin-date"
                type="date"
                value={dropInDate}
                onChange={(e) => setDropInDate(e.target.value)}
                disabled={disabled}
                style={fieldStyle}
              />
            </div>
            <div>
              <label htmlFor="bf-dropin-slot" style={labelStyle}>
                希望時間帯
              </label>
              <select
                id="bf-dropin-slot"
                value={dropInTimeSlot}
                onChange={(e) => setDropInTimeSlot(e.target.value)}
                disabled={disabled}
                style={fieldStyle}
              >
                <option value="">選択してください</option>
                {TIME_SLOTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {(planType === "light" || planType === "regular") && (
        <div className="space-y-5">
          <div
            className="text-[10px] tracking-[0.4em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            — DETAILS / 月額会員詳細
          </div>
          <div>
            <label htmlFor="bf-member-date" style={labelStyle}>
              利用開始希望日
            </label>
            <input
              id="bf-member-date"
              type="date"
              value={membershipStartDate}
              onChange={(e) => setMembershipStartDate(e.target.value)}
              disabled={disabled}
              style={fieldStyle}
            />
          </div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={registrationOption}
              onChange={(e) => setRegistrationOption(e.target.checked)}
              disabled={disabled}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-amber-600"
            />
            <span
              className="text-[12px] leading-[1.85] tracking-[0.04em]"
              style={{ color: "#c8bfa8" }}
            >
              法人登記オプション(+¥5,500/月)を希望する
            </span>
          </label>
        </div>
      )}

      {planType === "reserved" && (
        <div className="space-y-5">
          <div
            className="text-[10px] tracking-[0.4em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            — DETAILS / 貸切詳細
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="bf-reserved-date" style={labelStyle}>
                利用希望日
              </label>
              <input
                id="bf-reserved-date"
                type="date"
                value={reservedDate}
                onChange={(e) => setReservedDate(e.target.value)}
                disabled={disabled}
                style={fieldStyle}
              />
            </div>
            <div>
              <label htmlFor="bf-reserved-duration" style={labelStyle}>
                利用時間
              </label>
              <select
                id="bf-reserved-duration"
                value={reservedDuration}
                onChange={(e) => setReservedDuration(e.target.value)}
                disabled={disabled}
                style={fieldStyle}
              >
                {RESERVED_DURATIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="bf-reserved-attendees" style={labelStyle}>
                利用人数(1〜5名)
              </label>
              <input
                id="bf-reserved-attendees"
                type="number"
                min={1}
                max={5}
                value={reservedAttendees}
                onChange={(e) =>
                  setReservedAttendees(
                    e.target.value === "" ? "" : Math.max(1, Math.min(5, parseInt(e.target.value, 10) || 1)),
                  )
                }
                disabled={disabled}
                style={fieldStyle}
              />
            </div>
          </div>
          <div>
            <label htmlFor="bf-reserved-purpose" style={labelStyle}>
              利用目的
            </label>
            <textarea
              id="bf-reserved-purpose"
              rows={3}
              value={reservedPurpose}
              onChange={(e) => setReservedPurpose(e.target.value)}
              disabled={disabled}
              style={{ ...fieldStyle, resize: "vertical", minHeight: "80px" }}
              placeholder="例: 少人数のワークショップ・撮影・チームミーティング 等"
            />
          </div>
        </div>
      )}

      {/* consultation 時は追加項目なし(下のmessage で受ける) */}

      {/* ============ 共通: 連絡先 ============ */}
      <div className="space-y-5">
        <div
          className="text-[10px] tracking-[0.4em]"
          style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
        >
          — CONTACT / 連絡先
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="bf-name" style={labelStyle}>
              お名前 *
            </label>
            <input
              id="bf-name"
              type="text"
              required
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={disabled}
              style={fieldStyle}
            />
          </div>
          <div>
            <label htmlFor="bf-email" style={labelStyle}>
              メールアドレス *
            </label>
            <input
              id="bf-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={disabled}
              style={fieldStyle}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="bf-phone" style={labelStyle}>
              電話番号(任意)
            </label>
            <input
              id="bf-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={disabled}
              style={fieldStyle}
              placeholder="例: 090-xxxx-xxxx"
            />
          </div>
          <div>
            <span style={labelStyle}>希望連絡方法 *</span>
            <div className="flex gap-3">
              {(["email", "phone"] as const).map((v) => {
                const checked = preferredContact === v;
                return (
                  <label
                    key={v}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm px-4 py-3 transition-colors"
                    style={{
                      border: checked
                        ? "1px solid rgba(245,158,11,0.7)"
                        : "1px solid rgba(217,119,6,0.22)",
                      background: checked
                        ? "rgba(245,158,11,0.06)"
                        : "rgba(255,255,255,0.01)",
                    }}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value={v}
                      checked={checked}
                      onChange={() => setPreferredContact(v)}
                      className="sr-only"
                    />
                    <span
                      className="text-[11px] tracking-[0.2em]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: checked ? "#f59e0b" : "#7a6a4a",
                      }}
                    >
                      {v === "email" ? "メール" : "電話"}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ============ 共通: メッセージ ============ */}
      <div>
        <label htmlFor="bf-message" style={labelStyle}>
          {planType === "consultation"
            ? "ご相談内容 *"
            : "ご質問・備考(任意)"}
        </label>
        <textarea
          id="bf-message"
          rows={5}
          maxLength={2000}
          required={planType === "consultation"}
          minLength={planType === "consultation" ? 10 : undefined}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          style={{ ...fieldStyle, resize: "vertical", minHeight: "120px" }}
          placeholder={
            planType === "consultation"
              ? "ご相談の内容を10文字以上で記載ください"
              : "その他お伝えしたいことがあればご記入ください"
          }
        />
        <div
          className="mt-1 text-right text-[10px] tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "#6b5a3a" }}
        >
          {message.length} / 2000
        </div>
      </div>

      {/* ============ ポリシー同意 ============ */}
      <div className="space-y-3">
        <CancellationPolicyDisplay />
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={agreesToPolicy}
            onChange={(e) => setAgreesToPolicy(e.target.checked)}
            disabled={disabled}
            required
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-amber-600"
          />
          <span
            className="text-[12px] leading-[1.85] tracking-[0.04em]"
            style={{ color: "#c8bfa8" }}
          >
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#d97706",
                borderBottom: "1px solid rgba(217,119,6,0.4)",
              }}
            >
              利用規約
            </a>
            と
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('button[aria-expanded]')
                  ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
              }}
              style={{
                color: "#d97706",
                borderBottom: "1px solid rgba(217,119,6,0.4)",
              }}
            >
              キャンセル・解約ポリシー
            </a>
            に同意します *
          </span>
        </label>
      </div>

      {/* ============ 送信 ============ */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={disabled || !FORM_SUBMISSION_ENABLED}
          aria-disabled={!FORM_SUBMISSION_ENABLED}
          title={
            !FORM_SUBMISSION_ENABLED
              ? "現在、フォームでの受付は準備中です。お問い合わせは LINE または hello@nebulab.jp までお願いします。"
              : undefined
          }
          className="btn-primary w-full md:w-auto"
          style={{
            padding: "14px 32px",
            fontSize: "11px",
            opacity: disabled || !FORM_SUBMISSION_ENABLED ? 0.5 : 1,
            cursor:
              disabled || !FORM_SUBMISSION_ENABLED ? "not-allowed" : "pointer",
          }}
        >
          {!FORM_SUBMISSION_ENABLED
            ? "受付準備中"
            : status === "loading"
              ? "送信中..."
              : "申し込み内容を送信 →"}
        </button>
        {!FORM_SUBMISSION_ENABLED && (
          <p
            className="mt-3 text-[12px] leading-[1.85] tracking-[0.04em]"
            style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
          >
            * 現在フォームの受付は準備中です。お急ぎの場合は{" "}
            <a
              href="mailto:hello@nebulab.jp"
              style={{
                color: "#d97706",
                borderBottom: "1px solid rgba(217,119,6,0.4)",
              }}
            >
              hello@nebulab.jp
            </a>
            {" "}または LINE 公式アカウントよりご連絡ください。
          </p>
        )}
      </div>

      {status === "error" && errorMsg && (
        <div
          role="alert"
          className="rounded-sm px-4 py-4 text-[13px] leading-[1.8] tracking-[0.04em]"
          style={{
            border: "1px solid rgba(220,38,38,0.5)",
            background: "rgba(220,38,38,0.08)",
            color: "#fca5a5",
          }}
        >
          {errorMsg}
        </div>
      )}
    </form>
  );
}
