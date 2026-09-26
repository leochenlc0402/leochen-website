// 首頁四格數據。前兩項來源：leo-brief-2026-09-25.pdf 頁面一，逐字抄錄。
// 第三項改算「政府・學校・企業單位」總數（含 NGO，見 clients.ts totalClientCount）取代原本對採購者無感的「175+ 時演講時數」。
// 第四項「重複邀約單位」是新加的，數字待里歐提供，先占位。
// 292K 全平台粉絲不再放這裡，移到首頁「為什麼是他」創作者身份卡，並標「夫夫之道全平台」（見 src/data/identity.ts）。
import { totalClientCount } from "@/data/clients";

export const stats = [
  { value: "80+", label: "場演講場次" },
  { value: "4.8分", label: "正向回饋" },
  { value: `${totalClientCount}`, label: "個政府・學校・企業單位" },
  { value: "＿＿", label: "重複邀約單位（數字待補：待里歐提供）" },
] as const;
