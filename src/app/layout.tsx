import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
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
    <html lang="zh-TW" className={`${notoSansTC.variable} ${notoSerifTC.variable}`}>
      <body className="min-h-screen flex flex-col bg-parchment text-coffee dark:bg-coffee dark:text-parchment">
        <Navbar />
        <main className="flex-1 pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
