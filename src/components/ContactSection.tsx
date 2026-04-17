// src/components/ContactSection.tsx
"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const inquiryOptions = [
  { value: "", label: "選択してください" },
  { value: "drop-in", label: "ドロップイン利用希望" },
  { value: "membership", label: "月額プラン検討中" },
  { value: "business", label: "法人利用・登記相談" },
  { value: "other", label: "その他" },
];

type Status = "idle" | "loading" | "success" | "error";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "rgba(217,119,6,0.03)",
  border: "1px solid rgba(217,119,6,0.2)",
  borderRadius: "1px",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
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

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const disabled = status === "loading";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          inquiryType,
          preferredDate: inquiryType === "drop-in" ? preferredDate : undefined,
          message,
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
      setName("");
      setEmail("");
      setInquiryType("");
      setPreferredDate("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("通信エラーが発生しました。しばらく経ってから再度お試しください。");
    }
  }

  return (
    <section
      id="contact"
      className="px-5 py-[60px] md:px-12 md:py-[100px]"
      style={{ borderTop: "1px solid rgba(217,119,6,0.1)" }}
    >
      <div className="mx-auto max-w-[720px]">
        <Reveal>
          <SectionLabel>08 · CONTACT</SectionLabel>
        </Reveal>
        <Reveal>
          <h2
            className="mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(32px, 6vw, 48px)",
              letterSpacing: "0.08em",
              color: "#e8e2d4",
            }}
          >
            お問い合わせ
          </h2>
          <div
            className="mb-10 text-[11px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            返信まで2〜3営業日
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="contact-name" style={labelStyle}>
                お名前 *
              </label>
              <input
                id="contact-name"
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
              <label htmlFor="contact-email" style={labelStyle}>
                メールアドレス *
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disabled}
                style={fieldStyle}
              />
            </div>

            <div>
              <label htmlFor="contact-type" style={labelStyle}>
                問い合わせ種別 *
              </label>
              <select
                id="contact-type"
                required
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                disabled={disabled}
                style={fieldStyle}
              >
                {inquiryOptions.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.value === ""}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {inquiryType === "drop-in" && (
              <div>
                <label htmlFor="contact-date" style={labelStyle}>
                  ご希望日
                </label>
                <input
                  id="contact-date"
                  type="text"
                  placeholder="例: 2025/06/15 14:00〜"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  disabled={disabled}
                  style={fieldStyle}
                />
              </div>
            )}

            <div>
              <label htmlFor="contact-message" style={labelStyle}>
                メッセージ * (10〜2000文字)
              </label>
              <textarea
                id="contact-message"
                required
                minLength={10}
                maxLength={2000}
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={disabled}
                style={{ ...fieldStyle, resize: "vertical", minHeight: "160px" }}
              />
              <div
                className="mt-1 text-right text-[10px] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono)", color: "#6b5a3a" }}
              >
                {message.length} / 2000
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={disabled}
                className="btn-primary w-full md:w-auto"
                style={{
                  opacity: disabled ? 0.6 : 1,
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
              >
                {status === "loading" ? "送信中..." : "送信する →"}
              </button>
            </div>

            {status === "success" && (
              <div
                role="status"
                className="mt-4 rounded-sm px-4 py-4 text-[13px] leading-[1.8] tracking-[0.04em]"
                style={{
                  border: "1px solid rgba(217,119,6,0.4)",
                  background: "rgba(217,119,6,0.06)",
                  color: "#e8e2d4",
                }}
              >
                お問い合わせありがとうございます。内容を確認のうえ、2〜3営業日以内にご返信いたします。
              </div>
            )}

            {status === "error" && errorMsg && (
              <div
                role="alert"
                className="mt-4 rounded-sm px-4 py-4 text-[13px] leading-[1.8] tracking-[0.04em]"
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
        </Reveal>
      </div>
    </section>
  );
}
