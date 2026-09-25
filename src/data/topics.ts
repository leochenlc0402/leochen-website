// 演講主題與內容。來源：leo-brief-2026-09-25.pdf 頁面二，逐字抄錄。
// 每個講題附子題清單與兩張「簡報封面待補」占位（PDF 原文每欄下方各有兩格「這裡想放簡報封面」）。

export type Topic = {
  no: string;
  title: string;
  subtopics: string[];
};

export const topics: Topic[] = [
  {
    no: "①",
    title: "性別平等與 CEDAW",
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
  },
  {
    no: "②",
    title: "多元性別與性別議題",
    subtopics: [
      "認識多元性別",
      "性別、婚姻與多元家庭",
      "同婚與婚姻平權",
      "同志伴侶關係",
      "同志伴侶生命故事",
    ],
  },
  {
    no: "③",
    title: "性別與公共生活",
    subtopics: [
      "性別友善廁所",
      "性別友善職場",
      "性別與政策推動",
      "性別與媒體",
      "性別與政治",
      "性別與民俗／宗教",
    ],
  },
  {
    no: "④",
    title: "媒體、社群與內容創作",
    subtopics: [
      "CEDAW與社群媒體經營",
      "社群內容企劃",
      "短影音內容創作",
      "議題倡議與社群傳播",
      "個人品牌與內容創作",
    ],
  },
];

export const topicsIntro = "性別平等 × 多元性別 × 公共溝通 × 社群創作";
