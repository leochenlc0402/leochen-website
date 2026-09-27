import type { ReactNode } from "react";

// 雙聲道標題：宋體標題（.h2）＋文楷一句口語註（.note）。
// 全站唯一的標題識別，取代舊版 SectionTitle（accent 底線那套已作廢，見 design.md）。
export default function Heading({
  formal,
  casual,
  as: Tag = "h2",
}: {
  formal: ReactNode;
  casual: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <>
      <Tag className="h2">{formal}</Tag>
      <p className="note">{casual}</p>
    </>
  );
}
