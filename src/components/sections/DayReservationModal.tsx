// src/components/sections/DayReservationModal.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  TOTAL_SEATS,
  type AvailabilityBlock,
  type AvailabilityDay,
} from "@/data/availability";
import { mainPlans } from "@/data/pricing";

type Props = {
  day: AvailabilityDay;
  onClose: () => void;
};

type Status = "idle" | "loading" | "success" | "error";

// 月額会員(REGULAR)はモーダルからの予約対象外。ドロップイン+貸切のみ。
const reservablePlans = mainPlans.filter((p) => p.category !== "monthly");

// Plan ID → /api/contact が受け取る inquiryType へのマッピング
const planToInquiry: Record<string, string> = {
  "drop-in": "drop-in",
  reserved: "business",
};

const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

// --- Pricing calculator ---------------------------------------------------

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map((s) => parseInt(s, 10));
  return h * 60 + m;
}

function formatDuration(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (m === 0) return `${h}時間`;
  return `${h}時間${m}分`;
}

type Estimate = {
  total: number;
  durationMin: number;
  billableHours: number;
  breakdown: string;
  capped?: boolean;
};

function computeEstimate(
  planId: string,
  startTime: string,
  endTime: string,
): Estimate | null {
  const startMin = timeToMinutes(startTime);
  const endMin = timeToMinutes(endTime);
  if (!Number.isFinite(startMin) || !Number.isFinite(endMin)) return null;
  if (endMin <= startMin) return null;
  const durationMin = endMin - startMin;

  if (planId === "drop-in") {
    // 基本3時間 ¥1,200。延長 ¥400/h。1日上限 ¥2,400。
    const base = 1200;
    const billableHours = Math.max(1, Math.ceil(durationMin / 60));
    if (billableHours <= 3) {
      return {
        total: base,
        durationMin,
        billableHours,
        breakdown: "基本 3時間 ¥1,200",
      };
    }
    const extra = billableHours - 3;
    const computed = base + extra * 400;
    const capped = computed > 2400;
    const total = capped ? 2400 : computed;
    return {
      total,
      durationMin,
      billableHours,
      capped,
      breakdown: capped
        ? "1日上限 ¥2,400(延長分が上限超過)"
        : `基本 3時間 ¥1,200 + 延長 ${extra}時間 ¥${(extra * 400).toLocaleString()}`,
    };
  }

  if (planId === "reserved") {
    // 基本2時間 ¥4,000。延長 ¥1,500/h。1日定額(8時間) ¥13,000。
    const billableHours = Math.max(2, Math.ceil(durationMin / 60));
    if (billableHours >= 8) {
      return {
        total: 13000,
        durationMin,
        billableHours: 8,
        capped: true,
        breakdown: "1日定額 ¥13,000(8時間)",
      };
    }
    if (billableHours === 2) {
      return {
        total: 4000,
        durationMin,
        billableHours,
        breakdown: "基本 2時間 ¥4,000",
      };
    }
    const extra = billableHours - 2;
    return {
      total: 4000 + extra * 1500,
      durationMin,
      billableHours,
      breakdown: `基本 2時間 ¥4,000 + 延長 ${extra}時間 ¥${(extra * 1500).toLocaleString()}`,
    };
  }

  return null;
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
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
  marginBottom: "6px",
  fontFamily: "var(--font-mono)",
  fontSize: "9px",
  letterSpacing: "0.3em",
  color: "#92400e",
};

function SeatDots({ available }: { available: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: TOTAL_SEATS }).map((_, i) => {
        const isAvail = i < available;
        return (
          <span
            key={i}
            className="block h-2.5 w-2.5 rounded-full"
            style={{
              background: isAvail ? "#f59e0b" : "transparent",
              border: `1px solid ${
                isAvail ? "#f59e0b" : "rgba(217,119,6,0.4)"
              }`,
              boxShadow: isAvail
                ? "0 0 6px rgba(245,158,11,0.5)"
                : "none",
            }}
          />
        );
      })}
    </div>
  );
}

function BlockStatusRow({ block }: { block: AvailabilityBlock }) {
  const isClosed = block.status === "closed";
  const isReserved = block.status === "reserved";
  const isNumber = typeof block.status === "number";

  return (
    <div
      className="flex items-center justify-between gap-3 py-2.5"
      style={{ borderTop: "1px solid rgba(217,119,6,0.1)" }}
    >
      <div className="flex flex-col">
        <span
          className="text-[11px] tracking-[0.25em]"
          style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
        >
          {block.label}
        </span>
        <span
          className="text-[10px] tracking-[0.15em]"
          style={{ fontFamily: "var(--font-mono)", color: "#6b5a3a" }}
        >
          {block.range}
        </span>
      </div>
      <div className="flex flex-col items-end gap-1">
        {isClosed && (
          <span
            className="text-[11px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "#6b5a3a" }}
          >
            ─ 定休 ─
          </span>
        )}
        {isReserved && (
          <>
            <span
              className="text-[11px] tracking-[0.3em]"
              style={{ fontFamily: "var(--font-mono)", color: "#d97706" }}
            >
              ─ 貸切 ─
            </span>
            {block.note && (
              <span
                className="text-[10px] tracking-[0.1em]"
                style={{ fontFamily: "var(--font-mono)", color: "#7a6a4a" }}
              >
                {block.note}
              </span>
            )}
          </>
        )}
        {isNumber && (
          <>
            <SeatDots available={block.status as number} />
            <span
              className="text-[11px] tracking-[0.2em]"
              style={{
                fontFamily: "var(--font-mono)",
                color:
                  (block.status as number) === 0 ? "#7a6a4a" : "#e8e2d4",
              }}
            >
              残 {block.status}/{TOTAL_SEATS}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default function DayReservationModal({ day, onClose }: Props) {
  // Esc + scroll lock
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isAllClosed = day.blocks.every((b) => b.status === "closed");
  const isAllReserved = day.blocks.every((b) => b.status === "reserved");
  const showForm = !isAllClosed && !isAllReserved;

  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    reservablePlans[0]?.id ?? "",
  );
  // Default 3-hour drop-in window
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("13:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // When the user changes plan, suggest a typical duration if they
  // haven't manually overridden the end time yet.
  const planDefaultDuration: Record<string, number> = useMemo(
    () => ({ "drop-in": 3, reserved: 2 }),
    [],
  );

  const estimate = computeEstimate(selectedPlanId, startTime, endTime);

  function handlePlanChange(planId: string) {
    setSelectedPlanId(planId);
    const dur = planDefaultDuration[planId];
    if (!dur) return;
    const [h, m] = startTime.split(":").map((s) => parseInt(s, 10));
    const newEndHour = Math.min(18, h + dur);
    const padded = `${String(newEndHour).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    setEndTime(padded);
  }

  const dateParts = day.date.split("-");
  const dateLabel = `${parseInt(dateParts[1], 10)}月 ${parseInt(dateParts[2], 10)}日 (${day.weekday})`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    // Validation: end > start
    if (startTime >= endTime) {
      setStatus("error");
      setErrorMsg("終了時刻は開始時刻より後に設定してください。");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const plan = reservablePlans.find((p) => p.id === selectedPlanId);
    const inquiryType = planToInquiry[selectedPlanId] ?? "other";
    const preferredDate = `${day.date} ${startTime}-${endTime}`;
    const composedMessage = [
      "[サンプル予約フォームから送信]",
      `希望日時: ${day.date} (${day.weekday}) ${startTime} - ${endTime}`,
      `希望プラン: ${plan?.code ?? ""} ${plan?.name ?? ""}`,
      estimate
        ? `料金試算: ${yen(estimate.total)} / ${formatDuration(estimate.durationMin)}(課金 ${estimate.billableHours}時間 ─ ${estimate.breakdown})`
        : "",
      "",
      message || "(本文なし)",
    ]
      .filter((l) => l !== "")
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          inquiryType,
          preferredDate,
          message: composedMessage,
        }),
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="day-modal-title"
      className="fixed inset-0 z-[200] flex items-end justify-center p-4 md:items-center"
      onClick={onClose}
      style={{ animation: "modal-fade-in 0.22s ease both" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(10,7,4,0.78)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-[480px] overflow-y-auto rounded-sm"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: "88vh",
          background: "#0a0704",
          border: "1px solid rgba(217,119,6,0.45)",
          boxShadow:
            "0 0 0 1px rgba(217,119,6,0.08), 0 24px 60px -20px rgba(0,0,0,0.7)",
          animation: "modal-slide-up-fade 0.32s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        }}
      >
        {/* Corner decoration */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l border-t"
          style={{ borderColor: "rgba(245,158,11,0.7)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b border-r"
          style={{ borderColor: "rgba(245,158,11,0.7)" }}
          aria-hidden="true"
        />

        {/* Close */}
        <button
          type="button"
          aria-label="閉じる"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-sm transition-colors hover:bg-amber-600/10"
          style={{ color: "#d97706" }}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="px-6 py-7 md:px-8 md:py-8">
          {/* Header */}
          <div
            className="mb-1 text-[10px] tracking-[0.35em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            · RESERVE
          </div>
          <h3
            id="day-modal-title"
            className="mb-6 text-[26px] tracking-[0.06em] md:text-[30px]"
            style={{ fontFamily: "var(--font-heading)", color: "#e8e2d4" }}
          >
            {dateLabel}
          </h3>

          {/* Block status (always shown) */}
          <div className="mb-6">
            {day.blocks.map((b) => (
              <BlockStatusRow key={b.label} block={b} />
            ))}
            <div
              className="h-px"
              style={{ background: "rgba(217,119,6,0.1)" }}
            />
          </div>

          {/* Status messages for non-form cases */}
          {isAllClosed && (
            <p
              className="mb-6 text-[13px] leading-[1.95] tracking-[0.05em]"
              style={{ color: "#7a6a4a" }}
            >
              この日は定休日です。別日のご予約は、お問い合わせフォームより承ります。
            </p>
          )}
          {isAllReserved && !isAllClosed && (
            <p
              className="mb-6 text-[13px] leading-[1.95] tracking-[0.05em]"
              style={{ color: "#7a6a4a" }}
            >
              この日はスペース全体が貸切のため、個別席のご利用はいただけません。
            </p>
          )}
          {/* Reservation form */}
          {showForm && status !== "success" && (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* 1. Plan selection */}
              <div>
                <span style={labelStyle}>1. プラン *</span>
                <div className="grid gap-2">
                  {reservablePlans.map((p) => {
                    const checked = selectedPlanId === p.id;
                    const showPrice = p.campaignPrice ?? p.price;
                    return (
                      <label
                        key={p.id}
                        className="flex cursor-pointer items-center justify-between gap-3 rounded-sm px-3 py-2.5 transition-colors"
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
                          name="plan"
                          value={p.id}
                          checked={checked}
                          onChange={() => handlePlanChange(p.id)}
                          className="sr-only"
                          required
                        />
                        <div className="flex flex-col">
                          <span
                            className="text-[10px] tracking-[0.3em]"
                            style={{
                              fontFamily: "var(--font-mono)",
                              color: checked ? "#f59e0b" : "#92400e",
                            }}
                          >
                            {p.code} · {p.nameEn}
                          </span>
                          <span
                            className="text-[14px] tracking-[0.06em]"
                            style={{
                              fontFamily: "var(--font-heading)",
                              color: "#e8e2d4",
                            }}
                          >
                            {p.name}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span
                            className="text-[15px]"
                            style={{
                              fontFamily: "var(--font-heading)",
                              color: "#f59e0b",
                            }}
                          >
                            {yen(showPrice)}
                          </span>
                          <span
                            className="text-[9px] tracking-[0.15em]"
                            style={{
                              fontFamily: "var(--font-mono)",
                              color: "#7a6a4a",
                            }}
                          >
                            〜 / {p.unit}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 2. Time selection */}
              <div>
                <span style={labelStyle}>2. ご希望の時間帯 *</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label
                      htmlFor="day-start"
                      className="mb-1 block text-[10px] tracking-[0.2em]"
                      style={{ fontFamily: "var(--font-mono)", color: "#7a6a4a" }}
                    >
                      開始
                    </label>
                    <input
                      id="day-start"
                      type="time"
                      required
                      min="10:00"
                      max="17:30"
                      step={1800}
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      disabled={status === "loading"}
                      style={fieldStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="day-end"
                      className="mb-1 block text-[10px] tracking-[0.2em]"
                      style={{ fontFamily: "var(--font-mono)", color: "#7a6a4a" }}
                    >
                      終了
                    </label>
                    <input
                      id="day-end"
                      type="time"
                      required
                      min="10:30"
                      max="18:00"
                      step={1800}
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      disabled={status === "loading"}
                      style={fieldStyle}
                    />
                  </div>
                </div>
                <p
                  className="mt-2 text-[10px] leading-[1.6] tracking-[0.05em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#6b5a3a" }}
                >
                  営業時間 10:00 - 18:00 / 30分単位 / 課金は1時間単位に切り上げ
                </p>
              </div>

              {/* 3. Estimate */}
              <div
                className="rounded-sm px-4 py-4"
                style={{
                  border: "1px solid rgba(245,158,11,0.45)",
                  background: "rgba(245,158,11,0.06)",
                }}
              >
                <div
                  className="mb-2 text-[9px] tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
                >
                  · ESTIMATE / 料金試算
                </div>
                {estimate ? (
                  <>
                    <div className="mb-2 flex items-baseline justify-between gap-3">
                      <div className="flex flex-col">
                        <span
                          className="text-[10px] tracking-[0.2em]"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "#7a6a4a",
                          }}
                        >
                          選択 {formatDuration(estimate.durationMin)}
                          <span className="ml-1" style={{ color: "#4a3a22" }}>
                            (課金 {estimate.billableHours}時間)
                          </span>
                        </span>
                      </div>
                      <span
                        className="text-[28px] leading-none md:text-[32px]"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "#f59e0b",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {yen(estimate.total)}
                      </span>
                    </div>
                    <p
                      className="text-[11px] leading-[1.7] tracking-[0.04em]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: estimate.capped ? "#d97706" : "#7a6a4a",
                      }}
                    >
                      {estimate.breakdown}
                    </p>
                  </>
                ) : (
                  <p
                    className="text-[11px] leading-[1.7] tracking-[0.04em]"
                    style={{ fontFamily: "var(--font-mono)", color: "#d97706" }}
                  >
                    時間設定をご確認ください(終了は開始より後)
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label htmlFor="day-name" style={labelStyle}>
                  お名前 *
                </label>
                <input
                  id="day-name"
                  type="text"
                  required
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === "loading"}
                  style={fieldStyle}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="day-email" style={labelStyle}>
                  メールアドレス *
                </label>
                <input
                  id="day-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  style={fieldStyle}
                />
              </div>

              {/* Message (optional) */}
              <div>
                <label htmlFor="day-message" style={labelStyle}>
                  ご要望・メッセージ(任意)
                </label>
                <textarea
                  id="day-message"
                  rows={3}
                  maxLength={2000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === "loading"}
                  style={{ ...fieldStyle, resize: "vertical", minHeight: "72px" }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full"
                style={{
                  padding: "13px 20px",
                  fontSize: "11px",
                  opacity: status === "loading" ? 0.6 : 1,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                }}
              >
                {status === "loading" ? "送信中..." : "予約を送信 →"}
              </button>

              {status === "error" && errorMsg && (
                <div
                  role="alert"
                  className="rounded-sm px-3 py-3 text-[12px] leading-[1.7] tracking-[0.04em]"
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
          )}

          {/* Success state */}
          {showForm && status === "success" && (
            <div
              role="status"
              className="rounded-sm px-4 py-5 text-[13px] leading-[1.85] tracking-[0.04em]"
              style={{
                border: "1px solid rgba(217,119,6,0.5)",
                background: "rgba(217,119,6,0.08)",
                color: "#e8e2d4",
              }}
            >
              <div
                className="mb-2 text-[10px] tracking-[0.35em]"
                style={{ fontFamily: "var(--font-mono)", color: "#f59e0b" }}
              >
                — RECEIVED
              </div>
              ご予約のお問い合わせを受け付けました。
              <br />
              内容を確認のうえ、2〜3営業日以内にご返信いたします。
            </div>
          )}

          {/* Fallback CTA for non-form cases (closed / fully reserved / no-availability) */}
          {!showForm && (
            <a
              href="/contact"
              onClick={onClose}
              className="btn-primary block w-full text-center"
              style={{ padding: "13px 20px", fontSize: "11px" }}
            >
              お問い合わせフォームへ →
            </a>
          )}

          <p
            className="mt-4 text-[10px] leading-[1.7] tracking-[0.05em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#4a3a22",
            }}
          >
            * 月額レギュラーをご希望の方は{" "}
            <a
              href="/contact"
              onClick={onClose}
              style={{
                color: "#92400e",
                borderBottom: "1px solid rgba(217,119,6,0.3)",
              }}
            >
              お問い合わせフォーム
            </a>
            {" "}よりご相談ください。
          </p>
        </div>
      </div>
    </div>
  );
}
