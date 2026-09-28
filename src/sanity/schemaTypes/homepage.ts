import { defineArrayMember, defineField, defineType } from "sanity";

// 首頁（singleton）。對應 src/data/homepage.ts、stats.ts、testimonials.ts、identity.ts，
// 以及 src/app/page.tsx 目前寫死的「授課現場照片條」。
export const homepage = defineType({
  name: "homepage",
  title: "首頁",
  type: "document",
  groups: [
    { name: "hero", title: "首屏主張句" },
    { name: "stats", title: "數據與照片條" },
    { name: "voices", title: "台下怎麼說" },
    { name: "identity", title: "為什麼選擇我" },
  ],
  fields: [
    defineField({
      name: "heroFormal",
      title: "主張句（第一行，正式）",
      type: "string",
      description: "首頁最上方大標題第一行，例：「性別平等，可以很重要，」",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroCasual",
      title: "主張句（第二行，活潑）",
      type: "string",
      description:
        "首頁大標題第二行，例：「也可以很好玩。」。注意：程式會把「好玩」兩個字特別加色，換句子時盡量保留「好玩」這個詞，否則需要工程師調整。",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubhead",
      title: "主張句下方的副標",
      type: "string",
      description: "例：「把法定必修，講成大家想聽的那一堂。」",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stats",
      title: "首頁數據（四格）",
      type: "array",
      description: "首頁大標題下方的四個數字方塊，例：80+ 場演講。可拖曳調整順序。",
      group: "stats",
      of: [
        defineArrayMember({
          type: "object",
          name: "statItem",
          fields: [
            defineField({
              name: "value",
              title: "數字",
              type: "string",
              description: "例：「80+」「4.8」「292K」。",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "suffix",
              title: "數字後綴（選填）",
              type: "string",
              description: "接在數字後面的小字，例「分」。大部分項目留空即可。",
            }),
            defineField({
              name: "label",
              title: "說明文字",
              type: "string",
              description: "數字下方的說明，例：「場演講」。",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { value: "value", suffix: "suffix", label: "label" },
            prepare({ value, suffix, label }) {
              return { title: `${value}${suffix ?? ""} — ${label}` };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "stripImages",
      title: "授課現場照片條",
      type: "array",
      description:
        "數據下方橫向排列的授課現場照片。開啟人臉重心可自己調整裁切位置對準講者；沒設定時會用「備用裁切位置」這個舊數值。",
      group: "stats",
      of: [
        defineArrayMember({
          type: "object",
          name: "stripImage",
          fields: [
            defineField({
              name: "image",
              title: "照片",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "fallbackXPercent",
              title: "備用裁切位置（沒設定人臉重心時使用）",
              type: "number",
              description:
                "0～100，數字愈大畫面愈往右對齊（例如講者站在畫面右側就設高一點）。已經設定人臉重心的話這欄不會用到。",
              initialValue: 50,
              validation: (Rule) => Rule.min(0).max(100),
            }),
          ],
          preview: {
            select: { media: "image", x: "fallbackXPercent" },
            prepare({ media, x }) {
              return { title: `照片（備用位置 ${x}%）`, media };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "台下怎麼說（跑馬燈句子）",
      type: "array",
      description:
        "演講聽眾回饋跑馬燈，會分成兩排循環捲動。可拖曳調整順序，但兩排怎麼分是照程式裡固定的位置抓，增刪句子數量前建議先問工程師確認跑馬燈還會不會好看。",
      group: "voices",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "identityRows",
      title: "為什麼選擇我（三個身分）",
      type: "array",
      description: "首頁「三個身分，不同面向的我」區塊，每一列一張圖＋一段介紹。",
      group: "identity",
      of: [
        defineArrayMember({
          type: "object",
          name: "identityRow",
          fields: [
            defineField({
              name: "role",
              title: "身分名稱",
              type: "string",
              description: "例：「委員」「創作者」「當事人」。",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "roleNote",
              title: "身分小標",
              type: "string",
              description: "身分名稱旁邊的斜體小字，例：「讓性別平等在各縣市開花結果」。",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "介紹內文",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "keywords",
              title: "關鍵字（用 · 分隔）",
              type: "string",
              description: "例：「性別主流化 · CEDAW · 性別平等政策」。",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "照片",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "reverse",
              title: "圖片放右邊",
              type: "boolean",
              description: "開啟後這一列的照片會排到文字右邊，用來做左右交錯的版面。",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "role", subtitle: "roleNote", media: "image" },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "credo",
      title: "信念區塊",
      type: "object",
      description: "首頁深色底「里歐怎麼看性平教育」段落。",
      group: "identity",
      fields: [
        defineField({ name: "note", title: "小標籤", type: "string" }),
        defineField({ name: "bigLine1", title: "大字第一行", type: "string" }),
        defineField({
          name: "bigLine2Em",
          title: "大字第二行（強調色）",
          type: "string",
        }),
        defineField({ name: "small", title: "下方小字說明", type: "text", rows: 3 }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "首頁內容" };
    },
  },
});
