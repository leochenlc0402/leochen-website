import Link from "next/link";
import { profile } from "@/data/profile";

// Nav N1a 極簡：字標硬靠左，右側三個純文字連結，無按鈕、無底線、無 sticky、無毛玻璃。
// 375px 寬時三連結仍留在同一列（字級縮小但不換行、不收進漢堡選單）。
const navLinks = [
  { label: "關於", href: "/about" },
  { label: "演講邀約", href: "/speaking" },
  { label: "作品與報導", href: "/media" },
];

export default function Navbar() {
  return (
    <header className="px-[var(--space-md)] sm:px-[var(--space-xl)]">
      <div className="max-w-[var(--container)] mx-auto flex items-center justify-between gap-[var(--space-sm)] py-[var(--space-lg)]">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] font-semibold text-[0.95rem] sm:text-[length:var(--text-lg)] text-[var(--color-ink)] whitespace-nowrap"
        >
          {profile.displayName}
        </Link>
        <nav className="flex items-center gap-[var(--space-sm)] sm:gap-[var(--space-lg)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.75rem] sm:text-[length:var(--text-sm)] text-[var(--color-ink-2)] hover:text-[var(--color-accent)] transition-colors duration-150 ease-out whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
