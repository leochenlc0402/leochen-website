import type { Metadata } from "next";
import { LXGW_WenKai_TC, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

// 三個字型掛成設計系統鎖定的 token 名稱：--font-serif / --font-sans / --font-voice。
// 標題用宋體 700、900；內文用黑體 400、500；口語聲道用文楷 400。
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const wenKaiTC = LXGW_WenKai_TC({
  variable: "--font-voice",
  subsets: ["latin"],
  weight: ["400"],
});

// 預覽部署用：正式網域上線前用環境變數關掉索引，上線後把環境變數拿掉即可，不用改程式碼。
const noindex = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const metadata: Metadata = {
  metadataBase: new URL("https://leochen.example"),
  title: {
    default: `${profile.displayName} — ${profile.title}`,
    template: `%s｜${profile.displayName}`,
  },
  description:
    "陳荐宏 Leo Chen，性平講師 × 社群媒體創作者。演講主題：性別平等與 CEDAW、多元性別、性別與日常生活、媒體社群與內容創作。演講邀約請來信。",
  openGraph: {
    title: `${profile.displayName} — ${profile.title}`,
    description:
      "把法定必修，講成大家想聽的那一堂。80 多場演講經驗，性平講師陳荐宏 Leo Chen 個人網站首頁。",
    url: "https://leochen.example",
    siteName: profile.displayName,
    locale: "zh_TW",
    type: "website",
  },
  ...(noindex
    ? { robots: { index: false, follow: false } }
    : {}),
};

// 這裡只放全站共用的 html/body 外殼與字型——網站的 Header／EndCTA／NoOrphans
// 移到 src/app/(site)/layout.tsx，讓 /studio 路由不會被套上這層網站外框。
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-TW"
      className={`${notoSerifTC.variable} ${notoSansTC.variable} ${wenKaiTC.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-navy)]">
        {children}
      </body>
    </html>
  );
}
