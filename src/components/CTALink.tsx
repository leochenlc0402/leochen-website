import Link from "next/link";
import type { ReactNode } from "react";

// C3 排印連結：文字＋→＋1px 底線，hover 底線變 accent。全站唯一的 CTA 樣式，沒有實心按鈕。
// 箭頭「→」放在 children 文字裡（呼叫端自己接在文字後面），這裡只負責底線與 hover 變色。
export default function CTALink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const cls = `c3-link text-[var(--color-ink-2)] ${className}`;
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
