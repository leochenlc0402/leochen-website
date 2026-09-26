// 雙行標題系統（signature，見 outputs/leo-website/brand-audit-2026-09-26.md §四）。
// 上行固定正式語（思源宋體），下行固定口語註（思源黑體、小字）。
// 全站每個區塊標題都走這支元件，是本站唯一的識別裝置——不疊加其他手法。
// 口語註只能是對該區塊內容的白話說法，不得新增里歐的任何事實。

export default function SectionTitle({
  formal,
  casual,
  tone = "light",
}: {
  formal: string;
  casual: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <h2 className="leading-tight">
      <span
        className={`block font-heading font-semibold text-3xl sm:text-4xl ${
          isDark ? "text-parchment" : "text-coffee"
        }`}
      >
        {formal}
      </span>
      <span
        className={`block mt-3 ml-6 sm:ml-12 border-l-2 pl-3 font-body font-normal text-base sm:text-lg tracking-wide ${
          isDark
            ? "border-parchment/60 text-parchment/85"
            : "border-accent/70 text-accent"
        }`}
      >
        {casual}
      </span>
    </h2>
  );
}
