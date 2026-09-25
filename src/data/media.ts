// 媒體影音／媒體報導／Podcast。來源：leo-brief-2026-09-25.pdf 頁面三，逐字抄錄。

export type VideoWork = {
  category: string;
  title: string;
  description: string;
  youtubeUrl: string;
  award?: string;
};

export const videoWorks: VideoWork[] = [
  {
    category: "職場性騷擾",
    title: "影音作品｜導演私下騷擾女演員，惡意的禮物該如何拒絕",
    description:
      "探討職場中的性騷擾情境，以及面對不當示好與權力關係時，如何辨識與拒絕。",
    youtubeUrl: "https://youtu.be/QyFQ8ysFMGw?si=QEH_gnbmbFyAPRRk",
    award: "本片榮獲113年度勞動人權短片徵選比賽 銀獎",
  },
  {
    category: "職場性騷擾",
    title: "影音作品｜職場真的有潛規則？被騷擾只能忍耐？",
    description:
      "從職場情境出發，認識性騷擾與不當行為，以及面對職場性騷擾時可以採取的行動。",
    youtubeUrl: "https://www.youtube.com/watch?v=6k-UZ820wGk",
  },
];

// YouTube embed 用的 video id，從上面的 URL 抽出。
export function getYoutubeEmbedId(url: string): string {
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return shortMatch[1];
  const longMatch = url.match(/[?&]v=([^&]+)/);
  if (longMatch) return longMatch[1];
  return "";
}

export type PressItem = {
  outlet: string;
  title: string;
  date: string;
  summary: string;
  url: string;
};

export const pressItems: PressItem[] = [
  {
    outlet: "中華日報",
    title: "宜蘭辦公廁性別訓練 防偷拍維護隱私安全",
    date: "2026/9/23",
    summary:
      "分享性別友善廁所的推動與實務經驗，從公廁的性別友善、談到防偷拍、隱私維護與友善空間的建立。",
    url: "https://www.cdns.com.tw/articles/1464620",
  },
  {
    outlet: "Yahoo奇摩新聞",
    title: "婚姻是練習再見的開始，不OK的我們也很好",
    date: "2025/4/19",
    summary:
      "從長期伴侶關係與婚姻生活出發，分享兩個人在相處、磨合與面對關係變化中的練習，也談「不完美的關係」如何找到屬於彼此的相處方式。",
    url: "https://tw.news.yahoo.com/share/a06fe8aa-8b56-431e-b9c1-680a66ee5d50",
  },
  {
    outlet: "中央廣播電台",
    title: "關係中的「夫夫之道」 人氣CP感情認真聊",
    date: "2024/11/17",
    summary:
      "分享長期伴侶的相處經驗，從愛情、溝通到共同生活，談兩個人如何在關係中持續理解彼此、一起成長。",
    url: "https://www.rti.org.tw/programnews?uid=4&pid=56487",
  },
  {
    outlet: "關鍵評論網",
    title: "專訪夫夫之道：媽媽，我喜歡男生，但我永遠是你的兒子",
    date: "2020/11/01",
    summary:
      "從同志身分認同與家庭關係出發，分享出櫃歷程，以及同志子女與父母之間如何理解彼此、重新建立親密關係。",
    url: "https://www.thenewslens.com/article/139953",
  },
  {
    outlet: "卓越雜誌",
    title: "正能量的佛系YouTuber夫夫之道",
    date: "2020/07/07",
    summary:
      "分享夫夫之道從伴侶生活走向社群創作的歷程，以及如何透過影音內容分享多元性別、親密關係與生活故事。",
    url: "https://www.ecf.com.tw/tw/article/show.aspx?num=5731&teg=%E7%B6%B2%E7%B4%85",
  },
];

export const podcast = {
  name: "心靈處方籤 Podcast",
  description:
    "從夫夫之道的生活經驗出發，談伴侶關係、情感教育、人生選擇與生活裡的各種難題。沒有標準答案，只有一起聊聊那些我們都曾經遇過的心事。",
  url: "https://open.firstory.me/user/fufuknows/platforms",
};
