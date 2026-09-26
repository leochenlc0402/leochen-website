import type { Metadata } from "next";
import { LXGW_WenKai_TC, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

// 三個字型直接掛成 design.md 鎖定的 token 名稱：--font-display / --font-body / --font-voice。
// 字級與字重只用 design.md 指定的那一組，不多帶其他 weight。
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
});

const wenKaiTC = LXGW_WenKai_TC({
  variable: "--font-voice",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://leochen.example"),
  title: {
    default: `${profile.displayName} — ${profile.title}`,
    template: `%s｜${profile.displayName}`,
  },
  description:
    "陳荐宏 Leo Chen，性平講師 × 社群媒體創作者。演講主題：性別平等、多元性別、公共溝通、社群創作。演講邀約請來信。",
  openGraph: {
    title: `${profile.displayName} — ${profile.title}`,
    description:
      "性平講師與社群媒體創作者，累積 80 多場演講經驗，提供性別平等、多元性別與公共溝通主題的演講邀約。",
    url: "https://leochen.example",
    siteName: profile.displayName,
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-TW"
      className={`${notoSerifTC.variable} ${notoSansTC.variable} ${wenKaiTC.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
