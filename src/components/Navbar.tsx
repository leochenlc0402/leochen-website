"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "首頁", href: "/" },
  { label: "關於", href: "/about" },
  { label: "演講邀約", href: "/speaking" },
  { label: "作品與報導", href: "/media" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-parchment/95 dark:bg-coffee/95 backdrop-blur-sm border-b border-coffee/10 dark:border-parchment/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-heading text-lg font-semibold tracking-wide group-hover:text-accent transition-colors">
              {profile.displayName}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-coffee/50 dark:text-parchment/50">
              {profile.title}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  pathname === link.href
                    ? "text-accent"
                    : "text-coffee/70 dark:text-parchment/70 hover:text-coffee dark:hover:text-parchment"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/speaking"
              className="px-5 py-2 bg-accent hover:bg-accent-hover text-parchment text-sm font-medium tracking-wide transition-colors"
            >
              演講邀約
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="開啟選單"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-[1.5px] bg-coffee dark:bg-parchment transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-coffee dark:bg-parchment transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-coffee dark:bg-parchment transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-parchment dark:bg-coffee border-t border-coffee/10 dark:border-parchment/10 ${
          menuOpen ? "max-h-64" : "max-h-0 border-t-0"
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-base ${
                pathname === link.href
                  ? "text-accent"
                  : "text-coffee/80 dark:text-parchment/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
