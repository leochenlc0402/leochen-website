import type { ReactNode } from "react";

// 純版面容器：<section className="X"><div className="wrap">{children}</div></section>，
// className 直接對應 globals.css 裡照定稿靜態稿命名的區塊 class（nums／voices／who／topics／…）。
export default function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <div className="wrap">{children}</div>
    </section>
  );
}
