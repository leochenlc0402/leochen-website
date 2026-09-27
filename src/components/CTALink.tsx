import Link from "next/link";
import type { ReactNode } from "react";

// 通用連結：純粹依 href 決定用 <a>（外部／mailto／錨點）還是 next/link Link，
// 樣式完全交給呼叫端傳入 className（.btn／.link／.link-ink，見 globals.css）。
export default function CTALink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
