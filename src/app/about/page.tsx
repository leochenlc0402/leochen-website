import type { Metadata } from "next";
import Section from "@/components/Section";
import { profile } from "@/data/profile";
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
  title: "關於里歐",
  description:
    "陳荐宏 Leo Chen 的完整經歷：工作經歷、學歷、公部門與民間服務、專業資格、主持經歷、出版與研究。",
  openGraph: {
    title: `關於里歐｜${profile.displayName}`,
    description: "性平講師陳荐宏 Leo Chen 的完整經歷總覽。",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-clay mb-4">
            About
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            關於里歐
          </h1>
          <p className="text-base sm:text-lg text-coffee/75 dark:text-parchment/75 leading-relaxed">
            （待里歐提供：為什麼做性平教育，300 字）
          </p>
          <p className="mt-6 text-sm text-coffee/50 dark:text-parchment/50">
            至今累積 175+ 小時演講時數。
          </p>
        </div>
      </section>

      {/* 工作經歷 */}
      <Section
        formal="工作經歷"
        casual="這些是我實際待過、做過的地方"
        eyebrow="Experience"
      >
        <ul className="space-y-4">
          {workExperience.map((item) => (
            <li key={item.org} className="border-l-2 border-clay pl-4 sm:pl-6">
              <p className="font-medium">{item.org}</p>
              <p className="text-sm text-coffee/60 dark:text-parchment/60">
                {item.role}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 學歷 */}
      <Section
        formal="學歷"
        casual="從口語傳播念到公關廣告，一路都在跟人講話"
        eyebrow="Education"
        tone="dark"
      >
        <ul className="space-y-4">
          {education.map((item) => (
            <li key={item.school} className="border-l-2 border-sand pl-4 sm:pl-6">
              <p className="font-medium">{item.school}</p>
              <p className="text-sm text-parchment/60">{item.degree}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 服務與參與 */}
      <Section
        formal="服務與參與"
        casual="政府請我去審別人的性平"
        eyebrow="Service"
      >
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
      <Section
        formal="主持經歷"
        casual="這塊還在整理，先別問我"
        eyebrow="Hosting"
        tone="dark"
      >
        <p className="text-parchment/60">（{hostingNote}）</p>
      </Section>

      {/* 出版與研究 */}
      <Section
        formal="出版與研究"
        casual="從書到論文，白紙黑字都在這"
        eyebrow="Publications"
      >
        <div className="space-y-12">
          <div>
            <h3 className="font-heading text-lg font-semibold mb-3">
              性別專書出版
            </h3>
            <p className="text-sm text-coffee/80 dark:text-parchment/80 leading-relaxed">
              {publishedBook.authors}《{publishedBook.title}》(ISBN:
              {publishedBook.isbn})
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-3">
              政策諮詢與專案顧問
            </h3>
            <ul className="space-y-3 text-sm text-coffee/80 dark:text-parchment/80 leading-relaxed">
              {policyConsulting.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-3">
              論文與學術發表
            </h3>
            <ul className="space-y-3 text-sm text-coffee/80 dark:text-parchment/80 leading-relaxed">
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
