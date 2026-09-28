import { defineArrayMember, defineField, defineType } from "sanity";

// 作品與報導（singleton）。對應 src/data/media.ts。
export const media = defineType({
  name: "media",
  title: "作品與報導",
  type: "document",
  groups: [
    { name: "video", title: "影音作品" },
    { name: "press", title: "媒體報導" },
    { name: "podcast", title: "Podcast" },
  ],
  fields: [
    defineField({
      name: "videoWorks",
      title: "影音作品",
      type: "array",
      group: "video",
      of: [
        defineArrayMember({
          type: "object",
          name: "videoWork",
          fields: [
            defineField({ name: "category", title: "分類", type: "string", description: "例：「職場性騷擾」。" }),
            defineField({ name: "title", title: "作品標題", type: "string" }),
            defineField({ name: "description", title: "作品說明", type: "text", rows: 3 }),
            defineField({
              name: "youtubeUrl",
              title: "YouTube 連結",
              type: "url",
              description: "網站會自動從連結抓出影片 ID 來嵌入播放器。",
            }),
            defineField({
              name: "award",
              title: "得獎紀錄（選填）",
              type: "string",
              description: "例：「本片榮獲113年度勞動人權短片徵選比賽 銀獎」，沒有得獎留空即可。",
            }),
          ],
          preview: { select: { title: "title", subtitle: "category" } },
        }),
      ],
    }),
    defineField({
      name: "pressItems",
      title: "媒體報導",
      type: "array",
      group: "press",
      of: [
        defineArrayMember({
          type: "object",
          name: "pressItem",
          fields: [
            defineField({ name: "outlet", title: "媒體名稱", type: "string" }),
            defineField({ name: "title", title: "報導標題", type: "string" }),
            defineField({
              name: "date",
              title: "刊登日期",
              type: "string",
              description: "維持原本格式即可，例：「2026/9/23」。",
            }),
            defineField({ name: "summary", title: "報導摘要", type: "text", rows: 3 }),
            defineField({ name: "url", title: "報導連結", type: "url" }),
          ],
          preview: { select: { title: "title", subtitle: "outlet" } },
        }),
      ],
    }),
    defineField({
      name: "podcast",
      title: "Podcast",
      type: "object",
      group: "podcast",
      fields: [
        defineField({ name: "name", title: "節目名稱", type: "string" }),
        defineField({ name: "description", title: "節目說明", type: "text", rows: 3 }),
        defineField({ name: "url", title: "收聽連結", type: "url" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "作品與報導內容" };
    },
  },
});
