// 首頁專用的行銷文案（採購者痛點、合作三步驟、精選回饋）。
// 這些是網站文案／流程說明，不是里歐的個人經歷或數字，所以不受
// 「事實只能來自 src/data 與 brief PDF」的限制；但痛點三句是從
// outputs/leo-website/brand-audit-2026-09-26.md §2.1（政府性平必修時數規定、
// 講者選任調查）推出來的採購者處境，不是憑空編的話術。

export const heroKicker = "陳荐宏 Leo Chen．性平講師 × 社群媒體創作者";
export const heroHeadline = "性別平等，可以很重要，也可以很好玩。";
export const heroSubhead = "把法定必修，講成大家想聽的那一堂。";

// 「你可能正在找這樣的講師」：三條採購者的處境，同理不是指責。
export const buyerPains: string[] = [
  "每年都要生出性平時數，翻遍講師名單卻覺得看起來都差不多",
  "怕台下滑手機、怕問卷分數難看，怕明年這門課的預算更難編",
  "怕講師講錯話變公關事件，你得跟長官交代「這位有資歷」",
];

// 「怎麼合作」三步驟，依 src/data/speaking.ts 的邀約流程改寫成三句話，不新增事實。
export const collaborationSteps: { title: string; desc: string }[] = [
  {
    title: "來信說明需求",
    desc: "活動主題、時間、對象、預算，先讓我知道大概的樣子。",
  },
  {
    title: "確認主題、時長與費用",
    desc: "依講題與時數談定內容方向，費用透明，不藏在報價單背後。",
  },
  {
    title: "上課＋事後回饋",
    desc: "上完課我會請你給我回饋，這是讓下一場更好的方式。",
  },
];

// 「他們怎麼說」放大版：從 src/data/testimonials.ts 挑 3 句，單位名待里歐提供。
export const featuredTestimonials: { quote: string; org: string }[] = [
  { quote: "整場沒睡點！", org: "（單位待補）" },
  { quote: "講話很幽默、有梗。", org: "（單位待補）" },
  {
    quote: "性別議題可以很重要，也可以很好玩。",
    org: "（單位待補）",
  },
];
