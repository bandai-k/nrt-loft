// src/components/mdx/CopyButton.tsx
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * コードブロックのコピーボタン。プロンプトを載せる機会が多いので、
 * すべての pre に付く。テキストは描画済みの pre から読む。
 */
export default function CopyButton() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    const pre = buttonRef.current?.closest("figure")?.querySelector("pre");
    const text = pre?.textContent;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // クリップボードが使えない環境（未許可・非セキュアコンテキスト）では黙って諦める
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleCopy}
      className="code-copy"
      aria-label={copied ? "コピーしました" : "コードをコピー"}
    >
      {copied ? "コピーしました" : "コピー"}
    </button>
  );
}
