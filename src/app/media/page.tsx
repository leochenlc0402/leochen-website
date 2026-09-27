import type { Metadata } from "next";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import CTALink from "@/components/CTALink";
import { videoWorks, pressItems, podcast, getYoutubeEmbedId } from "@/data/media";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "作品與報導",
  description:
    "陳荐宏 Leo Chen 的影音作品（含 113 年度勞動人權短片徵選比賽銀獎）、媒體報導與心靈處方籤 Podcast。",
  openGraph: {
    title: `作品與報導｜${profile.displayName}`,
    description: "職場性騷擾主題影音作品、媒體報導與 Podcast 一覽。",
    type: "website",
  },
};

export default function MediaPage() {
  return (
    <div>
      {/* 頁首（navy） */}
      <Section className="navy page-head">
        <Heading as="h1" formal="作品與報導" casual="銀獎那支排第一" />
      </Section>

      {/* 影音作品 */}
      <Section className="resume-block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {videoWorks.map((video) => {
            const embedId = getYoutubeEmbedId(video.youtubeUrl);
            return (
              <div key={video.youtubeUrl}>
                <h3 className="mb-3 font-[family-name:var(--font-serif)] font-bold text-[22px] text-[var(--color-navy)]">
                  {video.title}
                </h3>
                <div className="aspect-video bg-[var(--color-paper-2)]">
                  {embedId && (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${embedId}`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                </div>
                <p className="mt-3 text-[16px] text-[var(--color-ink-2)] leading-[1.75]">
                  {video.description}
                </p>
                {video.award && (
                  <p className="mt-2 text-[14px] text-[var(--color-muted)]">
                    {video.award.replace(/^本片榮獲/, "")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* 媒體報導 */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="媒體報導" casual="按時間排，新的在前面" />
        </div>
        <ol className="space-y-8">
          {pressItems.map((item) => (
            <li key={item.url}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[14px] text-[var(--color-muted)]">
                  {item.outlet}
                </span>
                <span className="text-[14px] [font-variant-numeric:tabular-nums] text-[var(--color-muted)]">
                  {item.date}
                </span>
              </div>
              <CTALink
                href={item.url}
                className="link-ink mt-1 block w-fit font-[family-name:var(--font-serif)] font-bold text-[20px]"
              >
                {item.title}
              </CTALink>
              <p className="mt-1 max-w-[40em] text-[16px] text-[var(--color-ink-2)] leading-[1.75]">
                {item.summary}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Podcast */}
      <Section className="resume-block">
        <div className="head">
          <Heading formal="Podcast" casual="想聽我們兩個聊真心話，來這裡" />
        </div>
        <div className="max-w-[40em]">
          <p className="text-[17px] text-[var(--color-ink-2)] leading-[1.85]">
            {podcast.description}
          </p>
          <p className="mt-4">
            <CTALink href={podcast.url} className="link-ink text-[17px]">
              收聽 {podcast.name} →
            </CTALink>
          </p>
        </div>
      </Section>
    </div>
  );
}
