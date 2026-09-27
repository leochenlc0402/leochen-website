import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import CTALink from "@/components/CTALink";
import { profile } from "@/data/profile";
import { stats } from "@/data/stats";
import { topics } from "@/data/topics";
import { formats } from "@/data/speaking";
import { testimonials } from "@/data/testimonials";
import { identityRows, credo } from "@/data/identity";
import {
  clientsSummaryLine,
  cityLogos,
  referralChains,
  referralCount,
  referralLeadLines,
  referralNote,
} from "@/data/clients";
import { heroFormal, heroCasual, heroSubhead } from "@/data/homepage";

export const metadata: Metadata = {
  title: `${profile.displayName} — ${profile.title}`,
  description:
    "陳荐宏 Leo Chen：性平講師 × 社群媒體創作者。政府性平委員、夫夫之道共同創辦人、公開同志伴侶——三個身份一起作證的性平講師。",
  openGraph: {
    title: `${profile.displayName} — ${profile.title}`,
    description:
      "把法定必修，講成大家想聽的那一堂。80 多場演講經驗，性平講師陳荐宏 Leo Chen 個人網站首頁。",
    type: "profile",
  },
};

// 授課現場照片條：每張都裁成 4:5，x 位置對準拿麥克風的講者（里歐），讓他落在畫面中央。
// 位置是逐張看圖量出來的，換照片時要重新量。
const stripImages = [
  { src: "/images/audience.jpg", x: 93 },
  { src: "/images/sign.jpg", x: 88 },
  { src: "/images/pink-screen.jpg", x: 78 },
  { src: "/images/diverse.jpg", x: 38 },
  { src: "/images/rainbow-mic.jpg", x: 75 },
  { src: "/images/overalls.jpg", x: 41 },
  { src: "/images/chair.jpg", x: 50 },
  { src: "/images/pink-mic.jpg", x: 76 },
];

// 兩排跑馬燈的內容，取自 src/data/testimonials.ts（未新增任何一句），
// 分組與定稿靜態稿 final-home.html 一致；每排把內容自我複製一次，
// 讓 CSS `translateX(-50%)` 可以無縫循環。
const rowA = [testimonials[0], testimonials[2], testimonials[5], testimonials[4]];
const rowB = [testimonials[1], testimonials[3], testimonials[2]];

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

export default function Home() {
  const [heroCasualBefore, heroCasualAfter] = heroCasual.split("好玩");

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
                src={profile.heroImage}
                alt={`${profile.displayName} 形象照`}
                fill
                sizes="(max-width: 760px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: "50% 20%" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 數據＋照片條 */}
      <Section className="nums">
        {stats.map((s) => (
          <div className="num" key={s.label}>
            <b>
              {s.value}
              {s.suffix && <small>{s.suffix}</small>}
            </b>
            <span>{s.label}</span>
          </div>
        ))}
      </Section>
      <div className="strip">
        {stripImages.map(({ src, x }) => (
          <div className="strip-img" key={src}>
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 760px) 176px, 288px"
              style={{ objectFit: "cover", objectPosition: `${x}% 50%` }}
            />
          </div>
        ))}
      </div>

      {/* 3. 台下怎麼說 */}
      <Section className="voices">
        <div className="head">
          <Heading formal="台下怎麼說" casual="不是我說的，是台下寫的" />
        </div>
        <div className="rows">
          <MarqueeRow items={rowA} />
          <MarqueeRow items={rowB} variant="b" />
        </div>
      </Section>

      {/* 4. 為什麼是他 */}
      <Section className="who">
        <div className="head">
          <Heading formal="為什麼是他" casual="三個身份，一起作證" />
        </div>
        {identityRows.map((row) => (
          <div className={row.reverse ? "who-row rev" : "who-row"} key={row.role}>
            <div className="ph">
              <Image
                src={row.image}
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
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
          <Heading formal="四個講題" casual="挑你要的，深淺我來調" />
        </div>
        {topics.map((topic) => (
          <div className="topic" key={topic.no}>
            <div>
              <h3>{topic.title}</h3>
              <p className="fit">{topic.fit}</p>
              <p className="s">{topic.homeSummary}</p>
            </div>
            <div className="covers">
              {topic.homeCovers.map((src) => (
                <div className="cover-img" key={src}>
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 45vw, 25vw"
                    style={{ objectFit: "cover" }}
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
          <Heading formal="可以怎麼請他" casual="從一場演講到整天工作坊" />
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
            <p className="lead">
              {referralLeadLines[0]}
              <br />
              {referralLeadLines[1]}
            </p>
          </div>
          <div>
            {referralChains.map((chain, i) => (
              <p className="chain" key={i}>
                {chain.map((node, j) => (
                  <Fragment key={node}>
                    <em>{node}</em>
                    {j < chain.length - 1 && <i aria-hidden>→</i>}
                  </Fragment>
                ))}
              </p>
            ))}
            <p className="chain-note">{referralNote}</p>
          </div>
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
