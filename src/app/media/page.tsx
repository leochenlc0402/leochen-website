import type { Metadata } from "next";
import Section from "@/components/Section";
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
      <section className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-clay mb-4">
            Media
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            作品與報導
          </h1>
        </div>
      </section>

      {/* 影音作品 */}
      <Section
        formal="影音作品"
        casual="銀獎那支排第一，不是我自誇"
        eyebrow="職場性騷擾"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoWorks.map((video) => {
            const embedId = getYoutubeEmbedId(video.youtubeUrl);
            return (
              <div key={video.youtubeUrl} className="border border-sand">
                <div className="aspect-video bg-coffee/5">
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
                <div className="p-5">
                  {video.award && (
                    <p className="text-xs font-medium text-accent mb-2">
                      ☆ {video.award} ☆
                    </p>
                  )}
                  <h3 className="font-heading text-base font-semibold mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-coffee/70 dark:text-parchment/70 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 媒體報導 */}
      <Section
        formal="媒體報導"
        casual="按時間排，新的在前面"
        eyebrow="Press"
        tone="dark"
      >
        <div className="space-y-6">
          {pressItems.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-b border-parchment/10 pb-6 group"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <span className="text-sm font-medium text-sand">
                  {item.outlet}
                </span>
                <span className="text-xs text-parchment/40">{item.date}</span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-sand transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-parchment/70 leading-relaxed">
                {item.summary}
              </p>
            </a>
          ))}
        </div>
      </Section>

      {/* Podcast */}
      <Section
        formal="Podcast"
        casual="想聽我們兩個聊真心話，來這裡"
        eyebrow="心靈處方籤"
      >
        <div className="border border-sand p-6 sm:p-8 max-w-2xl">
          <h3 className="font-heading text-xl font-semibold mb-3">
            {podcast.name}
          </h3>
          <p className="text-sm text-coffee/70 dark:text-parchment/70 leading-relaxed mb-6">
            {podcast.description}
          </p>
          <a
            href={podcast.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-accent hover:bg-accent-hover text-parchment text-sm font-medium tracking-wide transition-colors"
          >
            收聽 Podcast
          </a>
        </div>
      </Section>
    </div>
  );
}
