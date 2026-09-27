// 謝謝政府機關、學校單位與企業品牌的邀請。
// 來源：leo-brief-2026-09-25.pdf 頁面二末段（四欄：企業／政府／學校／NGO），
// 以 pdftotext -layout 與逐欄核對兩種方式交叉確認後逐字抄錄。
// 縣市政府 logo 素材已到位（public/images/logo-*.png），企業／學校／NGO 仍用文字牆呈現。
//
// 2026-09-27 依 leo-answers-2026-09-27.md〈合作單位名稱更正〉修正：
// 1.「Jardine Restaurant Group」維持一家（里歐確認）。
// 2.「殘酷兒 Disabled+Queer」與「桃緣彩虹居所」是兩家，不是一家（原本誤併）。
// 3.「國立中央大學性別小彩坊」是一個單位，不是兩個（原本誤拆成「國立中央大學性別」＋「小彩坊」）。

export const corporateClients: string[] = [
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

export const governmentClients: string[] = [
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

// 注意：「國立中央大學性別」在 PDF 原文欄位換頁處被截斷，看不出完整名稱，
// 依原文原樣列出，不自行補完，已在完成回報中列為待里歐確認事項。
export const schoolClients: string[] = [
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

export const ngoClients: string[] = [
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

export const clientColumns = [
  { label: "企業", items: corporateClients },
  { label: "政府", items: governmentClients },
  { label: "學校", items: schoolClients },
  { label: "NGO", items: ngoClients },
] as const;

// 四大類單位總數（企業11＋政府17＋學校36＋NGO18＝82）。
// 算出來的，不手動寫死——單位名單增減時這個數字會自動跟著對。
export const totalClientCount =
  corporateClients.length +
  governmentClients.length +
  schoolClients.length +
  ngoClients.length;

// 首頁／關於頁「還有 ⋯⋯ 等 80 多個單位」摘要句，逐字照定稿靜態稿 final-home.html。
export const clientsSummaryLine =
  "還有 Dell、Deloitte 勤業眾信、Uber、聯合利華、臺大、政大、成大等 80 多個單位。";

// 首頁「回頭再邀」縣市政府 logo 牆，順序照定稿靜態稿 final-home.html。
// 圖檔：public/images/logo-<slug>.png（原始檔在 photos-raw/logos，中文檔名已改英文）。
export const cityLogos: { slug: string; name: string }[] = [
  { slug: "taipei", name: "臺北市政府" },
  { slug: "hsinchu-city", name: "新竹市政府" },
  { slug: "yilan", name: "宜蘭縣政府" },
  { slug: "changhua", name: "彰化縣政府" },
  { slug: "yunlin", name: "雲林縣政府" },
  { slug: "chiayi", name: "嘉義縣政府" },
  { slug: "tainan", name: "臺南市政府" },
  { slug: "kaohsiung", name: "高雄市政府" },
];

// 回頭再邀鏈：承辦聽完覺得讚，回去用自己單位的名義再邀一場。
// 來源：leo-answers-2026-09-27.md〈回頭再邀〉，逐字；共用中間節點的鏈合併成一條
// （雲林社會處→雲林環保局→宜蘭環保局），照定稿靜態稿 final-home.html 呈現。
export const referralChains: string[][] = [
  ["雲林縣政府社會處", "雲林縣政府環保局", "宜蘭縣政府環保局"],
  ["新竹市政府社會處", "新竹市政府人事處"],
  ["高雄市政府社會處", "嘉義縣政府社會處"],
];

export const referralCount = { number: "10", suffix: "+" };
export const referralLeadLines = ["個單位聽完之後，", "又請了第二場。"];
export const referralNote = "承辦聽完覺得讚，回去用自己單位的名義再邀一場";
