import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Placeholder from "@/components/Placeholder";
import { topics, topicsIntro } from "@/data/topics";
import { clientColumns } from "@/data/clients";
import { profile } from "@/data/profile";
import {
  inquiryIntro,
  inquiryNote,
  inquiryFields,
  emailChannelNote,
  replyNote,
  feeIntro,
  publicSectorFees,
  corporateFeeNote,
  transportFees,
  buildMailtoHref,
} from "@/data/speaking";

export const metadata: Metadata = {
  title: "演講邀約",
  description:
    "陳荐宏 Leo Chen 演講邀約說明：來信需附資訊、演講費用（公務機關 4,000 元起）、四大講題與感謝邀請單位名單。",
  openGraph: {
    title: `演講邀約｜${profile.displayName}`,
    description: "性別平等、多元性別、公共溝通、社群創作四大講題，歡迎來信邀約。",
    type: "website",
  },
};

export default function SpeakingPage() {
  return (
    <div>
      <section className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-clay mb-4">
            Speaking Invitation
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            演講與分享邀約
          </h1>
          <p className="text-base sm:text-lg text-coffee/75 dark:text-parchment/75 max-w-2xl leading-relaxed">
            {inquiryIntro}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10">
            <div>
              <h2 className="font-heading text-xl font-semibold mb-4">
                {inquiryNote}
              </h2>
              <ul className="space-y-2 text-coffee/75 dark:text-parchment/75">
                {inquiryFields.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-coffee/60 dark:text-parchment/60 leading-relaxed">
                {emailChannelNote}
              </p>
              <p className="mt-3 text-sm text-coffee/60 dark:text-parchment/60 leading-relaxed">
                {replyNote}
              </p>
            </div>

            <div className="border border-sand p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h2 className="font-heading text-xl font-semibold mb-3">
                  直接寄信邀約
                </h2>
                <p className="text-sm text-coffee/60 dark:text-parchment/60 mb-6">
                  按下方按鈕會開啟信箱，主旨與內容欄位已預先帶入，直接補上單位與活動資訊即可送出。
                </p>
              </div>
              <Link
                href={buildMailtoHref()}
                className="w-full text-center px-6 py-3 bg-accent hover:bg-accent-hover text-parchment text-sm font-medium tracking-wide transition-colors"
              >
                寄信邀約 {profile.email}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 演講費用說明 */}
      <Section title="演講費用說明" eyebrow="Fees" tone="dark">
        <p className="text-sm text-parchment/75 leading-relaxed mb-10 max-w-2xl">
          {feeIntro}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              公務機關／學校
            </h3>
            <ul className="space-y-3 text-sm text-parchment/80 leading-relaxed">
              {publicSectorFees.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-clay">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              企業／民間機構
            </h3>
            <p className="text-sm text-parchment/80 leading-relaxed">
              {corporateFeeNote}
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">交通費</h3>
            <ul className="space-y-3 text-sm text-parchment/80 leading-relaxed">
              {transportFees.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-clay">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 四大講題 */}
      <Section title="演講主題與內容" eyebrow={topicsIntro}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic) => (
            <div key={topic.no} className="border border-sand p-5 sm:p-6 flex flex-col">
              <h3 className="font-heading text-base sm:text-lg font-semibold mb-4">
                <span className="text-accent mr-1">{topic.no}</span>
                {topic.title}
              </h3>
              <ul className="space-y-2 text-sm text-coffee/70 dark:text-parchment/70 flex-1">
                {topic.subtopics.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-clay">·</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Placeholder label="簡報封面待補" ratio="aspect-[4/3]" />
                <Placeholder label="簡報封面待補" ratio="aspect-[4/3]" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 感謝邀請單位 */}
      <Section
        title="謝謝政府機關、學校單位與企業品牌的邀請"
        eyebrow="With Gratitude"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {clientColumns.map((col) => (
            <div key={col.label}>
              <h3 className="font-heading text-base font-semibold mb-4 pb-2 border-b border-clay/40">
                {col.label}
                <span className="ml-2 text-xs font-normal text-coffee/40 dark:text-parchment/40">
                  {col.items.length}
                </span>
              </h3>
              <ul className="space-y-2 text-sm text-coffee/70 dark:text-parchment/70 leading-relaxed">
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
