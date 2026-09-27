import type { ReactNode } from "react";

// hairline 規格列：每列 dt（標題／年份）＋ dd（內容），列之間 1px --color-rule 分隔線
// （對應首頁「可以怎麼請他」那種列表視覺，見 globals.css .spec-row）。
// 同一張表只要有任一列帶 dt，全表都保留 dt 欄（沒有的列留空白佔位，讓 dd 對齊）；
// 整張表都沒有 dt 時（履歷裡的公部門服務／民間組織／專業資格純條列），改用單欄滿版。
export type SpecRow = { dt?: ReactNode; dd: ReactNode };

export default function SpecTable({ rows }: { rows: SpecRow[] }) {
  const hasDt = rows.some((r) => Boolean(r.dt));
  return (
    <dl>
      {rows.map((row, i) => (
        <div className={`spec-row${hasDt ? "" : " flat"}`} key={i}>
          {hasDt ? <dt>{row.dt}</dt> : null}
          <dd>{row.dd}</dd>
        </div>
      ))}
    </dl>
  );
}
