import { defineArrayMember, defineField, defineType } from "sanity";

// 關於我（singleton）。對應 src/data/about.ts 與 src/data/experience.ts。
export const about = defineType({
  name: "about",
  title: "關於我",
  type: "document",
  groups: [
    { name: "positioning", title: "定位與價值觀" },
    { name: "intro", title: "自介全文" },
    { name: "resume", title: "經歷清單" },
  ],
  fields: [
    defineField({
      name: "positioning",
      title: "定位與價值觀（頁面上半部）",
      type: "object",
      description: "「關於我」頁最上方，讓人一句話認識你。三格都可以空著，空著就不顯示。",
      group: "positioning",
      fields: [
        defineField({
          name: "oneLiner",
          title: "一句話介紹自己",
          type: "text",
          rows: 2,
          description: "顯示在大標「嗨，我是里歐。」下方。空著會改顯示頭銜。",
        }),
        defineField({
          name: "motto",
          title: "座右銘",
          type: "text",
          rows: 2,
          description: "頁首下方的一句大字引言。",
        }),
        defineField({
          name: "values",
          title: "核心價值／堅持",
          type: "array",
          description: "一條一句，建議三條以內，顯示在座右銘下方。",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "highlights",
      title: "經歷亮點（數字格）",
      type: "array",
      description: "自介下方的數字格，例：300+ 案、28 場。可拖曳調整順序。",
      group: "resume",
      of: [
        defineArrayMember({
          type: "object",
          name: "highlightItem",
          fields: [
            defineField({ name: "value", title: "數字或短字", type: "string", description: "例：300+、銀獎。" }),
            defineField({ name: "unit", title: "單位（選填）", type: "string", description: "例：案、場、縣市。" }),
            defineField({ name: "label", title: "說明", type: "string" }),
          ],
          preview: {
            select: { value: "value", unit: "unit", label: "label" },
            prepare: ({ value, unit, label }) => ({ title: `${value ?? ""}${unit ?? ""}`, subtitle: label }),
          },
        }),
      ],
    }),
    defineField({
      name: "aboutIntro",
      title: "開場自介",
      type: "object",
      description: "「關於我」頁面最上方到自介全文的區塊，逐字稿性質，改動時請保持語氣。",
      group: "intro",
      fields: [
        defineField({
          name: "kicker",
          title: "頁首小標籤",
          type: "string",
          description: "例：「關於里歐」。",
        }),
        defineField({
          name: "greeting",
          title: "頁首大標",
          type: "string",
          description: "例：「嗨，我是里歐。」。",
        }),
        defineField({
          name: "storyLabels",
          title: "故事線左欄標籤",
          type: "array",
          description: "依序對應下面每一段自介，例：「我是誰」「2016」「2021」。",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "paragraphs",
          title: "自介內文段落",
          type: "array",
          description: "自介全文，一段一個段落，可拖曳調整順序。",
          of: [defineArrayMember({ type: "text", rows: 4 })],
        }),
        defineField({
          name: "beliefPrefix",
          title: "信念句前導文字",
          type: "string",
          description: "接在信念金句前面的一句話，例：「無論是⋯我相信：」。",
        }),
        defineField({
          name: "beliefLine",
          title: "信念金句（會特別強調色）",
          type: "string",
          description: "例：「法律是底線，專業是標準，友善是品質。」",
        }),
        defineField({
          name: "closing",
          title: "結尾段落",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "hoursNote",
          title: "累計演講時數備註",
          type: "string",
          description: "例：「目前累計 175 小時以上的演講時數。」",
        }),
      ],
    }),
    defineField({
      name: "workExperience",
      title: "工作經歷",
      type: "array",
      group: "resume",
      of: [
        defineArrayMember({
          type: "object",
          name: "workItem",
          fields: [
            defineField({ name: "org", title: "單位／組織名稱", type: "string" }),
            defineField({ name: "role", title: "職稱", type: "string" }),
          ],
          preview: { select: { title: "org", subtitle: "role" } },
        }),
      ],
    }),
    defineField({
      name: "education",
      title: "學歷",
      type: "array",
      group: "resume",
      of: [
        defineArrayMember({
          type: "object",
          name: "educationItem",
          fields: [
            defineField({ name: "school", title: "學校與科系", type: "string" }),
            defineField({ name: "degree", title: "學位", type: "string" }),
          ],
          preview: { select: { title: "school", subtitle: "degree" } },
        }),
      ],
    }),
    defineField({
      name: "publicService",
      title: "公部門服務",
      type: "array",
      description: "每一則是一句完整敘述，例：「新竹市政府性別平等委員 第 4 屆⋯」。",
      group: "resume",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "privateService",
      title: "民間組織服務",
      type: "array",
      group: "resume",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "qualifications",
      title: "專業資格",
      type: "array",
      description: "例：「宜蘭縣政府性別人才資料庫｜專家學者」。",
      group: "resume",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "hostingPublicSector",
      title: "主持經歷－公務機關",
      type: "array",
      description: "「關於我」頁主持經歷兩欄的左欄（公務機關記者會、活動）。",
      group: "resume",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "hostingEntertainment",
      title: "主持經歷－娛樂產業",
      type: "array",
      description: "「關於我」頁主持經歷兩欄的右欄（戲劇、影集見面會等）。",
      group: "resume",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "publishedBook",
      title: "出版專書",
      type: "object",
      group: "resume",
      fields: [
        defineField({ name: "title", title: "書名", type: "string" }),
        defineField({ name: "authors", title: "作者", type: "string" }),
        defineField({ name: "isbn", title: "ISBN", type: "string" }),
      ],
    }),
    defineField({
      name: "policyConsulting",
      title: "政策諮詢與專案顧問",
      type: "array",
      group: "resume",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "papers",
      title: "論文與學術發表",
      type: "array",
      group: "resume",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    prepare() {
      return { title: "關於我內容" };
    },
  },
});
