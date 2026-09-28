// GROQ 查詢，一個 singleton 一條。所有查詢都用 `*[_type == "x"][0]`，
// 因為每種文件永遠只有一份（singleton），不需要用 _id 過濾。

export const SITE_PROFILE_QUERY = /* groq */ `*[_type == "siteProfile"][0]{
  nameZh, nameEn, displayName, title, email,
  heroImage{asset->{_id, url}, hotspot},
  aboutImage{asset->{_id, url}, hotspot}
}`;

export const HOMEPAGE_QUERY = /* groq */ `*[_type == "homepage"][0]{
  heroFormal, heroCasual, heroSubhead,
  stats[]{value, suffix, label},
  stripImages[]{
    image{asset->{_id, url}, hotspot},
    fallbackXPercent
  },
  testimonials,
  identityRows[]{
    role, roleNote, body, keywords, reverse,
    image{asset->{_id, url}, hotspot}
  },
  credo{note, bigLine1, bigLine2Em, small}
}`;

export const ABOUT_QUERY = /* groq */ `*[_type == "about"][0]{
  positioning{oneLiner, uspTitle, uspBody},
  highlights[]{value, unit, label},
  aboutIntro{kicker, greeting, storyLabels, paragraphs, beliefPrefix, beliefLine, closing, hoursNote},
  workExperience[]{org, role},
  education[]{school, degree},
  publicService,
  privateService,
  qualifications,
  hostingPublicSector,
  hostingEntertainment,
  publishedBook{title, authors, isbn},
  policyConsulting,
  papers
}`;

export const TOPICS_QUERY = /* groq */ `*[_type == "topics"][0]{
  topics[]{
    no, title, fit, homeSummary, subtopics, legalHours,
    homeCoverImages[]{asset->{_id, url}, hotspot},
    coverPairs[]{
      cover{asset->{_id, url}, hotspot},
      inner{asset->{_id, url}, hotspot}
    }
  }
}`;

export const SPEAKING_QUERY = /* groq */ `*[_type == "speaking"][0]{
  email, inquiryIntro, inquiryNote, inquiryFields,
  emailChannelNote, replyNote, feeIntro,
  publicSectorFees, corporateFeeNote, transportFees,
  formats[]{title, homeLine, homeDuration, fields[]{label, value}}
}`;

export const MEDIA_QUERY = /* groq */ `*[_type == "media"][0]{
  videoWorks[]{category, title, description, youtubeUrl, award},
  pressItems[]{outlet, title, date, summary, url},
  podcast{name, description, url}
}`;

export const CLIENTS_QUERY = /* groq */ `*[_type == "clients"][0]{
  corporateClients, governmentClients, schoolClients, ngoClients,
  clientsSummaryLine,
  cityLogos[]{name, image{asset->{_id, url}}},
  referralCount{number, suffix},
  referralLeadLines,
  referralNote
}`;
