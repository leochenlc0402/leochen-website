// 演講主題與內容。來源：leo-brief-2026-09-25.pdf 頁面二，逐字抄錄。
// homeSummary／fit 是首頁「四個講題」卡片的文字，逐字照定稿靜態稿 final-home.html
// （里歐已確認 OK），比 subtopics 完整清單更精簡——首頁與 /speaking 各自要求不同，
// 不是同一段文字，兩邊都保留、互不覆蓋。
// coverSlugs 對應 public/images/covers/<slug>-cover.jpg／<slug>-inner.jpg
// （原始檔在 outputs/leo-website/photos-raw/covers/，已縮圖並轉存英文檔名）。

export type Topic = {
  no: string;
  title: string;
  fit: string; // 首頁卡片副標（文楷、teal）
  homeSummary: string; // 首頁卡片內文（逗號連接的精簡版）
  subtopics: string[]; // /speaking 完整子題清單
  legalHours: string; // 對應法定時數
  homeCovers: [string, string]; // 首頁兩張示意圖（mockups/img，已是英文檔名）
  coverSlugs: string[]; // /speaking 完整簡報封面＋內頁組
};

export const topics: Topic[] = [
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
    homeCovers: ["/images/cover-cedaw.jpg", "/images/cover-policy.jpg"],
    coverSlugs: ["cedaw-convention", "cedaw-policy", "cedaw-practice"],
  },
  {
    no: "②",
    title: "多元性別與性別議題",
    fit: "對應同志暨多元性別課程",
    homeSummary:
      "認識多元性別、性別、婚姻與多元家庭、同婚與婚姻平權、同志伴侶關係與生命故事",
    subtopics: [
      "認識多元性別",
      "性別、婚姻與多元家庭",
      "同婚與婚姻平權",
      "同志伴侶關係",
      "同志伴侶生命故事",
    ],
    legalHours: "同志暨多元性別 1 小時",
    homeCovers: ["/images/cover-samesex.jpg", "/images/cover-film.jpg"],
    coverSlugs: ["samesex-marriage", "film-screening"],
  },
  {
    no: "③",
    title: "性別與日常生活",
    fit: "職場、醫療、友善廁所，提供各種講題。",
    homeSummary:
      "性別友善廁所、性別友善職場、性別與政策推動、性別與媒體、性別與政治、性別與民俗及宗教",
    subtopics: [
      "性別友善廁所",
      "性別友善職場",
      "性別與政策推動",
      "性別與媒體",
      "性別與政治",
      "性別與民俗／宗教",
    ],
    legalHours: "性別主流化",
    homeCovers: ["/images/cover-toilet.jpg", "/images/cover-medical.jpg"],
    coverSlugs: ["toilet", "workplace", "medical"],
  },
  {
    no: "④",
    title: "媒體、社群與內容創作",
    fit: "十年創作者的實戰經驗",
    homeSummary:
      "社群媒體經營、社群內容企劃、短影音內容創作、議題倡議與社群傳播、個人品牌與內容創作",
    subtopics: [
      "社群媒體經營",
      "社群內容企劃",
      "短影音內容創作",
      "議題倡議與社群傳播",
      "個人品牌與內容創作",
    ],
    legalHours: "性別主流化",
    homeCovers: ["/images/cover-talk.jpg", "/images/covers/talk2-cover.jpg"],
    coverSlugs: ["communication", "talk2"],
  },
];
