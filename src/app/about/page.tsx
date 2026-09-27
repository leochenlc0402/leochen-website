import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import SpecTable from "@/components/SpecTable";
import { profile } from "@/data/profile";
import { aboutIntro } from "@/data/about";
import {
  workExperience,
  education,
  publicService,
  privateService,
  qualifications,
  hostingPublicSector,
  hostingEntertainment,
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
      {/* 頁首（navy）：文楷金色小字＋宋體大標＋右側形象照 */}
      <Section className="navy page-head">
        <div className="page-head-grid">
          <div>
            <p className="note">{aboutIntro.kicker}</p>
            <h1 className="h2">{aboutIntro.greeting}</h1>
          </div>
          <div className="ph">
            <Image
              src={profile.aboutImage}
              alt={`${profile.displayName} 形象照`}
              fill
              sizes="(max-width: 760px) 100vw, 30vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </Section>

      {/* 自介全文逐字 */}
      <Section className="about-copy">
        <div className="narrow">
          {aboutIntro.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            {aboutIntro.beliefPrefix}
            <span className="accent-coral">{aboutIntro.beliefLine}</span>
          </p>
          <p>{aboutIntro.closing}</p>
          <p className="hours-note">{aboutIntro.hoursNote}</p>
        </div>
      </Section>

      {/* 工作經歷 */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="工作經歷" casual="這些是我實際待過、做過的地方" />
        </div>
        <SpecTable
          rows={workExperience.map((item) => ({ dt: item.org, dd: item.role }))}
        />
      </Section>

      {/* 學歷 */}
      <Section className="resume-block">
        <div className="head">
          <Heading
            formal="學歷"
            casual="從公關廣告念到口語傳播，一路都在學怎麼跟人講話"
          />
        </div>
        <SpecTable
          rows={education.map((item) => ({ dt: item.school, dd: item.degree }))}
        />
      </Section>

      {/* 公部門服務 */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="公部門服務" casual="政府請他審別人的性平" />
        </div>
        <SpecTable rows={publicService.map((item) => ({ dd: item }))} />
      </Section>

      {/* 民間組織 */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="民間組織" casual="性平圈子裡也待過理事會" />
        </div>
        <SpecTable rows={privateService.map((item) => ({ dd: item }))} />
      </Section>

      {/* 專業資格 */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="專業資格" casual="縣市政府的性別人才資料庫都掛得到他" />
        </div>
        <SpecTable rows={qualifications.map((item) => ({ dd: item }))} />
      </Section>

      {/* 主持經歷：公務機關／娛樂產業兩欄 */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="主持經歷" casual="記者會、見面會、遊行主舞台都主持過" />
        </div>
        <div className="two-col">
          <div>
            <p className="col-label">公務機關</p>
            <SpecTable rows={hostingPublicSector.map((item) => ({ dd: item }))} />
          </div>
          <div>
            <p className="col-label">娛樂產業</p>
            <SpecTable rows={hostingEntertainment.map((item) => ({ dd: item }))} />
          </div>
        </div>
      </Section>

      {/* 出版與研究：專書／政策諮詢與專案顧問／論文與學術發表 */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="出版與研究" casual="從書到論文，白紙黑字都在這" />
        </div>
        <SpecTable
          rows={[
            {
              dt: "性別專書出版",
              dd: `${publishedBook.authors}《${publishedBook.title}》（ISBN ${publishedBook.isbn}）`,
            },
          ]}
        />
        <div className="mt-8">
          <SpecTable
            rows={policyConsulting.map((item, i) => ({
              dt: i === 0 ? "政策諮詢與專案顧問" : undefined,
              dd: item,
            }))}
          />
        </div>
        <div className="mt-8">
          <SpecTable
            rows={papers.map((item, i) => ({
              dt: i === 0 ? "論文與學術發表" : undefined,
              dd: item,
            }))}
          />
        </div>
      </Section>
    </div>
  );
}
