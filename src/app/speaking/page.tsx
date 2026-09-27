import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import SpecTable from "@/components/SpecTable";
import CTALink from "@/components/CTALink";
import { topics } from "@/data/topics";
import { clientColumns, cityLogos } from "@/data/clients";
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
  formats,
  buildMailtoHref,
} from "@/data/speaking";

export const metadata: Metadata = {
  title: "演講邀約",
  description:
    "陳荐宏 Leo Chen 演講邀約說明：來信需附資訊、演講費用（公務機關 4,000 元起）、四大講題與感謝邀請單位名單。",
  openGraph: {
    title: `演講邀約｜${profile.displayName}`,
    description: "性別平等與 CEDAW、多元性別、性別與公共生活、媒體社群與內容創作，四大講題歡迎來信邀約。",
    type: "website",
  },
};

export default function SpeakingPage() {
  return (
    <div>
      {/* 頁首（navy） */}
      <Section className="navy page-head">
        <Heading as="h1" formal="演講邀約" casual="來信就好，我會照活動安排回你" />
        <div className="mt-8">
          <CTALink href={buildMailtoHref()} className="btn">
            寫信邀請 →
          </CTALink>
        </div>
      </Section>

      {/* 邀約說明與來信七項 */}
      <Section className="about-copy">
        <div className="narrow">
          <p>{inquiryIntro}</p>
          <p className="mt-6">{inquiryNote}</p>
          <ul className="inquiry-list">
            {inquiryFields.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] text-[var(--color-muted)] leading-[1.7]">
            {emailChannelNote}
          </p>
          <p className="mt-2 text-[14px] text-[var(--color-muted)] leading-[1.7]">
            {replyNote}
          </p>
        </div>
      </Section>

      {/* 費用怎麼算 */}
      <Section id="fees" className="resume-block">
        <div className="head">
          <Heading formal="費用怎麼算" casual="一次講清楚" />
        </div>
        <p className="max-w-[40em] text-[17px] text-[var(--color-ink-2)] leading-[1.85] mb-8">
          {feeIntro}
        </p>
        <SpecTable
          rows={[
            {
              dt: "公務機關／學校",
              dd: (
                <div className="space-y-1">
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
                <div className="space-y-1">
                  {transportFees.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* 四個講題（完整版） */}
      <Section id="topics" className="resume-block">
        <div className="head">
          <Heading formal="四個講題" casual="挑你要的，深淺我來調" />
        </div>
        {topics.map((topic, i) => (
          <div className="topic-full" id={`topic-${i + 1}`} key={topic.no}>
            <h3>{topic.title}</h3>
            <p className="fit">{topic.fit}</p>
            <p className="s">{topic.subtopics.join("、")}</p>
            <p className="mt-3 text-[14px] text-[var(--color-muted)]">
              對應時數：{topic.legalHours}
            </p>
            <div className="cover-pairs">
              {topic.coverSlugs.map((slug) => (
                <div className="cover-pair" key={slug}>
                  <div className="cover-img">
                    <Image
                      src={`/images/covers/${slug}-cover.jpg`}
                      alt={`${topic.title} 簡報封面`}
                      fill
                      sizes="(max-width: 760px) 45vw, 22vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="cover-img">
                    <Image
                      src={`/images/covers/${slug}-inner.jpg`}
                      alt={`${topic.title} 簡報內頁`}
                      fill
                      sizes="(max-width: 760px) 45vw, 22vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* 五種合作形式 */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="可以怎麼請他" casual="從一場演講到整天工作坊" />
        </div>
        {formats.map((f) => (
          <div className="fmt" key={f.title}>
            <h4>{f.title}</h4>
            <div>
              {f.fields.map((field) => (
                <p key={field.label}>
                  <strong>{field.label}：</strong>
                  {field.value}
                </p>
              ))}
            </div>
            <span className="dur">{f.homeDuration}</span>
          </div>
        ))}
      </Section>

      {/* 謝謝這些單位的邀請 */}
      <Section id="clients" className="again">
        <div className="head">
          <Heading formal="謝謝這些單位的邀請" casual="政府、學校、企業都有" />
        </div>
        <div className="logos">
          {cityLogos.map((logo) => (
            <div className="logo-img" key={logo.slug}>
              <Image
                src={`/images/logo-${logo.slug}.png`}
                alt={logo.name}
                fill
                sizes="120px"
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
        <div className="client-list">
          {clientColumns.map((col) => (
            <p key={col.label}>
              <span className="label">{col.label}：</span>
              {col.items.join("、")}
            </p>
          ))}
        </div>
      </Section>
    </div>
  );
}
