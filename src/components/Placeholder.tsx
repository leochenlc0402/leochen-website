export default function Placeholder({
  label,
  ratio = "aspect-square",
  variant = "sand",
}: {
  label: string;
  ratio?: string;
  variant?: "sand" | "coffee";
}) {
  const isDark = variant === "coffee";
  return (
    <div
      className={`${ratio} flex items-center justify-center border ${
        isDark
          ? "bg-coffee/90 border-parchment/15 text-parchment/50"
          : "bg-sand/60 border-clay/25 text-coffee/50"
      }`}
    >
      <span className="text-xs sm:text-sm tracking-wide text-center px-3">
        {label}
      </span>
    </div>
  );
}
