// 首頁「為什麼是他」三個身份。文字逐字照定稿靜態稿 final-home.html（里歐已確認 OK），
// 事實依據見 src/data/experience.ts、src/data/media.ts、leo-answers-2026-09-27.md。

export type IdentityRow = {
  role: string;
  roleNote: string; // role 後面文楷小字（「政府請他審別人的性平」等）
  body: string;
  keywords: string; // 中間用 " · " 連接
  image: string;
  reverse?: boolean; // true＝圖在右（.rev）
};

export const identityRows: IdentityRow[] = [
  {
    role: "委員",
    roleNote: "讓性別平等在各縣市開花結果",
    body: "新竹市、雲林縣政府性別平等委員，宜蘭、新竹、雲林三縣市性別人才資料庫專家學者。在台灣彩虹平權大平台與議員、性別團體合作，促成各縣市議會超過 300 案相關質詢與提案。",
    keywords: "性別主流化 · CEDAW · 性別平等政策",
    image: "/images/committee.jpg",
  },
  {
    role: "創作者",
    roleNote: "讓人願意看下去是本業",
    body: "YouTube 頻道「夫夫之道 Fufuknows」共同創辦人，2016 年開始用影像和大眾溝通。自製短片獲 113 年度勞動人權短片徵選比賽銀獎，也主持過近 30 場記者會、見面會與遊行主舞台。",
    keywords: "短影音 · 社群企劃 · 議題倡議 · 主持",
    image: "/images/fufu-stage.jpg",
    reverse: true,
  },
  {
    role: "當事人",
    roleNote: "生命故事躍上簡報",
    body: "公開的同志伴侶，和阿凱一起寫下《不OK的我們也很好》，把長跑九年的關係練習攤開來講。講多元家庭與伴侶關係時，我不是在念教材。",
    keywords: "多元性別 · 伴侶關係 · 婚姻平權",
    image: "/images/book.jpg",
  },
];

// 信念（section 5，navy）
export const credo = {
  note: "里歐怎麼看性平教育",
  bigLine1: "法律是底線，專業是標準，",
  bigLine2Em: "友善是品質。",
  small:
    "教育的意義，是提供一個重新認識自己、理解他人，也重新看見這個社會的機會。",
};
