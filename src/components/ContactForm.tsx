// src/components/ContactForm.tsx
"use client";

import { useState } from "react";

const INQUIRY_OPTIONS = [
  { id: "feedback", label: "記事への感想" },
  { id: "question", label: "記事についての質問" },
  { id: "press", label: "取材・掲載のご相談" },
  { id: "other", label: "その他" },
] as const;

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-faint focus:border-ink-faint";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] =
    useState<(typeof INQUIRY_OPTIONS)[number]["id"]>("feedback");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, inquiryType, message }),
      });
      const json = (await res.json()) as { success: boolean; error?: string };

      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "送信に失敗しました。");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrorMsg("通信に失敗しました。時間をおいて再度お試しください。");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-lg border border-line bg-surface px-6 py-8"
        role="status"
      >
        <h2 className="mb-2 text-[18px]">送信しました</h2>
        <p className="text-[14px] leading-[1.95] text-ink-muted">
          ありがとうございます。内容を確認のうえ、必要に応じてご返信します。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[34em]" noValidate={false}>
      <div className="mb-5">
        <label htmlFor="name" className="mb-1.5 block text-[13px] text-ink-muted">
          お名前 <span className="text-ink-faint">（必須）</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={50}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
          autoComplete="name"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="mb-1.5 block text-[13px] text-ink-muted">
          メールアドレス <span className="text-ink-faint">（必須）</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
          autoComplete="email"
        />
      </div>

      <fieldset className="mb-5">
        <legend className="mb-1.5 text-[13px] text-ink-muted">
          お問い合わせの種別
        </legend>
        <div className="flex flex-wrap gap-2">
          {INQUIRY_OPTIONS.map((option) => {
            const checked = inquiryType === option.id;
            return (
              <label
                key={option.id}
                className="cursor-pointer rounded-full border px-3.5 py-2 text-[13px] transition-colors"
                style={{
                  borderColor: checked
                    ? "var(--color-ink)"
                    : "var(--color-line-strong)",
                  background: checked ? "var(--color-marker)" : "transparent",
                }}
              >
                <input
                  type="radio"
                  name="inquiryType"
                  value={option.id}
                  checked={checked}
                  onChange={() => setInquiryType(option.id)}
                  className="sr-only"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mb-6">
        <label
          htmlFor="message"
          className="mb-1.5 block text-[13px] text-ink-muted"
        >
          メッセージ <span className="text-ink-faint">（必須・10文字以上）</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={8}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-y leading-[1.9]`}
        />
      </div>

      {status === "error" && (
        <p className="mb-4 text-[13px] text-ink" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "sending"}
        style={{ opacity: status === "sending" ? 0.6 : 1 }}
      >
        {status === "sending" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
