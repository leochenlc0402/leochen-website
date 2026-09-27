// 演講邀約頁：邀約說明、來信需附資訊、費用說明。
// 來源：leo-brief-2026-09-25.pdf 頁面二，逐字抄錄。

export const inquiryIntro =
  "若有演講、講座、課程或主題分享的邀請，歡迎來信至 leochenlc0402@gmail.com";

export const inquiryNote =
  "為方便事前了解活動需求與安排，來信時可以提供以下資訊：";

export const inquiryFields: string[] = [
  "活動主題與分享內容",
  "活動日期、時間與預計時長",
  "活動地點（實體／線上）",
  "參與對象與預估人數",
  "主辦／承辦單位及聯絡窗口",
  "講師費、交通費等相關經費資訊",
  "其他希望配合的活動需求或注意事項",
];

export const emailChannelNote =
  "演講邀約以 Email 為主要聯繫方式，方便後續確認活動細節，也能避免訊息散落在不同平台而遺漏。";

export const replyNote =
  "收到邀請後，我會依照活動內容與時間安排回覆，謝謝你的理解與邀請。";

export const feeIntro =
  "為方便活動規劃與預算編列，演講費用將依邀請單位、活動形式、內容需求及授課時數等條件評估；實際費用與合作方式，仍可依活動內容及需求進一步討論。";

export const publicSectorFees: string[] = [
  "單場演講費用：4,000 元 起",
  "單次活動原則上以兩節課為上限；若超過兩節課，費用將另行計算。",
  "若同一單位有多場活動需求，可依實際行程安排合併計算。",
  "課程時數依相關公務人員講座鐘點費規定辦理；原則上每節課以 50 分鐘計算，連續授課 90 分鐘得依兩節課計。",
];

export const corporateFeeNote = "將依活動規模、主題、形式、時間及合作需求另行報價。";

export const transportFees: string[] = [
  "交通費原則採實報實銷。",
  "目前主要出發地為新北板橋。",
  "若活動地點鄰近車站至活動場地仍有交通需求，煩請主辦單位協助安排接駁，或另行負擔計程車等交通費用。",
];

// 合作形式（逐字）。來源：leo-answers-2026-09-27.md〈合作形式〉。
// homeLine／homeDuration 是首頁「可以怎麼請他」卡片的精簡版文字，逐字照定稿靜態稿
// final-home.html（里歐已確認 OK）；fields 是 /speaking 頁要求的完整逐字欄位。
export type Format = {
  title: string;
  homeLine: string;
  homeDuration: string;
  fields: { label: string; value: string }[];
};

export const formats: Format[] = [
  {
    title: "講座／演講",
    homeLine: "公務機關、企業、學校教職員、一般大眾。建議安排 2 小時。",
    homeDuration: "1–3 小時",
    fields: [
      { label: "講題名稱", value: "詳見「演講主題與內容列表」" },
      { label: "適合對象", value: "公務機關、企業、學校教職員、一般大眾" },
      {
        label: "建議時長",
        value: "1–3 小時（最少安排 1 小時，建議以 2 小時為適當時長）",
      },
    ],
  },
  {
    title: "工作坊／實務操作",
    homeLine: "CEDAW 短影音拍攝、自製媒材教學。半天概念與實務，半天動手做。",
    homeDuration: "6–8 小時",
    fields: [
      { label: "講題名稱", value: "CEDAW 短影音拍攝、自製媒材教學等" },
      { label: "適合對象", value: "公務機關、企業、學校教職員、一般大眾" },
      {
        label: "建議時長",
        value: "6–8 小時（可安排半天概念與實務教學、半天實作操作）",
      },
    ],
  },
  {
    title: "電影賞析暨映後專家分享",
    homeLine: "依主辦單位需求選片，映後搭配性平與 CEDAW 議題分享至少 30 分鐘。",
    homeDuration: "1.5–3 小時",
    fields: [
      {
        label: "講題名稱",
        value: "依主辦單位需求選片，搭配性別平等及 CEDAW 議題進行專業分享",
      },
      { label: "適合對象", value: "公務機關、企業、學校教職員、一般大眾" },
      {
        label: "建議時長",
        value: "1.5–3 小時（包含影片放映及映後專家分享，映後分享至少 30 分鐘）",
      },
    ],
  },
  {
    title: "論壇／座談／主持",
    homeLine: "性別議題論壇、座談、專題對談、映後座談。",
    homeDuration: "1–3 小時",
    fields: [
      {
        label: "參與形式",
        value: "性別議題論壇、座談、專題對談、映後座談等",
      },
      { label: "適合對象", value: "公務機關、企業、學校、NGO、一般大眾" },
      { label: "建議時長", value: "1–3 小時" },
      {
        label: "曾經合作",
        value: "新竹市公車無障礙服務及性平友善度調查專家學者座談會",
      },
    ],
  },
  {
    title: "顧問／議題諮詢",
    homeLine: "性平議題諮詢、活動內容規劃、教材與宣導媒材建議。",
    homeDuration: "依專案評估",
    fields: [
      {
        label: "服務內容",
        value: "性別平等議題諮詢、活動內容規劃、教材與宣導媒材建議等",
      },
      { label: "適合對象", value: "公務機關、企業、學校、NGO" },
      { label: "合作形式", value: "單次諮詢／專案合作／顧問服務" },
      { label: "建議時長", value: "依專案需求評估" },
      {
        label: "曾經合作",
        value: "雲林縣政府性別平等業務輔導考核－性別平等故事方案工作坊顧問",
      },
    ],
  },
];

export const email = "leochenlc0402@gmail.com";

export function buildMailtoHref() {
  const subject = encodeURIComponent("演講邀約｜〔單位名稱〕");
  const bodyLines = [
    "陳荐宏老師您好，想邀請您進行演講／分享，活動資訊如下：",
    "",
    "活動主題與分享內容：",
    "活動日期、時間與預計時長：",
    "活動地點（實體／線上）：",
    "參與對象與預估人數：",
    "主辦／承辦單位及聯絡窗口：",
    "講師費、交通費等相關經費資訊：",
    "其他希望配合的活動需求或注意事項：",
    "",
    "謝謝您！",
  ];
  const body = encodeURIComponent(bodyLines.join("\n"));
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
