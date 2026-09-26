// 素材占位。design.md 禁框線、禁陰影、禁圓角——占位只用底色＋文字，等真正素材到位後直接替換。
export default function Placeholder({
  label,
  ratio = "aspect-square",
}: {
  label: string;
  ratio?: string;
}) {
  return (
    <div
      className={`${ratio} flex items-center justify-center bg-[var(--color-paper-2)]`}
    >
      <span className="text-[length:var(--text-sm)] text-[var(--color-muted)] tracking-wide text-center px-[var(--space-sm)]">
        {label}
      </span>
    </div>
  );
}
