/* Hallmark · genre: editorial · macrostructure: Marquee Hero · design-system: design.md · designed-as-app · nav: N1a · footer: Ft6 · pre-emit critique: P4 H4 E4 S4 R4 V4 */
import type { Metadata } from "next";
import Placeholder from "@/components/Placeholder";
import CTALink from "@/components/CTALink";
import SectionTitle from "@/components/SectionTitle";
import Section from "@/components/Section";
import { profile } from "@/data/profile";
import { stats } from "@/data/stats";
import { topics } from "@/data/topics";
import { clientColumns } from "@/data/clients";
import {
  heroFormal,
  heroCasual,
  heroSubhead,
  featuredTestimonials,
} from "@/data/homepage";

export const metadata: Metadata = {
  title: `${profile.displayName} — ${profile.title}`,
  description:
    "陳荐宏 Leo Chen：性平講師 × 社群媒體創作者。政府性平委員、夫夫之道共同創作者、公開同志伴侶——三個身份一起作證的性平講師。",
  openGraph: {
    title: `${profile.displayName} — ${profile.title}`,
    description:
      "把法定必修，講成大家想聽的那一堂。80 多場演講經驗，性平講師陳荐宏 Leo Chen 個人網站首頁。",
    type: "profile",
  },
};

// 首頁四格數據第四格（重複邀約單位）數字待里歐提供，先不顯示。
const visibleStats = stats.filter((_, i) => i !== 3);
const [pullQuote, ...sideQuotes] = featuredTestimonials;

export default function Home() {
  return (
    <div>
      {/* 首屏：Marquee Hero——只有主張句，沒有按鈕、沒有圖、沒有副標 */}
      <section className="px-[var(--space-md)] sm:px-[var(--space-xl)] pt-[var(--space-xl)] sm:pt-[var(--space-xl)] pb-[var(--space-2xl)] sm:pb-[var(--space-3xl)] min-h-[56vh] sm:min-h-[68vh] flex flex-col justify-between">
        <div className="max-w-[var(--container)] mx-auto w-full flex-1 flex flex-col justify-center">
          <h1 className="font-[family-name:var(--font-display)] font-semibold leading-[1.1] tracking-[-0.01em] text-[length:var(--text-display)] text-[var(--color-ink)]">
            <span className="block">
              {heroFormal
                .split("，")
                .filter(Boolean)
                .map((seg) => (
                  <span key={seg} className="inline-block whitespace-nowrap">
                    {seg}，
                  </span>
                ))}
            </span>
            <span className="block whitespace-nowrap">
              {heroCasual.split("好玩").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-[var(--color-accent)]">好玩</span>
                  )}
                </span>
              ))}
            </span>
          </h1>
        </div>
        <div className="max-w-[var(--container)] mx-auto w-full flex justify-end">
          <p className="font-[family-name:var(--font-voice)] text-[length:var(--text-sm)] text-[var(--color-muted)]">
            {profile.displayName} · {profile.title}
          </p>
        </div>
      </section>

      {/* 首屏下方一條 2px 粗線，全站唯一的線 */}
      <div aria-hidden className="h-[2px] w-full bg-[var(--color-ink)]" />

      {/* 自介段 */}
      <Section padding="pt-[var(--space-2xl)] pb-[var(--space-xl)]">
        <div className="max-w-[var(--measure)]">
          <p className="text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[1.7]">
            （待里歐提供：兩句話講你是誰、為什麼做性平教育）
          </p>
          <p className="mt-[var(--space-md)] font-[family-name:var(--font-voice)] text-[length:var(--text-base)] text-[var(--color-accent)]">
            {heroSubhead}
          </p>
        </div>
      </Section>

      {/* 三個數字：一行純文字，不是格子 */}
      <Section padding="py-[var(--space-xl)]">
        <p className="flex flex-wrap items-baseline gap-x-[var(--space-lg)] gap-y-[var(--space-xs)]">
          {visibleStats.map((s, i) => (
            <span
              key={s.label}
              className="inline-flex items-baseline gap-[var(--space-xs)]"
            >
              {i > 0 && (
                <span aria-hidden className="hidden sm:inline text-[var(--color-rule)]">
                  ・
                </span>
              )}
              <span className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] [font-variant-numeric:tabular-nums] text-[var(--color-ink)]">
                {s.value}
              </span>
              <span className="text-[length:var(--text-sm)] text-[var(--color-ink-2)]">
                {s.label}
              </span>
            </span>
          ))}
        </p>
      </Section>

      {/* 一句聽眾的話：T1 pull quote，允許出格到 52rem */}
      <Section padding="py-[var(--space-3xl)]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,max-content)_minmax(0,24rem)] gap-x-[var(--space-3xl)] gap-y-[var(--space-lg)] items-start">
          <div className="max-w-[min(52rem,100%)]">
            <p className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] leading-snug text-[var(--color-ink)] [text-indent:-0.5em]">
              「{pullQuote.quote}」
            </p>
            <p className="mt-[var(--space-xs)] text-[length:var(--text-sm)] text-[var(--color-muted)]">
              {pullQuote.org}
            </p>
          </div>
          <div className="lg:pt-[var(--space-xs)] space-y-[var(--space-xs)]">
            {sideQuotes.map((t) => (
              <p
                key={t.quote}
                className="text-[length:var(--text-base)] text-[var(--color-ink-2)]"
              >
                {t.quote}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* 講題：雙聲道標題＋四行純文字列 */}
      <Section padding="py-[var(--space-2xl)]">
        <SectionTitle formal="四個講題" casual="挑你要的，深淺我來調" />
        <div className="mt-[var(--space-lg)] max-w-[var(--measure)]">
          {topics.map((topic, i) => (
            <div
              key={topic.no}
              className="flex flex-wrap items-baseline justify-between gap-x-[var(--space-md)] gap-y-[var(--space-xs)] py-[var(--space-sm)]"
            >
              <span className="text-[length:var(--text-base)] text-[var(--color-ink)]">
                {topic.title}
              </span>
              <CTALink href={`/speaking#topic-${i + 1}`}>看內容 →</CTALink>
            </div>
          ))}
        </div>
      </Section>

      {/* 邀請過的單位 */}
      <Section padding="py-[var(--space-2xl)]">
        <SectionTitle formal="他們請過我" casual="政府、學校、企業都有" />
        <div className="mt-[var(--space-lg)] max-w-[var(--measure)] space-y-[var(--space-sm)]">
          {clientColumns.map((col) => (
            <p
              key={col.label}
              className="text-[length:var(--text-sm)] text-[var(--color-muted)] leading-[1.7]"
            >
              <span className="text-[var(--color-ink-2)]">{col.label}：</span>
              {col.items.join("、")}
            </p>
          ))}
        </div>
      </Section>

      {/* 一張照片 */}
      <Section padding="pt-[var(--space-2xl)] pb-0">
        <figure className="max-w-[min(52rem,100%)]">
          <Placeholder label="授課現場照片，待補" ratio="aspect-[16/7]" />
        </figure>
      </Section>
    </div>
  );
}
