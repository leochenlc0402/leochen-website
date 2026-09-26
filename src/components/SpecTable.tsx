import type { ReactNode } from "react";

// F3 規格表：每列 dt（年份或單位）＋ dd（職稱或內容），列之間 1px --color-rule hairline。
// 這是本站唯一允許畫線的地方，只用 Tailwind 的 border-b 一種寫法：
// 該列自己的文字顏色設成 --color-rule，讓 border-b 的預設 currentColor 直接撿到這個值，
// 不再疊加任何其他顏色工具類別去指定它。
export type SpecRow = { dt: ReactNode; dd: ReactNode };

export default function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <dl>
      {rows.map((row, i) => (
        <div
          key={i}
          className={`flex flex-col sm:flex-row sm:items-baseline gap-x-[var(--space-lg)] gap-y-[var(--space-xs)] py-[var(--space-sm)] ${
            i < rows.length - 1 ? "border-b text-[var(--color-rule)]" : ""
          }`}
        >
          <dt className="shrink-0 sm:w-[11em] text-[length:var(--text-sm)] text-[var(--color-muted)]">
            {row.dt}
          </dt>
          <dd className="text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[1.7]">
            {row.dd}
          </dd>
        </div>
      ))}
    </dl>
  );
}
