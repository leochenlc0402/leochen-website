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
