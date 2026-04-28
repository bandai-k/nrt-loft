// src/components/CancellationPolicyDisplay.tsx
"use client";

import { useState } from "react";
import { policyDisplayTexts } from "@/data/policies";

type Props = {
  defaultOpen?: boolean;
};

export default function CancellationPolicyDisplay({
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const policy = policyDisplayTexts.cancellation;

  return (
    <div
      className="rounded-sm"
      style={{
        border: "1px solid rgba(217,119,6,0.22)",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-amber-600/[0.04]"
      >
        <div className="flex flex-col">
          <span
            className="text-[10px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            — POLICY
          </span>
          <span
            className="text-[13px] tracking-[0.06em]"
            style={{ fontFamily: "var(--font-body)", color: "#e8e2d4" }}
          >
            {policy.title}
          </span>
        </div>
        <span
          aria-hidden
          className="shrink-0 text-[14px] transition-transform"
          style={{
            fontFamily: "var(--font-mono)",
            color: "#d97706",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

      {open && (
        <div
          className="px-4 pb-5 pt-2"
          style={{
            borderTop: "1px solid rgba(217,119,6,0.12)",
          }}
        >
          <p
            className="mb-4 text-[12px] leading-[1.95] tracking-[0.04em]"
            style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
          >
            {policy.intro}
          </p>
          <div className="space-y-4">
            {policy.sections.map((s, i) => (
              <div key={i}>
                <div
                  className="mb-1 text-[11px] tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "#d97706",
                  }}
                >
                  {s.heading}
                </div>
                <p
                  className="text-[12px] leading-[1.95] tracking-[0.04em]"
                  style={{ color: "#c8bfa8" }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
