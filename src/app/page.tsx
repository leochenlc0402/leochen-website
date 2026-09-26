import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Placeholder from "@/components/Placeholder";
import { profile } from "@/data/profile";
import { stats } from "@/data/stats";
import { identityCards } from "@/data/identity";
import { topics } from "@/data/topics";
import {
  heroFormal,
  heroCasual,
  heroSubhead,
  buyerPains,
  collaborationSteps,
  featuredTestimonials,
} from "@/data/homepage";

export const metadata: Metadata = {
  title: `${profile.displayName} — ${profile.title}`,
  description:
    "陳荐宏 Leo Chen：性平講師 × 社群媒體創作者。政府性平委員、夫夫之道共同創作者、公開同志伴侶——三個身份一起作證的性平講師。",
  openGraph: {
    title: `${profile.displayName} — ${profile.title}`,
    description: "把法定必修，講成大家想聽的那一堂。80 多場演講經驗，性平講師陳荐宏 Leo Chen 個人網站首頁。",
    type: "profile",
  },
};

export default function Home() {
  return (
    <div>
      {/* 頭版：雙聲道 H1，字壓過圖 */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_0.6fr] gap-10 items-center">
          <div className="animate-fade-up">
            <h1 className="leading-tight">
              <span className="block font-heading font-bold text-4xl sm:text-5xl lg:text-7xl">
                {heroFormal.split("，").filter(Boolean).map((seg, i) => (
                  <span key={i} className="inline-block whitespace-nowrap">
                    {seg}，
                  </span>
                ))}
              </span>
              <span className="block text-balance font-body font-black text-accent text-3xl sm:text-4xl lg:text-5xl mt-2">
                {heroCasual}
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-coffee/70 dark:text-parchment/70 max-w-md leading-relaxed">
              {heroSubhead}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/speaking"
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-parchment text-sm font-medium tracking-wide transition-colors"
              >
                邀請演講
              </Link>
              <Link
                href="/speaking#topics"
                className="px-6 py-3 border border-coffee/20 dark:border-parchment/20 text-sm font-medium tracking-wide hover:border-accent hover:text-accent transition-colors"
              >
                看講題
              </Link>
            </div>
          </div>
          <div>
            {/* 形象照尚未提供：素色矩形占位，不用桃色圓形頭像圖示 */}
            <Placeholder label="形象照待補" ratio="aspect-[4/5]" />
          </div>
        </div>
      </section>

      {/* 你可能正在找這樣的講師：hero 到痛點段收緊節奏 */}
      <Section
        formal="你可能正在找這樣的講師"
        casual="先講三個你可能正在頭痛的問題"
        tone="dark"
        padding="pt-8 pb-16 sm:pb-20"
      >
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buyerPains.map((pain) => (
            <li
              key={pain}
              className="border-l-2 border-clay pl-4 sm:pl-6 text-sm sm:text-base text-parchment/85 leading-relaxed"
            >
              {pain}
            </li>
          ))}
        </ul>
      </Section>

      {/* 四格數據：拆框，數字與標籤同排、格間用分隔線 */}
      <Section formal="用場次說話" casual="沒有比場次更誠實的數字">
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          {stats.map((s, i) => {
            // 第四格（重複邀約單位）數字待里歐提供，先隱藏，資料欄位留著。
            if (i === 3) return null;
            return (
              <div
                key={s.label}
                className={`flex items-baseline gap-3 ${
                  i > 0 ? "border-l border-sand pl-6 sm:pl-12" : ""
                }`}
              >
                <span className="font-heading text-5xl sm:text-6xl font-bold text-accent">
                  {s.value}
                </span>
                <span className="text-sm text-coffee/60 dark:text-parchment/60">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 為什麼是他：拆框改直排列表 */}
      <Section formal="為什麼是他" casual="委員、創作者、當事人，三個身份一起作證">
        <div className="divide-y divide-sand">
          {identityCards.map((card) => (
            <div
              key={card.title}
              className="py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-10"
            >
              <div>
                <p className="font-heading text-xl sm:text-2xl font-semibold text-coffee dark:text-parchment">
                  {card.title}
                </p>
                <p className="mt-2 ml-1 border-l-4 border-accent pl-3 font-body font-bold text-accent">
                  {card.angle}
                </p>
              </div>
              <ul className="space-y-2 text-sm text-coffee/75 dark:text-parchment/75 leading-relaxed">
                {card.evidenceLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 他們怎麼說：拆掉跑馬燈，只留三句精選放大，第一句出格 */}
      <Section formal="他們怎麼說" casual="不是我說的，是台下寫的" padding="py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_0.8fr] gap-8 sm:gap-10">
          {featuredTestimonials.map((t, i) => (
            <div
              key={t.quote}
              className={`border-l-2 border-accent pl-4 sm:pl-6 ${
                i === 0 ? "lg:-mr-24" : ""
              }`}
            >
              <p className="font-heading text-2xl lg:text-3xl leading-snug">
                「{t.quote}」
              </p>
              <p className="mt-4 text-xs text-coffee/50 dark:text-parchment/50">
                {t.org}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 四大講題精簡版 */}
      <Section formal="四大講題" casual="挑你要的，我依需求調整深淺">
        <ul className="divide-y divide-sand">
          {topics.map((topic) => (
            <li
              key={topic.no}
              className="flex flex-wrap items-baseline justify-between gap-2 py-4"
            >
              <span className="font-heading text-lg font-semibold">
                {topic.title}
              </span>
              <span className="text-sm text-coffee/50 dark:text-parchment/50">
                適合對象：{topic.suitableFor}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href="/speaking#topics"
          className="mt-8 inline-block text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          看完整講題內容與費用 →
        </Link>
      </Section>

      {/* 怎麼合作 */}
      <Section formal="怎麼合作" casual="三步驟，不繞路" tone="dark">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collaborationSteps.map((step, i) => (
            <div key={step.title}>
              <p className="font-heading text-3xl font-bold text-parchment/30 mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-heading text-lg font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-parchment/70 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 授課現場照片牆 */}
      <Section formal="授課現場" casual="不是形象照，是真的站在台上那個樣子">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Placeholder key={i} label="授課現場照待補" />
          ))}
        </div>
      </Section>

      {/* 頁尾前 CTA */}
      <section className="bg-coffee text-parchment px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug">
            {heroFormal}
            {heroCasual}
          </p>
          <p className="mt-4 text-sm sm:text-base text-parchment/60">
            {heroSubhead}
          </p>
          <Link
            href="/speaking"
            className="mt-8 inline-block px-8 py-3 bg-parchment text-coffee hover:bg-sand text-sm font-medium tracking-wide transition-colors"
          >
            邀請演講
          </Link>
        </div>
      </section>
    </div>
  );
}
