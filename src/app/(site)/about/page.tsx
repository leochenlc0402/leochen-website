import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import SpecTable from "@/components/SpecTable";
import CTALink from "@/components/CTALink";
import { profile as profileFallback } from "@/data/profile";
import { getSiteProfile, getAboutData } from "@/sanity/lib/pageData";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "關於里歐",
  description:
    "陳荐宏 Leo Chen 的完整經歷：工作經歷、學歷、公部門與民間服務、專業資格、主持經歷、出版與研究。",
  openGraph: {
    title: `關於里歐｜${profileFallback.displayName}`,
    description: "性平講師陳荐宏 Leo Chen 的完整經歷總覽。",
    type: "profile",
  },
};

export default async function AboutPage() {
  const [profile, about] = await Promise.all([getSiteProfile(), getAboutData()]);
  const {
    positioning,
    highlights,
    aboutIntro,
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
  } = about;

  return (
    <div>
      {/* 頁首（navy）：文楷金色小字＋宋體大標＋右側形象照 */}
      <Section className="navy page-head">
        <div className="page-head-grid">
          <div>
            <p className="note">{aboutIntro.kicker}</p>
            <h1 className="h2">{aboutIntro.greeting}</h1>
            <p className="sub">{positioning.oneLiner || profile.title}</p>
            <div className="actions">
              <CTALink href="/speaking" className="btn">
                邀請演講 →
              </CTALink>
              <CTALink href="/#topics-home" className="link">
                看四個講題
              </CTALink>
            </div>
          </div>
          <div className="ph">
            <Image
              src={profile.aboutImage.src}
              alt={`${profile.displayName} 形象照`}
              fill
              sizes="(max-width: 760px) 100vw, 30vw"
              style={{ objectFit: "cover", objectPosition: profile.aboutImage.objectPosition }}
              priority
            />
          </div>
        </div>
      </Section>

      {/* 我的不同（USP）：里歐回覆挑選融合，空白不顯示 */}
      {positioning.uspTitle && (
        <Section className="values-block">
          <div className="usp">
            <p className="note">我的不同</p>
            <p className="motto">{positioning.uspTitle}</p>
            {positioning.uspBody && <p className="motto-note">{positioning.uspBody}</p>}
          </div>
        </Section>
      )}

      {/* 我的故事：自介全文逐字，依時間排成故事線 */}
      <Section className="story">
        <div className="head">
          <Heading formal="我的故事" casual="從影像出發，一路走進公共倡議" />
        </div>
        <ol className="story-line">
          {aboutIntro.paragraphs.map((p, i) => (
            <li key={p}>
              <span className="story-label">{aboutIntro.storyLabels?.[i] ?? ""}</span>
              <div className="story-body">
                <p>{p}</p>
              </div>
            </li>
          ))}
          <li className="story-belief">
            <span className="story-label">我相信</span>
            <div className="story-body">
              <p>
                {aboutIntro.beliefPrefix}
                <span className="accent-coral">{aboutIntro.beliefLine}</span>
              </p>
              <p>{aboutIntro.closing}</p>
            </div>
          </li>
        </ol>
      </Section>

      {/* 經歷亮點：數字全取自里歐提供的自介與經歷 */}
      <Section className="highlights">
        <div className="head">
          <Heading formal="經歷亮點" casual="十年來累積的實績" />
        </div>
        <div className="hl-grid">
          {highlights.map((h) => (
            <div className="hl" key={h.label}>
              <b>
                {h.value}
                {h.unit && <em>{h.unit}</em>}
              </b>
              <span>{h.label}</span>
            </div>
          ))}
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
            casual="從公關廣告唸到口語傳播，一路都在練習與人的溝通和對話。"
          />
        </div>
        <SpecTable
          rows={education.map((item) => ({ dt: item.school, dd: item.degree }))}
        />
      </Section>

      {/* 公部門服務 */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="公部門服務" casual="與各地政府並肩，創造友善環境。" />
        </div>
        <SpecTable rows={publicService.map((item) => ({ dd: item }))} />
      </Section>

      {/* 民間組織 */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="民間組織" casual="讓公民行動成為推動友善的力量" />
        </div>
        <SpecTable rows={privateService.map((item) => ({ dd: item }))} />
      </Section>

      {/* 專業資格 */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="專業資格" casual="讓性別人才資料庫，為你的選擇多一重保障" />
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
          <Heading formal="出版與研究" casual="從專書到論文，記下與這片土地的重要時刻" />
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
