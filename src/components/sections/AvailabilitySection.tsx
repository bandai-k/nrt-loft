// src/components/sections/AvailabilitySection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import DayReservationModal from "@/components/sections/DayReservationModal";
import {
  TOTAL_SEATS,
  monthlyAvailability,
  availabilityNotes,
  lastUpdated,
  calendarMonthLabel,
  calendarFirstDayMonFirst,
  type AvailabilityBlock,
  type AvailabilityDay,
} from "@/data/availability";

const weekdayHeaders = ["月", "火", "水", "木", "金", "土", "日"];

// --- Seat dots (1 dot per seat) ------------------------------------------

function SeatDots({ available }: { available: number }) {
  return (
    <div
      className="flex items-center gap-[3px] md:gap-1"
      aria-hidden="true"
    >
      {Array.from({ length: TOTAL_SEATS }).map((_, i) => {
        const isAvail = i < available;
        return (
          <span
            key={i}
            className="block h-[7px] w-[7px] rounded-full md:h-2 md:w-2"
            style={{
              background: isAvail ? "#f59e0b" : "transparent",
              border: `1px solid ${
                isAvail ? "#f59e0b" : "rgba(217,119,6,0.4)"
              }`,
              boxShadow: isAvail
                ? "0 0 5px rgba(245,158,11,0.45)"
                : "none",
            }}
          />
        );
      })}
    </div>
  );
}

// --- Calendar cell -------------------------------------------------------

function dayCellSummary(blocks: AvailabilityBlock[]): string {
  const isAllClosed = blocks.every((b) => b.status === "closed");
  if (isAllClosed) return "定休";
  const isAllReserved = blocks.every((b) => b.status === "reserved");
  if (isAllReserved) return "貸切";
  return blocks
    .map((b) => {
      if (b.status === "closed") return `${b.label} 定休`;
      if (b.status === "reserved") return `${b.label} 貸切`;
      return `${b.label} 残${b.status}/${TOTAL_SEATS}`;
    })
    .join(" / ");
}

function DayCell({
  day,
  onSelect,
}: {
  day: AvailabilityDay;
  onSelect: (d: AvailabilityDay) => void;
}) {
  const isAllClosed = day.blocks.every((b) => b.status === "closed");
  const isWeekend = day.weekdayIndex === 5 || day.weekdayIndex === 6;
  const dateColor = isAllClosed
    ? "#5a5a5a"
    : isWeekend
      ? "#d97706"
      : "#1a1a1a";

  return (
    <button
      type="button"
      onClick={() => onSelect(day)}
      className="flex h-full flex-col rounded-sm p-1.5 text-left transition-colors hover:bg-amber-100/30 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 focus:ring-offset-neutral-300 md:p-2"
      style={{
        border: "1px solid rgba(0,0,0,0.2)",
        background: isAllClosed ? "rgba(0,0,0,0.08)" : "transparent",
      }}
      title={dayCellSummary(day.blocks)}
      aria-label={`${day.day}日 ${day.weekday}曜 ─ ${dayCellSummary(day.blocks)}`}
    >
      <div className="mb-1 flex items-baseline justify-between">
        <span
          className="text-[12px] leading-none md:text-[14px]"
          style={{
            fontFamily: "var(--font-heading)",
            color: dateColor,
            letterSpacing: "0.04em",
          }}
        >
          {day.day}
        </span>
      </div>

      {isAllClosed ? (
        <div
          className="mt-auto text-center text-[8px] tracking-[0.2em] md:text-[9px]"
          style={{ fontFamily: "var(--font-mono)", color: "#5a5a5a" }}
        >
          定休
        </div>
      ) : (
        <div className="mt-auto space-y-1">
          {day.blocks.map((b) => {
            const labelColor =
              b.status === "closed"
                ? "#5a5a5a"
                : b.status === "reserved"
                  ? "#d97706"
                  : "#3a3a3a";
            return (
              <div key={b.label} className="flex items-center gap-1.5">
                <span
                  className="text-[8px] tracking-[0.15em] md:text-[9px]"
                  style={{ fontFamily: "var(--font-mono)", color: labelColor }}
                >
                  {b.label}
                </span>
                {b.status === "closed" ? (
                  <span
                    className="text-[8px] tracking-[0.2em] md:text-[9px]"
                    style={{ fontFamily: "var(--font-mono)", color: "#5a5a5a" }}
                  >
                    ─
                  </span>
                ) : b.status === "reserved" ? (
                  <span
                    className="text-[8px] tracking-[0.25em] md:text-[9px]"
                    style={{ fontFamily: "var(--font-mono)", color: "#d97706" }}
                  >
                    貸切
                  </span>
                ) : (
                  <SeatDots available={b.status} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </button>
  );
}

// --- Section -------------------------------------------------------------

export default function AvailabilitySection() {
  // Build calendar cells with leading blanks for first-week alignment
  const leadingBlanks = calendarFirstDayMonFirst;
  const cells: (AvailabilityDay | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...monthlyAvailability,
  ];
  // Pad trailing to complete the last week (multiple of 7)
  while (cells.length % 7 !== 0) cells.push(null);

  const [selectedDay, setSelectedDay] = useState<AvailabilityDay | null>(null);

  return (
    <section
      id="availability"
      className="section-rhythm relative overflow-hidden px-5 pt-[40px] pb-[80px] md:px-12 md:pt-[64px] md:pb-[140px]"
    >
      <Image
        src="/reservation-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
        style={{
          zIndex: 0,
          filter: "saturate(0.8) contrast(1.05) brightness(0.45)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,7,4,0.95) 0%, rgba(10,7,4,0.78) 45%, rgba(10,7,4,0.6) 75%, rgba(10,7,4,0.5) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,7,4,0.5) 0%, transparent 25%, transparent 75%, rgba(10,7,4,0.65) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-[960px]">
        <Reveal>
          <SectionLabel>· AVAILABILITY</SectionLabel>
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
            空き状況
          </h2>
          <div
            className="mb-3 flex flex-wrap items-baseline gap-x-4 text-[11px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            <span>{calendarMonthLabel}</span>
            <span style={{ color: "#4a3a22" }}>
              最終更新 {lastUpdated}
            </span>
          </div>
          <p
            className="mb-12 text-[13px] leading-[1.95] tracking-[0.05em]"
            style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
          >
            3席の残席状況を、AM / PM の2つの時間帯でお知らせします。
            <br className="hidden md:block" />
            最新の正確な状況は、お問い合わせフォームよりご確認ください。
          </p>
        </Reveal>

        <Reveal>
          {/* White panel containing weekday headers + calendar grid */}
          <div
            className="rounded-sm p-3 md:p-5"
            style={{
              background: "#9a9a9a",
              boxShadow:
                "0 0 0 1px rgba(217,119,6,0.3), 0 16px 50px -16px rgba(0,0,0,0.6)",
            }}
          >
            {/* Weekday headers */}
            <div className="mb-2 grid grid-cols-7 gap-1 md:gap-2">
              {weekdayHeaders.map((wd, i) => (
                <div
                  key={wd}
                  className="text-center text-[9px] tracking-[0.3em] md:text-[10px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: i === 5 || i === 6 ? "#d97706" : "#3a3a3a",
                  }}
                >
                  {wd}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {cells.map((cell, idx) =>
                cell ? (
                  <DayCell key={cell.date} day={cell} onSelect={setSelectedDay} />
                ) : (
                  <div
                    key={`blank-${idx}`}
                    className="rounded-sm"
                    style={{ minHeight: "60px" }}
                    aria-hidden="true"
                  />
                ),
              )}
            </div>
          </div>
        </Reveal>

        {/* Legend */}
        <Reveal>
          <div
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-5"
            style={{ borderColor: "rgba(217,119,6,0.15)" }}
          >
            <div className="flex items-center gap-2">
              <SeatDots available={3} />
              <span
                className="text-[10px] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono)", color: "#7a6a4a" }}
              >
                3席空き
              </span>
            </div>
            <div className="flex items-center gap-2">
              <SeatDots available={1} />
              <span
                className="text-[10px] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono)", color: "#7a6a4a" }}
              >
                残1席
              </span>
            </div>
            <div className="flex items-center gap-2">
              <SeatDots available={0} />
              <span
                className="text-[10px] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono)", color: "#7a6a4a" }}
              >
                満席
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] tracking-[0.3em]"
                style={{ fontFamily: "var(--font-mono)", color: "#d97706" }}
              >
                貸切
              </span>
              <span
                className="text-[10px] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono)", color: "#7a6a4a" }}
              >
                スペース全体
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] tracking-[0.3em]"
                style={{ fontFamily: "var(--font-mono)", color: "#4a3a22" }}
              >
                定休
              </span>
              <span
                className="text-[10px] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono)", color: "#7a6a4a" }}
              >
                営業外
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <ul
            className="mt-6 space-y-1.5 text-[12px] leading-[1.8] tracking-[0.04em]"
            style={{ color: "#6b5a3a", fontFamily: "var(--font-body)" }}
          >
            {availabilityNotes.map((n, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden style={{ color: "#92400e" }}>
                  —
                </span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {selectedDay && (
        <DayReservationModal
          day={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </section>
  );
}
