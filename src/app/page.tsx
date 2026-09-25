import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Marquee from "@/components/Marquee";
import Placeholder from "@/components/Placeholder";
import { profile } from "@/data/profile";
import { stats } from "@/data/stats";
import {
  workExperience,
  education,
  publicService,
  privateService,
  qualifications,
  hostingNote,
  publishedBook,
  policyConsulting,
  papers,
} from "@/data/experience";

export const metadata: Metadata = {
  title: `${profile.displayName} — ${profile.title}`,
  description:
    "陳荐宏 Leo Chen 的個人網站：80 多場演講經歷、性別平等與多元性別講題、工作經歷與出版研究總覽。",
  openGraph: {
    title: `${profile.displayName} — ${profile.title}`,
    description: "80 多場演講經歷，性別平等與多元性別講師陳荐宏 Leo Chen 個人網站首頁。",
    type: "profile",
  },
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="animate-fade-up">
            <p className="text-xs tracking-[0.3em] uppercase text-clay mb-4">
              性平講師 × 社群媒體創作者
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {profile.nameZh}
              <span className="block text-2xl sm:text-3xl font-normal text-coffee/70 dark:text-parchment/70 mt-2">
                {profile.nameEn}
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-coffee/70 dark:text-parchment/70 max-w-md leading-relaxed">
              演講主題：性別平等 × 多元性別 × 公共溝通 × 社群創作
              <span className="block mt-2 text-sm opacity-60">（自我介紹文字待里歐提供）</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/speaking"
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-parchment text-sm font-medium tracking-wide transition-colors"
              >
                邀請演講
              </Link>
              <Link
                href="/media"
                className="px-6 py-3 border border-coffee/20 dark:border-parchment/20 text-sm font-medium tracking-wide hover:border-accent hover:text-accent transition-colors"
              >
                看媒體影音
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

      {/* 四格數據 */}
      <Section title="用場次說話" eyebrow="Track Record">
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

      {/* 回饋跑馬燈 */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Marquee />
        </div>
      </div>

      {/* 照片牆 */}
      <Section title="照片牆" eyebrow="Gallery">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Placeholder key={i} label="照片待補" />
          ))}
        </div>
      </Section>

      {/* 工作經歷 */}
      <Section title="工作經歷" eyebrow="Experience">
        <ul className="space-y-4">
          {workExperience.map((item) => (
            <li
              key={item.org}
              className="border-l-2 border-clay pl-4 sm:pl-6"
            >
              <p className="font-medium">{item.org}</p>
              <p className="text-sm text-coffee/60 dark:text-parchment/60">
                {item.role}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 學歷 */}
      <Section title="學歷" eyebrow="Education" tone="dark">
        <ul className="space-y-4">
          {education.map((item) => (
            <li key={item.school} className="border-l-2 border-clay pl-4 sm:pl-6">
              <p className="font-medium">{item.school}</p>
              <p className="text-sm text-parchment/60">{item.degree}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 服務與參與 */}
      <Section title="服務與參與" eyebrow="Service">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              公部門服務經歷
            </h3>
            <ul className="space-y-3 text-sm text-coffee/75 dark:text-parchment/75 leading-relaxed">
              {publicService.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              民間組織服務經歷
            </h3>
            <ul className="space-y-3 text-sm text-coffee/75 dark:text-parchment/75 leading-relaxed">
              {privateService.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              其他專業資格
            </h3>
            <ul className="space-y-3 text-sm text-coffee/75 dark:text-parchment/75 leading-relaxed">
              {qualifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 主持經歷 */}
      <Section title="主持經歷" eyebrow="Hosting">
        <p className="text-coffee/60 dark:text-parchment/60">（{hostingNote}）</p>
      </Section>

      {/* 出版與研究 */}
      <Section title="出版與研究" eyebrow="Publications" tone="dark">
        <div className="space-y-12">
          <div>
            <h3 className="font-heading text-lg font-semibold mb-3">
              性別專書出版
            </h3>
            <p className="text-sm text-parchment/80 leading-relaxed">
              {publishedBook.authors}《{publishedBook.title}》(ISBN:
              {publishedBook.isbn})
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-3">
              政策諮詢與專案顧問
            </h3>
            <ul className="space-y-3 text-sm text-parchment/80 leading-relaxed">
              {policyConsulting.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-3">
              論文與學術發表
            </h3>
            <ul className="space-y-3 text-sm text-parchment/80 leading-relaxed">
              {papers.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
