// 首頁「為什麼是他」三張身份卡。
// 每一條證據逐字取自 src/data/experience.ts、src/data/media.ts，未新增或改寫任何經歷與數字。
// 對應意義（安全／不冷場／真實）來自 outputs/leo-website/brand-audit-2026-09-26.md §2.2。

export type IdentityCard = {
  title: string;
  angle: string; // 對採購者的意義
  evidenceLines: [string, string];
};

export const identityCards: IdentityCard[] = [
  {
    title: "委員",
    angle: "安全",
    evidenceLines: [
      "新竹市政府性別平等委員（第 4 屆）、雲林縣政府性別平等委員（第 11、12 屆）",
      "宜蘭縣、新竹縣、雲林縣三個縣市性別人才資料庫專家學者",
    ],
  },
  {
    title: "創作者",
    angle: "不冷場",
    evidenceLines: [
      "「夫夫之道 Fufuknows」共同創作者・YouTube 白銀創作者・夫夫之道全平台 292K",
      "《導演私下騷擾女演員，惡意的禮物該如何拒絕》榮獲 113 年度勞動人權短片徵選比賽 銀獎",
    ],
  },
  {
    title: "當事人",
    angle: "真實",
    evidenceLines: [
      "《不OK的我們也很好：人氣YouTuber夫夫之道，長跑九年的關係練習》共同作者",
      "關鍵評論網專訪〈媽媽，我喜歡男生，但我永遠是你的兒子〉",
    ],
  },
];
