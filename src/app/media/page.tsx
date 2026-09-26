import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
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
      <Section padding="pt-[var(--space-xl)] sm:pt-[var(--space-2xl)] pb-[var(--space-xl)]">
        <SectionTitle as="h1" formal="作品與報導" casual="銀獎那支排第一" />
      </Section>

      {/* 影音作品 */}
      <Section padding="py-[var(--space-xl)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[var(--space-2xl)] gap-y-[var(--space-xl)]">
          {videoWorks.map((video) => {
            const embedId = getYoutubeEmbedId(video.youtubeUrl);
            return (
              <div key={video.youtubeUrl}>
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
                <h3 className="mt-[var(--space-sm)] font-[family-name:var(--font-display)] text-[length:var(--text-lg)] text-[var(--color-ink)]">
                  {video.title}
                </h3>
                <p className="mt-[var(--space-xs)] text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[1.7]">
                  {video.description}
                </p>
                {video.award && (
                  <p className="mt-[var(--space-xs)] text-[length:var(--text-sm)] text-[var(--color-muted)]">
                    {video.award.replace(/^本片榮獲/, "")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* 媒體報導 */}
      <Section padding="py-[var(--space-xl)]">
        <SectionTitle formal="媒體報導" casual="按時間排，新的在前面" />
        <ol className="mt-[var(--space-lg)] space-y-[var(--space-lg)]">
          {pressItems.map((item) => (
            <li key={item.url}>
              <div className="flex flex-wrap items-baseline gap-x-[var(--space-sm)] gap-y-[var(--space-xs)]">
                <span className="text-[length:var(--text-sm)] text-[var(--color-muted)]">
                  {item.outlet}
                </span>
                <span className="text-[length:var(--text-sm)] [font-variant-numeric:tabular-nums] text-[var(--color-muted)]">
                  {item.date}
                </span>
              </div>
              <CTALink
                href={item.url}
                className="mt-[var(--space-xs)] block font-[family-name:var(--font-display)] text-[length:var(--text-lg)]"
              >
                {item.title}
              </CTALink>
              <p className="mt-[var(--space-xs)] max-w-[var(--measure)] text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[1.7]">
                {item.summary}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Podcast */}
      <Section padding="py-[var(--space-xl)] pb-[var(--space-3xl)]">
        <SectionTitle formal="Podcast" casual="想聽我們兩個聊真心話，來這裡" />
        <div className="mt-[var(--space-lg)] max-w-[var(--measure)]">
          <p className="text-[length:var(--text-base)] text-[var(--color-ink-2)] leading-[1.7]">
            {podcast.description}
          </p>
          <p className="mt-[var(--space-md)]">
            <CTALink href={podcast.url} className="text-[length:var(--text-base)]">
              收聽 {podcast.name} →
            </CTALink>
          </p>
        </div>
      </Section>
    </div>
  );
}
