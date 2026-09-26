import type { ReactNode } from "react";

// 純版面容器：固定水平留白與頁容器寬度，垂直節奏可覆寫（design.md〈Spacing〉刻意不等距）。
// 標題不是每個 section 都需要，需要雙聲道標題的地方另外放 <SectionTitle />，不綁死在這支元件裡。
export default function Section({
  id,
  children,
  padding,
}: {
  id?: string;
  children: ReactNode;
  padding?: string;
}) {
  return (
    <section
      id={id}
      className={`px-[var(--space-md)] sm:px-[var(--space-xl)] ${
        padding ?? "py-[var(--space-2xl)]"
      }`}
    >
      <div className="max-w-[var(--container)] mx-auto">{children}</div>
    </section>
  );
}
