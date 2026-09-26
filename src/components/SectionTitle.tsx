// 雙聲道標題（signature，design.md〈Signature：雙聲道〉）。
// 上行印刷體（Noto Serif TC／--font-display）＋下行手寫感楷體（LXGW WenKai TC／--font-voice，用 accent 色），
// 像印好的講義旁邊有人用筆補了一句。全站唯一的識別裝置，不疊加底線、框線或編號。
// 口語註只能是對該區塊內容的白話說法，不得新增里歐的任何事實。
export default function SectionTitle({
  formal,
  casual,
  as: Tag = "h2",
}: {
  formal: string;
  casual: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag className="leading-tight">
      <span className="block font-[family-name:var(--font-display)] font-semibold text-[length:var(--text-2xl)] tracking-[-0.01em] text-[var(--color-ink)]">
        {formal}
      </span>
      <span className="block mt-[var(--space-xs)] leading-[1.5] font-[family-name:var(--font-voice)] font-normal text-[length:var(--text-base)] text-[var(--color-accent)]">
        {casual}
      </span>
    </Tag>
  );
}
