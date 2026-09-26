import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import SpecTable from "@/components/SpecTable";
import { profile } from "@/data/profile";
import {
  workExperience,
  education,
  publicService,
  privateService,
  qualifications,
  publishedBook,
  policyConsulting,
  papers,
} from "@/data/experience";

export const metadata: Metadata = {
  title: "關於里歐",
  description:
    "陳荐宏 Leo Chen 的完整經歷：工作經歷、學歷、公部門與民間服務、專業資格、出版與研究。",
  openGraph: {
    title: `關於里歐｜${profile.displayName}`,
    description: "性平講師陳荐宏 Leo Chen 的完整經歷總覽。",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* 開場：信件式，視覺上無標題。h1 只給螢幕閱讀器與 SEO，不加視覺樣式（sr-only）。 */}
      <Section padding="pt-[var(--space-xl)] sm:pt-[var(--space-2xl)] pb-[var(--space-xl)]">
        <div className="max-w-[var(--measure)]">
          <h1 className="sr-only">關於{profile.displayName}</h1>
          <p className="font-[family-name:var(--font-voice)] text-[length:var(--text-lg)] text-[var(--color-accent)]">
            你好，我是里歐。
          </p>
          <p className="mt-[var(--space-md)] text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[1.7]">
            （待里歐提供：為什麼做性平教育，300 字，第一人稱）
          </p>
          <p className="mt-[var(--space-lg)] text-[length:var(--text-sm)] text-[var(--color-muted)]">
            目前累計 175 小時以上的演講時數。
          </p>
        </div>
      </Section>

      {/* 工作經歷 */}
      <Section padding="py-[var(--space-xl)]">
        <SectionTitle formal="工作經歷" casual="這些是我實際待過、做過的地方" />
        <div className="mt-[var(--space-lg)]">
          <SpecTable
            rows={workExperience.map((item) => ({
              dt: item.org,
              dd: item.role,
            }))}
          />
        </div>
      </Section>

      {/* 學歷 */}
      <Section padding="py-[var(--space-xl)]">
        <SectionTitle
          formal="學歷"
          casual="從公關廣告念到口語傳播，一路都在學怎麼跟人講話"
        />
        <div className="mt-[var(--space-lg)]">
          <SpecTable
            rows={education.map((item) => ({
              dt: item.school,
              dd: item.degree,
            }))}
          />
        </div>
      </Section>

      {/* 公部門服務 */}
      <Section padding="py-[var(--space-xl)]">
        <SectionTitle formal="公部門服務" casual="政府請我去審別人的性平" />
        <div className="mt-[var(--space-lg)]">
          <SpecTable rows={publicService.map((item) => ({ dt: "", dd: item }))} />
        </div>
      </Section>

      {/* 民間組織 */}
      <Section padding="py-[var(--space-xl)]">
        <SectionTitle formal="民間組織" casual="性平圈子裡也待過理事會" />
        <div className="mt-[var(--space-lg)]">
          <SpecTable
            rows={privateService.map((item) => ({ dt: "", dd: item }))}
          />
        </div>
      </Section>

      {/* 專業資格 */}
      <Section padding="py-[var(--space-xl)]">
        <SectionTitle formal="專業資格" casual="縣市政府的性別人才資料庫都掛得到我" />
        <div className="mt-[var(--space-lg)]">
          <SpecTable
            rows={qualifications.map((item) => ({ dt: "", dd: item }))}
          />
        </div>
      </Section>

      {/* 出版與研究 */}
      <Section padding="py-[var(--space-xl)] pb-[var(--space-3xl)]">
        <SectionTitle formal="出版與研究" casual="從書到論文，白紙黑字都在這" />
        <div className="mt-[var(--space-lg)] space-y-[var(--space-xl)]">
          <div>
            <p className="text-[length:var(--text-sm)] text-[var(--color-muted)] mb-[var(--space-xs)]">
              性別專書出版
            </p>
            <SpecTable
              rows={[
                {
                  dt: publishedBook.isbn,
                  dd: `${publishedBook.authors}《${publishedBook.title}》`,
                },
              ]}
            />
          </div>
          <div>
            <p className="text-[length:var(--text-sm)] text-[var(--color-muted)] mb-[var(--space-xs)]">
              政策諮詢與專案顧問
            </p>
            <SpecTable
              rows={policyConsulting.map((item) => ({ dt: "", dd: item }))}
            />
          </div>
          <div>
            <p className="text-[length:var(--text-sm)] text-[var(--color-muted)] mb-[var(--space-xs)]">
              論文與學術發表
            </p>
            <SpecTable rows={papers.map((item) => ({ dt: "", dd: item }))} />
          </div>
        </div>
      </Section>

      {/* 署名 */}
      <Section padding="pb-[var(--space-3xl)]">
        <p className="font-[family-name:var(--font-voice)] text-[length:var(--text-base)] text-[var(--color-accent)]">
          {profile.displayName}
        </p>
      </Section>
    </div>
  );
}
