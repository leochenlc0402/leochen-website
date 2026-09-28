#!/usr/bin/env node
/**
 * 把 src/data/*.ts 目前的文字內容與 public/images 的圖片，一次灌進 Sanity 並發布。
 * 文字逐字照抄，圖片全部從 public/images 上傳成 Sanity asset。
 *
 * 用法：
 *   SANITY_API_WRITE_TOKEN=<有寫入權限的 token> node scripts/seed-sanity.mjs
 *
 * 需要一個對 projectId 7v4x71gf / dataset production 有 Editor 以上權限的 API token
 * （sanity.io/manage → 專案 → API → Tokens 建立）。2026-09-28 這次執行時，
 * 目前登入的帳號在 content API 層級回報「project user not found」（專案管理層級看得到、
 * 但內容層權限沒同步），所以這支腳本當時無法直接跑成功，需要創晃自己在 manage 後台
 * 確認帳號的 Project Member 權限、或建一個新 token 後再執行。
 *
 * 可重複執行：每份文件用固定 _id（跟 schema singleton 對應），
 * 用 createOrReplace，重跑不會產生重複文件，圖片會重新上傳（正常，不影響內容正確性）。
 */
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public/images");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "7v4x71gf";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error(
    "缺少 SANITY_API_WRITE_TOKEN。請到 https://www.sanity.io/manage/project/" +
      projectId +
      "/api 建立一個有寫入權限的 token，再用 SANITY_API_WRITE_TOKEN=xxx node scripts/seed-sanity.mjs 執行。"
  );
  process.exit(1);
}


// 陣列裡的物件一律補上 _key，否則 Studio 會顯示「Missing keys」而無法編輯。
import crypto from "node:crypto";
function addKeys(value) {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const withKeys = addKeys(item);
        return withKeys._key ? withKeys : { _key: crypto.randomBytes(6).toString("hex"), ...withKeys };
      }
      return addKeys(item);
    });
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, addKeys(v)]));
  }
  return value;
}

const client = createClient({ projectId, dataset, token, apiVersion: "2026-09-28", useCdn: false });

// ---------- 圖片上傳（同一個路徑只上傳一次，用快取） ----------
const assetCache = new Map();
let uploadQueue = Promise.resolve();
function uploadImage(relativePath) {
  const run = uploadQueue.then(() => uploadImageNow(relativePath));
  uploadQueue = run.catch(() => {});
  return run;
}
async function uploadImageNow(relativePath) {
  if (!relativePath) return undefined;
  if (assetCache.has(relativePath)) return assetCache.get(relativePath);
  const filePath = path.join(IMAGES_DIR, relativePath.replace(/^\/images\//, ""));
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️ 找不到圖片，跳過：${filePath}`);
    return undefined;
  }
  process.stdout.write(`  上傳圖片 ${relativePath} ... `);
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  console.log("OK");
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  assetCache.set(relativePath, ref);
  return ref;
}

// 標記「這裡要放一張圖」的 placeholder，讓 docs 定義維持可讀，實際上傳在 resolveImages() 統一處理。
const IMG = (relPath) => ({ __img: relPath });

async function resolveImages(value) {
  if (Array.isArray(value)) {
    return Promise.all(value.map(resolveImages));
  }
  if (value && typeof value === "object") {
    if ("__img" in value) return uploadImage(value.__img);
    const entries = await Promise.all(
      Object.entries(value).map(async ([k, v]) => [k, await resolveImages(v)])
    );
    return Object.fromEntries(entries);
  }
  return value;
}

// ---------- 文件內容（逐字照 src/data/*.ts，圖片改用 IMG() 指到 public/images 對應檔案） ----------

const siteProfile = {
  _id: "siteProfile",
  _type: "siteProfile",
  nameZh: "陳荐宏",
  nameEn: "Leo Chen",
  displayName: "陳荐宏 Leo Chen",
  title: "性平講師 × 社群媒體創作者",
  email: "leochenlc0402@gmail.com",
  heroImage: IMG("/images/jacket-wall.jpg"),
  aboutImage: IMG("/images/plaid.jpg"),
};

const stripImagesSource = [
  { src: "/images/audience.jpg", x: 93 },
  { src: "/images/sign.jpg", x: 88 },
  { src: "/images/pink-screen.jpg", x: 78 },
  { src: "/images/diverse.jpg", x: 38 },
  { src: "/images/rainbow-mic.jpg", x: 75 },
  { src: "/images/overalls.jpg", x: 41 },
  { src: "/images/chair.jpg", x: 50 },
  { src: "/images/pink-mic.jpg", x: 76 },
];

const homepage = {
  _id: "homepage",
  _type: "homepage",
  heroFormal: "性別平等，可以很重要，",
  heroCasual: "也可以很好玩。",
  heroSubhead: "把法定必修，講成大家想聽的那一堂。",
  stats: [
    { value: "80+", label: "場演講" },
    { value: "175+", label: "小時演講時數" },
    { value: "4.8", suffix: "分", label: "正向回饋" },
    { value: "292K", label: "夫夫之道全平台粉絲" },
  ],
  stripImages: stripImagesSource.map((s) => ({
    image: IMG(s.src),
    fallbackXPercent: s.x,
  })),
  testimonials: [
    "整場沒睡點！",
    "舉例很貼切，覺得收穫很多。",
    "講話很幽默、有梗。",
    "性別議題可以很重要，也可以很好玩。",
    "老師上課很熱情 🔥",
    "里歐老師國台語雙聲道！",
  ],
  identityRows: [
    {
      role: "委員",
      roleNote: "讓性別平等在各縣市開花結果",
      body: "新竹市、雲林縣政府性別平等委員，宜蘭、新竹、雲林三縣市性別人才資料庫專家學者。在台灣彩虹平權大平台與議員、性別團體合作，促成各縣市議會超過 300 案相關質詢與提案。",
      keywords: "性別主流化 · CEDAW · 性別平等政策",
      image: IMG("/images/committee.jpg"),
    },
    {
      role: "創作者",
      roleNote: "讓人願意看下去是本業",
      body: "YouTube 頻道「夫夫之道 Fufuknows」共同創辦人，2016 年開始用影像和大眾溝通。自製短片獲 113 年度勞動人權短片徵選比賽銀獎，也主持過近 30 場記者會、見面會與遊行主舞台。",
      keywords: "短影音 · 社群企劃 · 議題倡議 · 主持",
      image: IMG("/images/fufu-stage.jpg"),
      reverse: true,
    },
    {
      role: "當事人",
      roleNote: "講的是自己的人生",
      body: "公開的同志伴侶，和阿凱一起寫下《不OK的我們也很好》，把長跑九年的關係練習攤開來講。講多元家庭與伴侶關係時，我不是在念教材。",
      keywords: "多元性別 · 伴侶關係 · 婚姻平權",
      image: IMG("/images/book.jpg"),
    },
  ],
  credo: {
    note: "里歐怎麼看性平教育",
    bigLine1: "法律是底線，專業是標準，",
    bigLine2Em: "友善是品質。",
    small: "教育的意義，是提供一個重新認識自己、理解他人，也重新看見這個社會的機會。",
  },
};

const about = {
  _id: "about",
  _type: "about",
  aboutIntro: {
    kicker: "關於里歐",
    greeting: "嗨，我是里歐。",
    paragraphs: [
      "HI，我是陳荐宏，大家都叫我里歐，是一名性別倡議工作者、影像創作者，同時也是 YouTube 頻道「夫夫之道 Fufuknows」的共同創辦人。",
      "2016 年開始，我透過影像與大眾溝通，從婚姻平權出發，持續關注職場性騷擾、性別平等教育、同志與多元性別，以及性別刻板印象等議題。十年來，我從內容創作走進公共倡議，嘗試讓性別議題不只停留在政策或口號，而是能被更多人看見、理解，並真正落實在生活中。",
      "2021 年，加入社團法人台灣彩虹平權大平台協會，參與地方性別平等與多元性別友善政策倡議，累積政策研究、議員溝通、倡議行動與公共議題推動的實務經驗，並與縣市議員、性別團體攜手，促成各縣市議會超過 300 案相關質詢與提案。我也曾擔任雲林縣、新竹市等地方政府性別平等委員，從不同角度參與性別平等政策的討論與實踐。",
    ],
    beliefPrefix: "無論是學校的性別平等教育，或是公務機關、企業職場的成人性別教育，我相信：",
    beliefLine: "法律是底線，專業是標準，友善是品質。",
    closing: "而教育的意義，是提供一個重新認識自己、理解他人，也重新看見這個社會的機會。",
    hoursNote: "目前累計 175 小時以上的演講時數。",
  },
  workExperience: [
    { org: "社團法人台灣彩虹平權大平台協會", role: "倡議專員" },
    { org: "夫夫之道 Fufuknows", role: "共同創辦人／YouTube 白銀級創作者" },
  ],
  education: [
    { school: "世新大學口語傳播暨社群媒體學系", degree: "碩士" },
    { school: "崑山科技大學公共關係暨廣告學系", degree: "學士" },
  ],
  publicService: [
    "新竹市政府性別平等委員 第 4 屆 委員（2026/01 - 迄今）",
    "雲林縣政府性別平等委員 第 11、12 屆 委員（2023/03 - 迄今）",
    "雲林縣政府文化觀光處性別平等諮詢小組 外聘委員（2025/03 - 迄今）",
    "臺北市性別友善旅宿標章 輔導專家學者（2023）",
    "雲林縣政府青年事務諮詢委員會 第 1 屆 委員（2021/10-2023/09）",
  ],
  privateService: ["社團法人台灣彩虹公民行動協會 理事（2023 - 2025）"],
  qualifications: [
    "宜蘭縣政府性別人才資料庫｜專家學者",
    "新竹縣政府性別人才資料庫｜專家學者",
    "雲林縣政府性別人才資料庫｜專家學者",
  ],
  hostingPublicSector: [
    "臺北市政府社會局《臺北市性別平等辦公室成立10週年系列活動》記者會",
    "臺北市政府觀傳局《Color Taipei》記者會",
    "臺北市政府商業處《彩虹婚禮嘉年華》記者會",
    "雲林縣政府社會處《幸福成家三部曲》記者會",
    "雲林縣政府社會處《友婦女・大寵愛》記者會",
    "高雄市政府觀光局《性別友善旅宿認證標章》記者會",
    "臺灣彩虹公民行動協會《第21屆臺灣同志遊行》公布記者會",
    "熱線 & 大平台《台灣同志職場友善指標》第一屆、第二屆發布記者會",
    "臺北市政府民政局《同婚五週年紀念市集》主舞台",
    "臺灣彩虹公民行動協會《第二十一屆臺灣同志遊行》舞台主持",
    "臺灣彩虹公民行動協會《第二十屆臺灣同志遊行》主舞台",
    "台南彩虹遊行《第九屆台南彩虹遊行》主舞台",
  ],
  hostingEntertainment: [
    "KKTV《看見愛》最終回放映見面會",
    "八大電視《秘密關係》台北場粉絲見面會",
    "LINE TV《獨佔接班人》最終回放映見面會",
    "泰國影集《Two Worlds》演員粉絲見面會",
    "八大電視《奇蹟 Kiseki》粉絲見面會",
    "有意思傳媒《關於未知的我們》首映記者會",
    "結果娛樂《我的牙想你》演員簽書見面會",
    "三立電視《免疫屏蔽》特映會",
    "三立電視《絕對佔領》特映會",
    "三立電視《保留席位》特映會",
    "三立電視《恆久定律》特映會",
    "TIQFF《台灣國際酷兒影展》開幕典禮",
    "高誠公關《為 i 篩檢》世紀平權婚禮",
    "GagaOOLala《幸福選擇題五部曲》特映會",
    "阮劇團《城市戀歌進行曲》映演",
    "MAJI集食行樂《彩虹證婚・婚禮體驗日》記者會",
  ],
  publishedBook: {
    title: "不OK的我們也很好：人氣YouTuber夫夫之道，長跑九年的關係練習",
    authors: "王盈堯（阿凱）、陳荐宏（里歐）",
    isbn: "9786267537428",
  },
  policyConsulting: [
    "臺北市政府殯葬管理處《性別平等的喪禮流程指引》（殯葬業者版）",
    "《平等告別・讓愛自由－性別平等的喪禮新實踐》（民眾版）",
    "雲林縣政府獲113年行政院性平考核「性別平等故事獎」肯定｜受邀擔任雲林縣政府「性別平等故事方案工作坊」講師/顧問，協助性平故事議題梳理、人物訪談、敘事轉譯及成果呈現。",
    "雲林縣政府獲111年行政院性平考核「性別平等故事獎」肯定｜發想並與雲林縣政府社會處承辦同仁協力執行「女力迓媽祖・鬥陣作藝閣」性別平等暨 CEDAW 宣導專案。",
  ],
  papers: [
    "林風吟、陳荐宏（2022）。同志平權與新聞媒體：我們該成為怎麼樣的閲聽眾。兒少新聞妙捕手。",
    "陳荐宏（2020）。臺灣電視新聞主播粉絲專頁溝通策略研究［未出版之碩士論文］。世新大學口語傳播暨社群媒體學系。",
    "陳荐宏（2015）。平面新聞中的階級意識建構之幻想主題與語藝視野以李蒨蓉阿帕契案為例[壁報發表]。第五屆新聞的政治、文化與科技學術研討會，新北市。",
    "Chen, C. H. (2016). Young generation's preliminary about PXmart's economic aesthetics series ad performance in 2015 [Conference presentation]. Eighth International Forum on Public Relations and Advertising(PRAD), Wellington, New Zealand.",
  ],
};

function coverPair(slug) {
  return {
    cover: IMG(`/images/covers/${slug}-cover.jpg`),
    inner: IMG(`/images/covers/${slug}-inner.jpg`),
  };
}

const topics = {
  _id: "topics",
  _type: "topics",
  topics: [
    {
      no: "①",
      title: "性別平等與 CEDAW",
      fit: "對應公務員年度性別主流化時數",
      homeSummary:
        "性別主流化、性別平等政策、CEDAW 與業務關聯及應用、直接歧視、間接歧視與交叉歧視、暫行特別措施、自製媒材、短影音工作坊",
      subtopics: [
        "性別平等教育",
        "性別主流化",
        "性別平等政策",
        "消除對婦女一切形式歧視公約（CEDAW）",
        "CEDAW 與業務關聯及應用",
        "直接歧視、間接歧視與交叉歧視",
        "CEDAW 暫行特別措施",
        "CEDAW 自製媒材",
        "CEDAW 短影音工作坊",
      ],
      legalHours: "性別主流化 2 小時",
      homeCoverImages: [IMG("/images/cover-cedaw.jpg"), IMG("/images/cover-policy.jpg")],
      coverPairs: [coverPair("cedaw-convention"), coverPair("cedaw-policy"), coverPair("cedaw-practice")],
    },
    {
      no: "②",
      title: "多元性別與性別議題",
      fit: "對應同志暨多元性別課程",
      homeSummary: "認識多元性別、性別、婚姻與多元家庭、同婚與婚姻平權、同志伴侶關係與生命故事",
      subtopics: ["認識多元性別", "性別、婚姻與多元家庭", "同婚與婚姻平權", "同志伴侶關係", "同志伴侶生命故事"],
      legalHours: "同志暨多元性別 1 小時",
      homeCoverImages: [IMG("/images/cover-samesex.jpg"), IMG("/images/cover-film.jpg")],
      coverPairs: [coverPair("samesex-marriage"), coverPair("film-screening")],
    },
    {
      no: "③",
      title: "性別與日常生活",
      fit: "職場、醫療、友善廁所，提供各種講題。",
      homeSummary: "性別友善廁所、性別友善職場、性別與政策推動、性別與媒體、性別與政治、性別與民俗及宗教",
      subtopics: ["性別友善廁所", "性別友善職場", "性別與政策推動", "性別與媒體", "性別與政治", "性別與民俗／宗教"],
      legalHours: "性別主流化",
      homeCoverImages: [IMG("/images/cover-toilet.jpg"), IMG("/images/cover-medical.jpg")],
      coverPairs: [coverPair("toilet"), coverPair("workplace"), coverPair("medical")],
    },
    {
      no: "④",
      title: "媒體、社群與內容創作",
      fit: "十年創作者的實戰經驗",
      homeSummary: "社群媒體經營、社群內容企劃、短影音內容創作、議題倡議與社群傳播、個人品牌與內容創作",
      subtopics: ["社群媒體經營", "社群內容企劃", "短影音內容創作", "議題倡議與社群傳播", "個人品牌與內容創作"],
      legalHours: "性別主流化",
      homeCoverImages: [IMG("/images/cover-talk.jpg"), IMG("/images/covers/talk2-cover.jpg")],
      coverPairs: [coverPair("communication"), coverPair("talk2")],
    },
  ],
};

const speaking = {
  _id: "speaking",
  _type: "speaking",
  email: "leochenlc0402@gmail.com",
  inquiryIntro: "若有演講、講座、課程或主題分享的邀請，歡迎來信至 leochenlc0402@gmail.com",
  inquiryNote: "為方便事前了解活動需求與安排，來信時可以提供以下資訊：",
  inquiryFields: [
    "活動主題與分享內容",
    "活動日期、時間與預計時長",
    "活動地點（實體／線上）",
    "參與對象與預估人數",
    "主辦／承辦單位及聯絡窗口",
    "講師費、交通費等相關經費資訊",
    "其他希望配合的活動需求或注意事項",
  ],
  emailChannelNote:
    "演講邀約以 Email 為主要聯繫方式，方便後續確認活動細節，也能避免訊息散落在不同平台而遺漏。",
  replyNote: "收到邀請後，我會依照活動內容與時間安排回覆，謝謝你的理解與邀請。",
  feeIntro:
    "為方便活動規劃與預算編列，演講費用將依邀請單位、活動形式、內容需求及授課時數等條件評估；實際費用與合作方式，仍可依活動內容及需求進一步討論。",
  publicSectorFees: [
    "單場演講費用：4,000 元 起",
    "單次活動原則上以兩節課為上限；若超過兩節課，費用將另行計算。",
    "若同一單位有多場活動需求，可依實際行程安排合併計算。",
    "課程時數依相關公務人員講座鐘點費規定辦理；原則上每節課以 50 分鐘計算，連續授課 90 分鐘得依兩節課計。",
  ],
  corporateFeeNote: "將依活動規模、主題、形式、時間及合作需求另行報價。",
  transportFees: [
    "交通費原則採實報實銷。",
    "目前主要出發地為新北板橋。",
    "若活動地點鄰近車站至活動場地仍有交通需求，煩請主辦單位協助安排接駁，或另行負擔計程車等交通費用。",
  ],
  formats: [
    {
      title: "講座／演講",
      homeLine: "公務機關、企業、學校教職員、一般大眾。建議安排 2 小時。",
      homeDuration: "1–3 小時",
      fields: [
        { label: "講題名稱", value: "詳見「演講主題與內容列表」" },
        { label: "適合對象", value: "公務機關、企業、學校教職員、一般大眾" },
        { label: "建議時長", value: "1–3 小時（最少安排 1 小時，建議以 2 小時為適當時長）" },
      ],
    },
    {
      title: "工作坊／實務操作",
      homeLine: "CEDAW 短影音拍攝、自製媒材教學。半天概念與實務，半天動手做。",
      homeDuration: "6–8 小時",
      fields: [
        { label: "講題名稱", value: "CEDAW 短影音拍攝、自製媒材教學等" },
        { label: "適合對象", value: "公務機關、企業、學校教職員、一般大眾" },
        { label: "建議時長", value: "6–8 小時（可安排半天概念與實務教學、半天實作操作）" },
      ],
    },
    {
      title: "電影賞析暨映後專家分享",
      homeLine: "依主辦單位需求選片，映後搭配性平與 CEDAW 議題分享至少 30 分鐘。",
      homeDuration: "1.5–3 小時",
      fields: [
        { label: "講題名稱", value: "依主辦單位需求選片，搭配性別平等及 CEDAW 議題進行專業分享" },
        { label: "適合對象", value: "公務機關、企業、學校教職員、一般大眾" },
        { label: "建議時長", value: "1.5–3 小時（包含影片放映及映後專家分享，映後分享至少 30 分鐘）" },
      ],
    },
    {
      title: "論壇／座談／主持",
      homeLine: "性別議題論壇、座談、專題對談、映後座談。",
      homeDuration: "1–3 小時",
      fields: [
        { label: "參與形式", value: "性別議題論壇、座談、專題對談、映後座談等" },
        { label: "適合對象", value: "公務機關、企業、學校、NGO、一般大眾" },
        { label: "建議時長", value: "1–3 小時" },
        { label: "曾經合作", value: "新竹市公車無障礙服務及性平友善度調查專家學者座談會" },
      ],
    },
    {
      title: "顧問／議題諮詢",
      homeLine: "性平議題諮詢、活動內容規劃、教材與宣導媒材建議。",
      homeDuration: "依專案評估",
      fields: [
        { label: "服務內容", value: "性別平等議題諮詢、活動內容規劃、教材與宣導媒材建議等" },
        { label: "適合對象", value: "公務機關、企業、學校、NGO" },
        { label: "合作形式", value: "單次諮詢／專案合作／顧問服務" },
        { label: "建議時長", value: "依專案需求評估" },
        { label: "曾經合作", value: "雲林縣政府性別平等業務輔導考核－性別平等故事方案工作坊顧問" },
      ],
    },
  ],
};

const media = {
  _id: "media",
  _type: "media",
  videoWorks: [
    {
      category: "職場性騷擾",
      title: "影音作品｜導演私下騷擾女演員，惡意的禮物該如何拒絕",
      description: "探討職場中的性騷擾情境，以及面對不當示好與權力關係時，如何辨識與拒絕。",
      youtubeUrl: "https://youtu.be/QyFQ8ysFMGw?si=QEH_gnbmbFyAPRRk",
      award: "本片榮獲113年度勞動人權短片徵選比賽 銀獎",
    },
    {
      category: "職場性騷擾",
      title: "影音作品｜職場真的有潛規則？被騷擾只能忍耐？",
      description: "從職場情境出發，認識性騷擾與不當行為，以及面對職場性騷擾時可以採取的行動。",
      youtubeUrl: "https://www.youtube.com/watch?v=6k-UZ820wGk",
    },
  ],
  pressItems: [
    {
      outlet: "中華日報",
      title: "宜蘭辦公廁性別訓練 防偷拍維護隱私安全",
      date: "2026/9/23",
      summary: "分享性別友善廁所的推動與實務經驗，從公廁的性別友善、談到防偷拍、隱私維護與友善空間的建立。",
      url: "https://www.cdns.com.tw/articles/1464620",
    },
    {
      outlet: "Yahoo奇摩新聞",
      title: "婚姻是練習再見的開始，不OK的我們也很好",
      date: "2025/4/19",
      summary:
        "從長期伴侶關係與婚姻生活出發，分享兩個人在相處、磨合與面對關係變化中的練習，也談「不完美的關係」如何找到屬於彼此的相處方式。",
      url: "https://tw.news.yahoo.com/share/a06fe8aa-8b56-431e-b9c1-680a66ee5d50",
    },
    {
      outlet: "中央廣播電台",
      title: "關係中的「夫夫之道」 人氣CP感情認真聊",
      date: "2024/11/17",
      summary: "分享長期伴侶的相處經驗，從愛情、溝通到共同生活，談兩個人如何在關係中持續理解彼此、一起成長。",
      url: "https://www.rti.org.tw/programnews?uid=4&pid=56487",
    },
    {
      outlet: "關鍵評論網",
      title: "專訪夫夫之道：媽媽，我喜歡男生，但我永遠是你的兒子",
      date: "2020/11/01",
      summary: "從同志身分認同與家庭關係出發，分享出櫃歷程，以及同志子女與父母之間如何理解彼此、重新建立親密關係。",
      url: "https://www.thenewslens.com/article/139953",
    },
    {
      outlet: "卓越雜誌",
      title: "正能量的佛系YouTuber夫夫之道",
      date: "2020/07/07",
      summary: "分享夫夫之道從伴侶生活走向社群創作的歷程，以及如何透過影音內容分享多元性別、親密關係與生活故事。",
      url: "https://www.ecf.com.tw/tw/article/show.aspx?num=5731&teg=%E7%B6%B2%E7%B4%85",
    },
  ],
  podcast: {
    name: "心靈處方籤 Podcast",
    description:
      "從夫夫之道的生活經驗出發，談伴侶關係、情感教育、人生選擇與生活裡的各種難題。沒有標準答案，只有一起聊聊那些我們都曾經遇過的心事。",
    url: "https://open.firstory.me/user/fufuknows/platforms",
  },
};

const corporateClients = [
  "Dell",
  "Deloitte 勤業眾信",
  "Elanco 禮藍動保",
  "FIRSTWEB 第一網站",
  "Hennessy 軒尼詩",
  "Jardine Restaurant Group",
  "Oracle 甲骨文台灣",
  "PwC Taiwan 資誠聯合會計師事務所",
  "Uber",
  "Unilever 聯合利華",
  "VF Corporation 威富",
];
const governmentClients = [
  "教育部國民及學前教育署",
  "臺北市政府勞動局",
  "臺南市政府社會局",
  "臺南市政府性別平等辦公室",
  "高雄市政府社會局",
  "宜蘭縣政府環保局",
  "新竹市政府衛生局",
  "新竹市政府社會處",
  "新竹市政府人事處",
  "雲林縣政府社會處",
  "雲林縣政府環保局",
  "雲林縣政府勞動暨青年發展處",
  "嘉義縣政府勞工暨青年發展處",
  "彰化縣政府青年發展處",
  "臺南市議會",
  "高雄市議會",
  "聖功醫院",
];
const schoolClients = [
  "中華民國藥學生聯合會",
  "國立臺灣大學",
  "NTUGayChat 臺大男同性戀社",
  "國立臺灣師範大學性壇社",
  "國立政治大學傳播學院",
  "國立成功大學性別平等委員會",
  "國立成功大學 TO 拉酷社",
  "國立中央大學性別小彩坊",
  "國立暨南國際大學",
  "國立臺北護理健康大學學生輔導中心",
  "國立臺北醫學大學酷Cheer社",
  "國立臺中教育大學學生會",
  "國立高雄師範大學",
  "國立屏東科技大學社會工作系",
  "馬偕醫學院醫學系系學會",
  "淡江大學視障資源中心",
  "世新大學口語傳播暨社群媒體學系",
  "世新大學學務處",
  "佛光大學應用經濟系",
  "佛光大學公共事務學系",
  "靜宜大學學生會",
  "南華大學應用社會系",
  "南華大學彩虹平道社",
  "崑山科技大學公共關係暨廣告系",
  "中華醫事科技大學學生輔導中心",
  "龍華科技大學課外活動組",
  "大同技術學院教師研習",
  "遠東科技大學",
  "環球科技大學健康與諮商中心",
  "弘光科技大學學務處諮商輔導中心",
  "長庚科技大學 Rainbow同趣社",
  "致理科技大學行銷與流通管理系",
  "健行科技大學學生事務處諮商輔導組",
  "城市科技大學學生事務處",
  "松山高中",
  "二水國中學生輔導中心",
];
const ngoClients = [
  "社團法人台灣基地協會",
  "殘酷兒 Disabled+Queer",
  "桃緣彩虹居所",
  "GisneyLand 風城部屋",
  "GisneyLand 諸羅部屋",
  "蘆洲少年福利服務中心",
  "台北市基督教教會聯合會",
  "網路自媒體從業人員職業工會",
  "交點 × 創人物",
  "No More Closet × 破櫃計畫",
  "Stand By 憂",
  "南方彩虹街6號",
  "陽光酷兒中心",
  "台南彩虹遊行",
  "臺南粉紅點",
  "世界展望會雲林中心",
  "家庭扶助基金會雲林分事務所",
  "勵馨基金會台南分事務所",
];

const clients = {
  _id: "clients",
  _type: "clients",
  corporateClients,
  governmentClients,
  schoolClients,
  ngoClients,
  clientsSummaryLine: "還有 Dell、Deloitte 勤業眾信、Uber、聯合利華、臺大、政大、成大等 80 多個單位。",
  cityLogos: [
    { name: "臺北市政府", image: IMG("/images/logo-taipei.png") },
    { name: "新竹市政府", image: IMG("/images/logo-hsinchu-city.png") },
    { name: "宜蘭縣政府", image: IMG("/images/logo-yilan.png") },
    { name: "彰化縣政府", image: IMG("/images/logo-changhua.png") },
    { name: "雲林縣政府", image: IMG("/images/logo-yunlin.png") },
    { name: "嘉義縣政府", image: IMG("/images/logo-chiayi.png") },
    { name: "臺南市政府", image: IMG("/images/logo-tainan.png") },
    { name: "高雄市政府", image: IMG("/images/logo-kaohsiung.png") },
  ],
  referralCount: { number: "10", suffix: "+" },
  referralLeadLines: ["個單位，再次邀約第二場的延續——"],
  referralNote: "承辦聽完覺得讚，回去用自己單位的名義再邀一場",
};

const allDocs = { siteProfile, homepage, about, topics, speaking, media, clients };

async function main() {
  console.log(`專案 ${projectId} / dataset ${dataset}`);
  for (const [name, doc] of Object.entries(allDocs)) {
    console.log(`\n處理「${name}」...`);
    const resolved = await resolveImages(doc);
    await client.createOrReplace(addKeys(resolved));
    console.log(`  ✅ 已寫入並發布 _id=${resolved._id}`);
  }
  console.log("\n全部完成。");
}

main().catch((err) => {
  console.error("\n❌ 執行失敗：", err.message || err);
  process.exit(1);
});
