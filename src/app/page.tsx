import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Marquee from "@/components/Marquee";
import Placeholder from "@/components/Placeholder";
import { profile } from "@/data/profile";
import { stats } from "@/data/stats";
import { identityCards } from "@/data/identity";
import { topics } from "@/data/topics";
import {
  heroKicker,
  heroHeadline,
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
      {/* 頭版 */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="animate-fade-up">
            <p className="text-xs tracking-[0.3em] uppercase text-clay mb-4">
              {heroKicker}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {heroHeadline}
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
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element -- 純占位 SVG，不需影像最佳化 */}
            <img
              src={profile.heroImagePlaceholder}
              alt="陳荐宏形象照待補"
              width={480}
              height={600}
              className="w-full h-auto border border-sand"
            />
          </div>
        </div>
      </section>

      {/* 你可能正在找這樣的講師 */}
      <Section
        formal="你可能正在找這樣的講師"
        casual="先講三個你可能正在頭痛的問題"
        tone="dark"
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

      {/* 四格數據 */}
      <Section
        formal="用場次說話"
        casual="沒有比場次更誠實的數字"
        eyebrow="Track Record"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border border-sand p-6 text-center sm:text-left"
            >
              <p className="font-heading text-3xl sm:text-4xl font-bold text-accent">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-coffee/60 dark:text-parchment/60">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 為什麼是他 */}
      <Section
        formal="為什麼是他"
        casual="委員、創作者、當事人，三個身份一起作證"
        eyebrow="Why Him"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {identityCards.map((card) => (
            <div key={card.title} className="border border-sand p-6 sm:p-7">
              <p className="text-xs tracking-[0.2em] uppercase text-clay mb-2">
                {card.angle}
              </p>
              <h3 className="font-heading text-xl font-semibold mb-4">
                {card.title}
              </h3>
              <ul className="space-y-2 text-sm text-coffee/75 dark:text-parchment/75 leading-relaxed">
                {card.evidenceLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 他們怎麼說 */}
      <Section
        formal="他們怎麼說"
        casual="不是我說的，是台下寫的"
        eyebrow="Feedback"
      >
        <Marquee />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTestimonials.map((t) => (
            <div key={t.quote} className="border-l-2 border-accent pl-4 sm:pl-6">
              <p className="font-heading text-lg sm:text-xl leading-relaxed">
                「{t.quote}」
              </p>
              <p className="mt-3 text-xs text-coffee/50 dark:text-parchment/50">
                {t.org}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 四大講題精簡版 */}
      <Section
        formal="四大講題"
        casual="挑你要的，我依需求調整深淺"
        eyebrow="Topics"
      >
        <ul className="divide-y divide-sand">
          {topics.map((topic) => (
            <li
              key={topic.no}
              className="flex flex-wrap items-baseline justify-between gap-2 py-4"
            >
              <span className="font-heading text-lg font-semibold">
                <span className="text-accent mr-2">{topic.no}</span>
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
      <Section
        formal="授課現場"
        casual="不是形象照，是真的站在台上那個樣子"
        eyebrow="On Stage"
      >
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
            {heroHeadline}
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
