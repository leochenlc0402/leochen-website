import { defineField, defineType } from "sanity";

// 基本資料（singleton）。對應 src/data/profile.ts。
// 網站最基本的識別資訊：姓名、頭銜、聯絡信箱、首頁與關於頁的形象照。
export const siteProfile = defineType({
  name: "siteProfile",
  title: "基本資料",
  type: "document",
  fields: [
    defineField({
      name: "nameZh",
      title: "中文本名",
      type: "string",
      description: "例：陳荐宏。目前網站畫面沒有單獨顯示，但保留給未來用。",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameEn",
      title: "英文名",
      type: "string",
      description: "例：Leo Chen。",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayName",
      title: "對外顯示全名",
      type: "string",
      description:
        "會出現在每一頁的瀏覽器分頁標題與網站各處署名，例：「陳荐宏 Leo Chen」。",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "頭銜／副標",
      type: "string",
      description: "顯示在首頁大標上方與瀏覽器分頁標題，例：「性平講師 × 社群媒體創作者」。",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "聯絡信箱",
      type: "string",
      description: "演講邀約頁「寫信邀請」按鈕與邀約說明文字用的信箱。",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "heroImage",
      title: "首頁形象照",
      type: "image",
      description: "首頁最上方、大標題旁邊的直式形象照。開啟人臉重心可自己調整裁切位置。",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutImage",
      title: "關於我頁形象照",
      type: "image",
      description: "「關於我」頁面最上方的形象照。",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "displayName", subtitle: "title" },
  },
});
