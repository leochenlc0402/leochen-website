/* Hallmark · genre: editorial · macrostructure: Long Document · design-system: design.md · designed-as-app · nav: N1a · footer: Ft6 · pre-emit critique: P4 H4 E4 S4 R4 V4 */
import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import SpecTable from "@/components/SpecTable";
import CTALink from "@/components/CTALink";
import { topics } from "@/data/topics";
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
      {/* 標題與邀約說明 */}
      <Section padding="pt-[var(--space-xl)] sm:pt-[var(--space-2xl)] pb-[var(--space-xl)]">
        <SectionTitle
          as="h1"
          formal="演講與分享邀約"
          casual="來信就好，我會照活動安排回你"
        />
        <div className="mt-[var(--space-lg)] max-w-[var(--measure)]">
          <p className="text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[1.7]">
            {inquiryIntro}
          </p>
          <p className="mt-[var(--space-lg)] text-[length:var(--text-base)] text-[var(--color-ink)]">
            {inquiryNote}
          </p>
          <ul className="mt-[var(--space-sm)] list-disc pl-[var(--space-lg)] marker:text-[var(--color-muted)] space-y-[var(--space-xs)] text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[1.7]">
            {inquiryFields.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="mt-[var(--space-lg)] text-[length:var(--text-sm)] text-[var(--color-muted)] leading-[1.7]">
            {emailChannelNote}
          </p>
          <p className="mt-[var(--space-xs)] text-[length:var(--text-sm)] text-[var(--color-muted)] leading-[1.7]">
            {replyNote}
          </p>
          <p className="mt-[var(--space-lg)]">
            <CTALink href={buildMailtoHref()} className="text-[length:var(--text-base)] whitespace-nowrap">
              寫信給我 →
            </CTALink>
          </p>
        </div>
      </Section>

      {/* 費用怎麼算 */}
      <Section padding="py-[var(--space-xl)]">
        <SectionTitle formal="費用怎麼算" casual="一次講清楚" />
        <p className="mt-[var(--space-lg)] max-w-[var(--measure)] text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[1.7]">
          {feeIntro}
        </p>
        <div className="mt-[var(--space-lg)]">
          <SpecTable
            rows={[
              {
                dt: "公務機關／學校",
                dd: (
                  <div className="space-y-[var(--space-xs)]">
                    {publicSectorFees.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                ),
              },
              { dt: "企業／民間機構", dd: corporateFeeNote },
              {
                dt: "交通費",
                dd: (
                  <div className="space-y-[var(--space-xs)]">
                    {transportFees.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Section>

      {/* 四個講題 */}
      <Section id="topics" padding="py-[var(--space-xl)]">
        <SectionTitle formal="四個講題" casual="挑你要的，深淺我來調" />
        <div className="mt-[var(--space-lg)] space-y-[var(--space-2xl)]">
          {topics.map((topic, i) => (
            <section key={topic.no} id={`topic-${i + 1}`}>
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] text-[var(--color-ink)]">
                {topic.title}
              </h3>
              <p className="mt-[var(--space-xs)] text-[length:var(--text-sm)] text-[var(--color-muted)]">
                適合對象／建議時長／形式：（待里歐提供）　對應時數：{topic.legalHours}
              </p>
              <p className="mt-[var(--space-sm)] max-w-[var(--measure)] text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[1.7]">
                {topic.subtopics.join("、")}
              </p>
            </section>
          ))}
        </div>
      </Section>

      {/* 謝謝這些單位的邀請 */}
      <Section padding="pt-[var(--space-xl)] pb-0">
        <SectionTitle
          formal="謝謝這些單位的邀請"
          casual="政府、學校、企業都有"
        />
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
    </div>
  );
}
