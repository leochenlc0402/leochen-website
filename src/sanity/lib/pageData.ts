// 各頁面的「Sanity 讀回來的值 + src/data 寫死值」合併結果，統一在這裡做，
// 頁面元件（page.tsx）只需要呼叫這裡的函式拿資料，JSX 完全不用改。
// 任何一步讀取失敗（sanityFetch 內部已 try/catch 回傳 null）都會整段退回 src/data，網站不會壞掉。

import { sanityFetch } from "./client";
import { resolveImage, type SanityImageWithHotspot } from "./image";
import { mergeWithFallback } from "./fallback";
import {
  SITE_PROFILE_QUERY,
  HOMEPAGE_QUERY,
  ABOUT_QUERY,
  TOPICS_QUERY,
  SPEAKING_QUERY,
  MEDIA_QUERY,
  CLIENTS_QUERY,
} from "./queries";

import { profile as profileFallback } from "@/data/profile";
import {
  heroFormal as heroFormalFallback,
  heroCasual as heroCasualFallback,
  heroSubhead as heroSubheadFallback,
} from "@/data/homepage";
import { stats as statsFallback } from "@/data/stats";
import { testimonials as testimonialsFallback } from "@/data/testimonials";
import { identityRows as identityRowsFallback, credo as credoFallback } from "@/data/identity";
import { topics as topicsFallback } from "@/data/topics";
import { formats as formatsFallback } from "@/data/speaking";
import {
  clientsSummaryLine as clientsSummaryLineFallback,
  cityLogos as cityLogosFallback,
  referralCount as referralCountFallback,
  referralLeadLines as referralLeadLinesFallback,
  referralNote as referralNoteFallback,
  clientColumns as clientColumnsFallback,
  corporateClients as corporateClientsFallback,
  governmentClients as governmentClientsFallback,
  schoolClients as schoolClientsFallback,
  ngoClients as ngoClientsFallback,
} from "@/data/clients";
import {
  aboutIntro as aboutIntroFallback,
  positioning as positioningFallback,
  highlights as highlightsFallback,
} from "@/data/about";
import {
  workExperience as workExperienceFallback,
  education as educationFallback,
  publicService as publicServiceFallback,
  privateService as privateServiceFallback,
  qualifications as qualificationsFallback,
  hostingPublicSector as hostingPublicSectorFallback,
  hostingEntertainment as hostingEntertainmentFallback,
  publishedBook as publishedBookFallback,
  policyConsulting as policyConsultingFallback,
  papers as papersFallback,
} from "@/data/experience";
import {
  inquiryIntro as inquiryIntroFallback,
  inquiryNote as inquiryNoteFallback,
  inquiryFields as inquiryFieldsFallback,
  emailChannelNote as emailChannelNoteFallback,
  replyNote as replyNoteFallback,
  feeIntro as feeIntroFallback,
  publicSectorFees as publicSectorFeesFallback,
  corporateFeeNote as corporateFeeNoteFallback,
  transportFees as transportFeesFallback,
} from "@/data/speaking";
import {
  videoWorks as videoWorksFallback,
  pressItems as pressItemsFallback,
  podcast as podcastFallback,
  getYoutubeEmbedId,
} from "@/data/media";

// ---------- 基本資料（siteProfile） ----------

type SiteProfileDoc = {
  nameZh?: string;
  nameEn?: string;
  displayName?: string;
  title?: string;
  email?: string;
  heroImage?: SanityImageWithHotspot;
  aboutImage?: SanityImageWithHotspot;
};

export async function getSiteProfile() {
  const doc = await sanityFetch<SiteProfileDoc>(SITE_PROFILE_QUERY);
  const merged = mergeWithFallback(
    doc
      ? {
          nameZh: doc.nameZh,
          nameEn: doc.nameEn,
          displayName: doc.displayName,
          title: doc.title,
          email: doc.email,
        }
      : null,
    {
      nameZh: profileFallback.nameZh as string,
      nameEn: profileFallback.nameEn as string,
      displayName: profileFallback.displayName as string,
      title: profileFallback.title as string,
      email: profileFallback.email as string,
    }
  );
  const heroImage = resolveImage(doc?.heroImage, profileFallback.heroImage, "50% 20%");
  const aboutImage = resolveImage(doc?.aboutImage, profileFallback.aboutImage, "50% 50%");
  return { ...merged, heroImage, aboutImage };
}

// ---------- 首頁（homepage） ----------

type HomepageDoc = {
  heroFormal?: string;
  heroCasual?: string;
  heroSubhead?: string;
  stats?: { value: string; suffix?: string; label: string }[];
  stripImages?: { image?: SanityImageWithHotspot; fallbackXPercent?: number }[];
  testimonials?: string[];
  identityRows?: {
    role: string;
    roleNote: string;
    body: string;
    keywords: string;
    reverse?: boolean;
    image?: SanityImageWithHotspot;
  }[];
  credo?: { note: string; bigLine1: string; bigLine2Em: string; small: string };
};

// 授課現場照片條的寫死備用值（原本在 page.tsx，逐張看圖量出來的 x 位置）。
const stripImagesFallback: { src: string; x: number }[] = [
  { src: "/images/audience.jpg", x: 93 },
  { src: "/images/sign.jpg", x: 88 },
  { src: "/images/pink-screen.jpg", x: 78 },
  { src: "/images/diverse.jpg", x: 38 },
  { src: "/images/rainbow-mic.jpg", x: 75 },
  { src: "/images/overalls.jpg", x: 41 },
  { src: "/images/chair.jpg", x: 50 },
  { src: "/images/pink-mic.jpg", x: 76 },
];

export async function getHomepageData() {
  const doc = await sanityFetch<HomepageDoc>(HOMEPAGE_QUERY);

  const text = mergeWithFallback(
    doc
      ? { heroFormal: doc.heroFormal, heroCasual: doc.heroCasual, heroSubhead: doc.heroSubhead }
      : null,
    {
      heroFormal: heroFormalFallback,
      heroCasual: heroCasualFallback,
      heroSubhead: heroSubheadFallback,
    }
  );

  const stats =
    doc?.stats && doc.stats.length > 0 ? doc.stats : statsFallback;

  const stripImages =
    doc?.stripImages && doc.stripImages.length > 0
      ? doc.stripImages.map((item, i) => {
          const fallback = stripImagesFallback[i] ?? stripImagesFallback[0];
          const resolved = resolveImage(
            item.image,
            fallback.src,
            `${item.fallbackXPercent ?? fallback.x}% 50%`
          );
          return resolved;
        })
      : stripImagesFallback.map((s) => ({ src: s.src, objectPosition: `${s.x}% 50%` }));

  const testimonials =
    doc?.testimonials && doc.testimonials.length > 0
      ? doc.testimonials
      : testimonialsFallback;

  const identityRows =
    doc?.identityRows && doc.identityRows.length > 0
      ? doc.identityRows.map((row, i) => {
          const fallback = identityRowsFallback[i] ?? identityRowsFallback[0];
          return {
            role: row.role,
            roleNote: row.roleNote,
            body: row.body,
            keywords: row.keywords,
            reverse: row.reverse ?? fallback.reverse,
            image: resolveImage(row.image, fallback.image),
          };
        })
      : identityRowsFallback.map((row) => ({
          ...row,
          image: resolveImage(undefined, row.image),
        }));

  const credo = mergeWithFallback(doc?.credo ?? null, credoFallback);

  return { ...text, stats, stripImages, testimonials, identityRows, credo };
}

// ---------- 講題（topics） ----------

type TopicsDoc = {
  topics?: {
    no: string;
    title: string;
    fit: string;
    homeSummary: string;
    subtopics: string[];
    legalHours: string;
    homeCoverImages?: SanityImageWithHotspot[];
    coverPairs?: { cover?: SanityImageWithHotspot; inner?: SanityImageWithHotspot }[];
  }[];
};

export async function getTopicsData() {
  const doc = await sanityFetch<TopicsDoc>(TOPICS_QUERY);

  if (!doc?.topics || doc.topics.length === 0) {
    return topicsFallback.map((topic) => ({
      no: topic.no,
      title: topic.title,
      fit: topic.fit,
      homeSummary: topic.homeSummary,
      subtopics: topic.subtopics,
      legalHours: topic.legalHours,
      homeCovers: topic.homeCovers.map((src) => resolveImage(undefined, src)),
      coverPairs: topic.coverSlugs.map((slug) => ({
        cover: resolveImage(undefined, `/images/covers/${slug}-cover.jpg`),
        inner: resolveImage(undefined, `/images/covers/${slug}-inner.jpg`),
      })),
    }));
  }

  return doc.topics.map((topic, i) => {
    const fallback = topicsFallback[i] ?? topicsFallback[0];
    const homeCovers = (topic.homeCoverImages && topic.homeCoverImages.length > 0
      ? topic.homeCoverImages
      : [undefined, undefined]
    ).map((img, j) => resolveImage(img, fallback.homeCovers[j] ?? fallback.homeCovers[0]));
    const coverPairs = (topic.coverPairs && topic.coverPairs.length > 0
      ? topic.coverPairs
      : fallback.coverSlugs.map((slug) => ({
          cover: undefined,
          inner: undefined,
          __fallbackSlug: slug,
        }))
    ).map((pair, j) => {
      const fallbackSlug = fallback.coverSlugs[j] ?? fallback.coverSlugs[0];
      return {
        cover: resolveImage(pair.cover, `/images/covers/${fallbackSlug}-cover.jpg`),
        inner: resolveImage(pair.inner, `/images/covers/${fallbackSlug}-inner.jpg`),
      };
    });
    return {
      no: topic.no,
      title: topic.title,
      fit: topic.fit,
      homeSummary: topic.homeSummary,
      subtopics: topic.subtopics?.length ? topic.subtopics : fallback.subtopics,
      legalHours: topic.legalHours || fallback.legalHours,
      homeCovers,
      coverPairs,
    };
  });
}

// ---------- 演講邀約（speaking） ----------

type SpeakingDoc = {
  email?: string;
  inquiryIntro?: string;
  inquiryNote?: string;
  inquiryFields?: string[];
  emailChannelNote?: string;
  replyNote?: string;
  feeIntro?: string;
  publicSectorFees?: string[];
  corporateFeeNote?: string;
  transportFees?: string[];
  formats?: {
    title: string;
    homeLine: string;
    homeDuration: string;
    fields: { label: string; value: string }[];
  }[];
};

export async function getSpeakingData() {
  const doc = await sanityFetch<SpeakingDoc>(SPEAKING_QUERY);
  const merged = mergeWithFallback(doc ?? null, {
    email: profileFallback.email as string,
    inquiryIntro: inquiryIntroFallback,
    inquiryNote: inquiryNoteFallback,
    inquiryFields: inquiryFieldsFallback,
    emailChannelNote: emailChannelNoteFallback,
    replyNote: replyNoteFallback,
    feeIntro: feeIntroFallback,
    publicSectorFees: publicSectorFeesFallback,
    corporateFeeNote: corporateFeeNoteFallback,
    transportFees: transportFeesFallback,
    formats: formatsFallback,
  });
  return merged;
}

// formats 單獨給首頁用（首頁只需要 title/homeLine/homeDuration）
export async function getFormatsData() {
  const doc = await sanityFetch<{ formats?: SpeakingDoc["formats"] }>(
    /* groq */ `*[_type == "speaking"][0]{formats[]{title, homeLine, homeDuration, fields[]{label, value}}}`
  );
  return doc?.formats && doc.formats.length > 0 ? doc.formats : formatsFallback;
}

// ---------- 合作單位（clients） ----------

type ClientsDoc = {
  corporateClients?: string[];
  governmentClients?: string[];
  schoolClients?: string[];
  ngoClients?: string[];
  clientsSummaryLine?: string;
  cityLogos?: { name: string; image?: SanityImageWithHotspot }[];
  referralCount?: { number: string; suffix?: string };
  referralLeadLines?: string[];
  referralNote?: string;
};

export async function getClientsData() {
  const doc = await sanityFetch<ClientsDoc>(CLIENTS_QUERY);

  const corporateClients =
    doc?.corporateClients?.length ? doc.corporateClients : corporateClientsFallback;
  const governmentClients =
    doc?.governmentClients?.length ? doc.governmentClients : governmentClientsFallback;
  const schoolClients = doc?.schoolClients?.length ? doc.schoolClients : schoolClientsFallback;
  const ngoClients = doc?.ngoClients?.length ? doc.ngoClients : ngoClientsFallback;

  const clientColumns =
    doc?.corporateClients || doc?.governmentClients || doc?.schoolClients || doc?.ngoClients
      ? [
          { label: "企業", items: corporateClients },
          { label: "政府", items: governmentClients },
          { label: "學校", items: schoolClients },
          { label: "NGO", items: ngoClients },
        ]
      : clientColumnsFallback;

  const clientsSummaryLine = doc?.clientsSummaryLine || clientsSummaryLineFallback;

  const cityLogos =
    doc?.cityLogos && doc.cityLogos.length > 0
      ? doc.cityLogos.map((logo, i) => {
          const fallback = cityLogosFallback[i] ?? cityLogosFallback[0];
          return {
            name: logo.name || fallback.name,
            ...resolveImage(logo.image, `/images/logo-${fallback.slug}.png`),
          };
        })
      : cityLogosFallback.map((logo) => ({
          name: logo.name,
          ...resolveImage(undefined, `/images/logo-${logo.slug}.png`),
        }));

  const referralCount = mergeWithFallback(doc?.referralCount ?? null, referralCountFallback);
  const referralLeadLines =
    doc?.referralLeadLines?.length ? doc.referralLeadLines : referralLeadLinesFallback;
  const referralNote = doc?.referralNote || referralNoteFallback;

  return {
    corporateClients,
    governmentClients,
    schoolClients,
    ngoClients,
    clientColumns,
    clientsSummaryLine,
    cityLogos,
    referralCount,
    referralLeadLines,
    referralNote,
  };
}

// ---------- 關於我（about） ----------

type AboutDoc = {
  positioning?: Partial<typeof positioningFallback>;
  highlights?: typeof highlightsFallback;
  aboutIntro?: typeof aboutIntroFallback;
  workExperience?: { org: string; role: string }[];
  education?: { school: string; degree: string }[];
  publicService?: string[];
  privateService?: string[];
  qualifications?: string[];
  hostingPublicSector?: string[];
  hostingEntertainment?: string[];
  publishedBook?: { title: string; authors: string; isbn: string };
  policyConsulting?: string[];
  papers?: string[];
};

export async function getAboutData() {
  const doc = await sanityFetch<AboutDoc>(ABOUT_QUERY);

  const aboutIntro = mergeWithFallback(doc?.aboutIntro ?? null, aboutIntroFallback);
  const publishedBook = mergeWithFallback(doc?.publishedBook ?? null, publishedBookFallback);
  const positioning = mergeWithFallback(doc?.positioning ?? null, positioningFallback);

  return mergeWithFallback(
    doc
      ? {
          positioning,
          highlights: doc.highlights,
          aboutIntro,
          workExperience: doc.workExperience,
          education: doc.education,
          publicService: doc.publicService,
          privateService: doc.privateService,
          qualifications: doc.qualifications,
          hostingPublicSector: doc.hostingPublicSector,
          hostingEntertainment: doc.hostingEntertainment,
          publishedBook,
          policyConsulting: doc.policyConsulting,
          papers: doc.papers,
        }
      : null,
    {
      positioning: positioningFallback,
      highlights: highlightsFallback,
      aboutIntro: aboutIntroFallback,
      workExperience: workExperienceFallback as unknown as { org: string; role: string }[],
      education: educationFallback as unknown as { school: string; degree: string }[],
      publicService: publicServiceFallback as unknown as string[],
      privateService: privateServiceFallback as unknown as string[],
      qualifications: qualificationsFallback as unknown as string[],
      hostingPublicSector: hostingPublicSectorFallback as unknown as string[],
      hostingEntertainment: hostingEntertainmentFallback as unknown as string[],
      publishedBook: publishedBookFallback,
      policyConsulting: policyConsultingFallback as unknown as string[],
      papers: papersFallback as unknown as string[],
    }
  );
}

// ---------- 作品與報導（media） ----------

type MediaDoc = {
  videoWorks?: {
    category: string;
    title: string;
    description: string;
    youtubeUrl: string;
    award?: string;
  }[];
  pressItems?: { outlet: string; title: string; date: string; summary: string; url: string }[];
  podcast?: { name: string; description: string; url: string };
};

export async function getMediaData() {
  const doc = await sanityFetch<MediaDoc>(MEDIA_QUERY);

  const videoWorks = doc?.videoWorks?.length ? doc.videoWorks : videoWorksFallback;
  const pressItems = doc?.pressItems?.length ? doc.pressItems : pressItemsFallback;
  const podcast = mergeWithFallback(doc?.podcast ?? null, podcastFallback);

  return {
    videoWorks: videoWorks.map((v) => ({ ...v, embedId: getYoutubeEmbedId(v.youtubeUrl) })),
    pressItems,
    podcast,
  };
}
