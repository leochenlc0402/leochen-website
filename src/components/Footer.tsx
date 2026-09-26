import { profile } from "@/data/profile";
import { podcast } from "@/data/media";

// Footer Ft6 Letter close：一句話收尾＋一行小字，沒有四欄連結、沒有社群圖示列。
export default function Footer() {
  return (
    <footer className="px-[var(--space-md)] sm:px-[var(--space-xl)]">
      <div className="max-w-[var(--container)] mx-auto pt-[var(--space-4xl)] pb-[var(--space-2xl)]">
        <p className="font-[family-name:var(--font-voice)] text-[length:var(--text-base)] sm:text-[length:var(--text-lg)] text-[var(--color-accent)]">
          有演講、講座或課程的邀請，寫信給我{" "}
          <a href={`mailto:${profile.email}`} className="c3-link whitespace-nowrap">
            {profile.email} →
          </a>
        </p>
        <p className="mt-[var(--space-sm)] text-[length:var(--text-sm)] text-[var(--color-muted)]">
          Fufuknows · {podcast.name} · © {new Date().getFullYear()}{" "}
          {profile.displayName}
        </p>
      </div>
    </footer>
  );
}
