"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/data/profile";

// 頁首（全站共用）：墨藍底，左字標，右四連結。手機收成一顆「選單」按鈕，
// 展開成全寬清單，不讓連結擠成兩行。
// 和各頁自己的「頁首區」（navy 首屏／navy 標題區）背景色相同，視覺上無縫接軌。
const navLinks = [
  { label: "關於", href: "/about" },
  { label: "講題", href: "/speaking#topics" },
  { label: "作品與報導", href: "/media" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navy">
      <div className="wrap">
        <nav className="site-nav">
          <Link href="/" className="mark" onClick={() => setOpen(false)}>
            {profile.displayName}
          </Link>

          {/* 桌機：四連結 */}
          <div className="links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/speaking" className="strong">
              邀請演講
            </Link>
          </div>

          {/* 手機：選單按鈕 */}
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "關閉" : "選單"}
          </button>

          {open && (
            <div id="mobile-nav" className="mobile-menu">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href="/speaking" className="strong" onClick={() => setOpen(false)}>
                邀請演講
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
