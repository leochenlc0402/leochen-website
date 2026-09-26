// 演講主題與內容。來源：leo-brief-2026-09-25.pdf 頁面二，逐字抄錄。
// 每個講題附子題清單與兩張「簡報封面待補」占位（PDF 原文每欄下方各有兩格「這裡想放簡報封面」）。
//
// 2026-09-26 加四個欄位（brand-audit-2026-09-26.md §三）：適合對象／建議時長／形式 三項待里歐提供，
// 先占位；對應法定時數依創晃查證的行政院性別平等會＋人事總處規定填入（見 brand-audit 第〇節）：
// 一般公務員年度必修「性別主流化」課程，其中「同志暨多元性別」1 小時是明列子科目。

export type Topic = {
  no: string;
  title: string;
  subtopics: string[];
  suitableFor: string; // 適合對象（待補）
  suggestedDuration: string; // 建議時長（待補）
  format: string; // 形式（待補）
  legalHours: string; // 對應法定時數
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
    suitableFor: "（待里歐提供：＿＿）",
    suggestedDuration: "（待里歐提供：＿＿）",
    format: "（待里歐提供：＿＿）",
    legalHours: "性別主流化 2 小時",
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
    suitableFor: "（待里歐提供：＿＿）",
    suggestedDuration: "（待里歐提供：＿＿）",
    format: "（待里歐提供：＿＿）",
    legalHours: "同志暨多元性別 1 小時",
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
    suitableFor: "（待里歐提供：＿＿）",
    suggestedDuration: "（待里歐提供：＿＿）",
    format: "（待里歐提供：＿＿）",
    legalHours: "性別主流化",
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
    suitableFor: "（待里歐提供：＿＿）",
    suggestedDuration: "（待里歐提供：＿＿）",
    format: "（待里歐提供：＿＿）",
    legalHours: "性別主流化",
  },
];

export const topicsIntro = "性別平等 × 多元性別 × 公共溝通 × 社群創作";
