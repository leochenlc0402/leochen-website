// 基本資料。真本來源：outputs/leo-website/leo-brief-2026-09-25.pdf 頁面一。
// 之後接 Sanity 時，這個檔案的形狀就是 singleton document 的欄位。

export const profile = {
  nameZh: "陳荐宏",
  nameEn: "Leo Chen",
  displayName: "陳荐宏 Leo Chen",
  title: "性平講師 × 社群媒體創作者",
  email: "leochenlc0402@gmail.com",
  // 形象照尚未提供，先用色塊占位，正式照片到位後把這個路徑換掉即可。
  heroImagePlaceholder: "/placeholder/portrait.svg",
  departFrom: "新北板橋",
} as const;
