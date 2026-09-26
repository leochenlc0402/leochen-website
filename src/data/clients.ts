// 謝謝政府機關、學校單位與企業品牌的邀請。
// 來源：leo-brief-2026-09-25.pdf 頁面二末段（四欄：企業／政府／學校／NGO），
// 以 pdftotext -layout 與逐欄核對兩種方式交叉確認後逐字抄錄。
// 沒有 logo 素材，一律用文字牆呈現。
//
// 不確定事項（PDF 表格跨頁換行，無法從純文字排版 100% 判斷斷行處是否為同一個名稱）：
// 1.「Jardine」與「Restaurant Group」在原文連續兩行、無標點分隔，這裡當成同一家公司
//    「Jardine Restaurant Group」（確有同名連鎖餐飲集團）處理，但不排除是兩個獨立品牌。
// 2.「Disabled+Queer」與「桃緣彩虹居所」同樣連續兩行、無標點分隔，這裡當成同一個單位處理，
//    但也可能是兩個獨立單位（分見 ngoClients）。
// 兩項已列入完成回報的「不確定事項」，請里歐確認後再調整。

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
  "國立中央大學性別",
  "小彩坊",
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
  "殘酷兒",
  "Disabled+Queer 桃緣彩虹居所",
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

// 四大類單位總數，供首頁四格數據使用（企業11＋政府17＋學校37＋NGO18＝83）。
// 算出來的，不手動寫死——單位名單增減時這個數字會自動跟著對。
export const totalClientCount =
  corporateClients.length +
  governmentClients.length +
  schoolClients.length +
  ngoClients.length;

// /speaking 合作單位牆前面放大的 10 個，2026-09-26 創晃指定名單。
// 「PwC Taiwan 資誠」「國立成功大學」在 clients.ts 沒有一字不差的同名項目，
// 依指示換成清單裡實際存在、最接近的名稱（見 outputs/leo-website 交接紀錄）。
export const featuredClients: string[] = [
  "Dell",
  "Deloitte 勤業眾信",
  "Uber",
  "Unilever 聯合利華",
  "PwC Taiwan 資誠聯合會計師事務所",
  "教育部國民及學前教育署",
  "國立臺灣大學",
  "國立成功大學性別平等委員會",
  "國立政治大學傳播學院",
  "臺北市政府勞動局",
];
