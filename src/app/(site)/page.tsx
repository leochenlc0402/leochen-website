import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import CTALink from "@/components/CTALink";
import StatCounter from "@/components/StatCounter";
import { profile as profileFallback } from "@/data/profile";
import {
  getSiteProfile,
  getHomepageData,
  getTopicsData,
  getFormatsData,
  getClientsData,
} from "@/sanity/lib/pageData";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: `${profileFallback.displayName} — ${profileFallback.title}`,
  description:
    "陳荐宏 Leo Chen：性平講師 × 社群媒體創作者。政府性平委員、夫夫之道共同創辦人、公開同志伴侶——三個身份一起作證的性平講師。",
  openGraph: {
    title: `${profileFallback.displayName} — ${profileFallback.title}`,
    description:
      "把法定必修，講成大家想聽的那一堂。80 多場演講經驗，性平講師陳荐宏 Leo Chen 個人網站首頁。",
    type: "profile",
  },
};

function MarqueeRow({ items, variant }: { items: string[]; variant?: "b" }) {
  const doubled = [...items, ...items];
  return (
    <div className={variant ? `row ${variant}` : "row"}>
      {doubled.map((quote, i) => (
        <Fragment key={i}>
          <span>「{quote}」</span>
          {i < doubled.length - 1 && <i aria-hidden>✦</i>}
        </Fragment>
      ))}
    </div>
  );
}

export default async function Home() {
  const [profile, homepage, topics, formats, clients] = await Promise.all([
    getSiteProfile(),
    getHomepageData(),
    getTopicsData(),
    getFormatsData(),
    getClientsData(),
  ]);

  const { heroFormal, heroCasual, heroSubhead, stats, stripImages, testimonials, identityRows, credo } =
    homepage;
  const { clientsSummaryLine, cityLogos, referralCount, referralLeadLines, referralNote } = clients;

  const [heroCasualBefore, heroCasualAfter] = heroCasual.split("好玩");

  // 兩排跑馬燈的內容，取自首頁 testimonials（未新增任何一句），分組與定稿靜態稿一致；
  // 每排把內容自我複製一次，讓 CSS `translateX(-50%)` 可以無縫循環。
  const rowA = [testimonials[0], testimonials[2], testimonials[5], testimonials[4]];
  const rowB = [testimonials[1], testimonials[3], testimonials[2]];

  return (
    <div>
      {/* 1. 首屏（navy，與共用 Header 同色無縫接軌） */}
      <section className="navy">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <p className="byline">{profile.title}</p>
              <h1 className="hero-h1">
                <span className="line">{heroFormal}</span>
                <span className="line">
                  {heroCasualBefore}
                  <span className="play">好玩</span>
                  {heroCasualAfter}
                </span>
              </h1>
              <p className="sub">{heroSubhead}</p>
              <div className="actions">
                <CTALink href="/speaking" className="btn">
                  邀請演講 →
                </CTALink>
                <CTALink href="#topics-home" className="link">
                  看四個講題
                </CTALink>
              </div>
            </div>
            <div className="portrait">
              <Image
                src={profile.heroImage.src}
                alt={`${profile.displayName} 形象照`}
                fill
                sizes="(max-width: 760px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: profile.heroImage.objectPosition }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 數據＋照片條（數字捲入視窗時跑動畫，見 StatCounter） */}
      <Section className="nums">
        {stats.map((s) => (
          <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </Section>
      <div className="strip">
        {stripImages.map((img, i) => (
          <div className="strip-img" key={i}>
            <Image
              src={img.src}
              alt=""
              fill
              sizes="(max-width: 760px) 33vw, (max-width: 1024px) 25vw, 20vw"
              style={{ objectFit: "cover", objectPosition: img.objectPosition }}
            />
          </div>
        ))}
      </div>

      {/* 3. 台下怎麼說 */}
      <Section className="voices">
        <div className="head">
          <Heading formal="台下怎麼說" casual="那些講座後綻放的火花" />
        </div>
        <div className="rows">
          <MarqueeRow items={rowA} />
          <MarqueeRow items={rowB} variant="b" />
        </div>
      </Section>

      {/* 4. 為什麼是他 */}
      <Section className="who">
        <div className="head">
          <Heading formal="為什麼選擇我" casual="三個身分，不同面向的我" />
        </div>
        {identityRows.map((row) => (
          <div className={row.reverse ? "who-row rev" : "who-row"} key={row.role}>
            <div className="ph">
              <Image
                src={row.image.src}
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 45vw"
                style={{ objectFit: "cover", objectPosition: row.image.objectPosition }}
              />
            </div>
            <div>
              <p className="role">
                {row.role}
                <small>{row.roleNote}</small>
              </p>
              <p className="t">{row.body}</p>
              <p className="kw">{row.keywords}</p>
            </div>
          </div>
        ))}
      </Section>

      {/* 5. 信念 */}
      <section className="navy credo">
        <div className="wrap">
          <p className="note">{credo.note}</p>
          <p className="big">
            {credo.bigLine1}
            <br />
            <em>{credo.bigLine2Em}</em>
          </p>
          <p className="small">{credo.small}</p>
        </div>
      </section>

      {/* 6. 四個講題 */}
      <Section id="topics-home" className="topics">
        <div className="head">
          <Heading formal="四個講題" casual="挑選你的需求，深淺彈性配合" />
        </div>
        {topics.map((topic) => (
          <div className="topic" key={topic.no}>
            <div>
              <h3>{topic.title}</h3>
              <p className="fit">{topic.fit}</p>
              <p className="s">{topic.homeSummary}</p>
            </div>
            <div className="covers">
              {topic.homeCovers.map((cover, i) => (
                <div className="cover-img" key={i}>
                  <Image
                    src={cover.src}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 45vw, 25vw"
                    style={{ objectFit: "cover", objectPosition: cover.objectPosition }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* 7. 可以怎麼請他 */}
      <Section className="formats">
        <div className="head">
          <Heading formal="合作方式" casual="從一場演講到整天工作坊" />
        </div>
        {formats.map((f) => (
          <div className="fmt" key={f.title}>
            <h4>{f.title}</h4>
            <p>{f.homeLine}</p>
            <span className="dur">{f.homeDuration}</span>
          </div>
        ))}
      </Section>

      {/* 8. 回頭再邀＋合作單位 */}
      <Section className="again">
        <div className="again-grid">
          <div>
            <p className="big">
              {referralCount.number}
              <small>{referralCount.suffix}</small>
            </p>
            <p className="lead">{referralLeadLines[0]}</p>
          </div>
          <div>
            <div className="referral-photo">
              <Image
                src="/images/audience.jpg"
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 55vw"
                style={{ objectFit: "cover", objectPosition: "50% 25%" }}
              />
            </div>
            <p className="chain-note">{referralNote}</p>
          </div>
        </div>
        <div className="logos">
          {cityLogos.map((logo, i) => (
            <div className="logo-img" key={i}>
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="120px"
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
        <p className="all">
          {clientsSummaryLine}{" "}
          <CTALink href="/speaking#clients" className="link-ink">
            看全部合作單位 →
          </CTALink>
        </p>
      </Section>
    </div>
  );
}
