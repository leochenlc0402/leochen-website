import { defineArrayMember, defineField, defineType } from "sanity";

// 演講邀約（singleton）。對應 src/data/speaking.ts。
export const speaking = defineType({
  name: "speaking",
  title: "演講邀約",
  type: "document",
  groups: [
    { name: "inquiry", title: "邀約說明" },
    { name: "fees", title: "費用" },
    { name: "formats", title: "合作方式" },
  ],
  fields: [
    defineField({
      name: "email",
      title: "邀約信箱",
      type: "string",
      description: "同基本資料的聯絡信箱，這裡可單獨改（例如想換一個邀約專用信箱）。",
      group: "inquiry",
    }),
    defineField({
      name: "inquiryIntro",
      title: "邀約開場句",
      type: "text",
      rows: 2,
      description: "例：「若有演講、講座⋯歡迎來信至 ⋯」",
      group: "inquiry",
    }),
    defineField({
      name: "inquiryNote",
      title: "來信七項說明前導句",
      type: "string",
      group: "inquiry",
    }),
    defineField({
      name: "inquiryFields",
      title: "來信請附資訊（清單）",
      type: "array",
      description: "例：「活動主題與分享內容」，每則一項，可拖曳調整順序。",
      of: [defineArrayMember({ type: "string" })],
      group: "inquiry",
    }),
    defineField({
      name: "emailChannelNote",
      title: "為何用 Email 聯繫的說明",
      type: "text",
      rows: 2,
      group: "inquiry",
    }),
    defineField({
      name: "replyNote",
      title: "回覆時間說明",
      type: "text",
      rows: 2,
      group: "inquiry",
    }),
    defineField({
      name: "feeIntro",
      title: "費用說明開場句",
      type: "text",
      rows: 3,
      group: "fees",
    }),
    defineField({
      name: "publicSectorFees",
      title: "公務機關／學校費用（每則一行）",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "fees",
    }),
    defineField({
      name: "corporateFeeNote",
      title: "企業／民間機構費用說明",
      type: "text",
      rows: 2,
      group: "fees",
    }),
    defineField({
      name: "transportFees",
      title: "交通費說明（每則一行）",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "fees",
    }),
    defineField({
      name: "formats",
      title: "合作形式",
      type: "array",
      description: "首頁「合作方式」卡片與演講邀約頁完整版共用這份清單。",
      group: "formats",
      of: [
        defineArrayMember({
          type: "object",
          name: "formatItem",
          fields: [
            defineField({ name: "title", title: "形式名稱", type: "string", description: "例：「講座／演講」。" }),
            defineField({
              name: "homeLine",
              title: "首頁卡片說明句",
              type: "string",
              description: "首頁「合作方式」卡片顯示的精簡說明。",
            }),
            defineField({
              name: "homeDuration",
              title: "首頁卡片時長標籤",
              type: "string",
              description: "例：「1–3 小時」。",
            }),
            defineField({
              name: "fields",
              title: "演講邀約頁完整欄位",
              type: "array",
              description: "演講邀約頁「合作方式」完整版的欄位，例：「講題名稱：詳見⋯」。",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "formatField",
                  fields: [
                    defineField({ name: "label", title: "欄位名稱", type: "string" }),
                    defineField({ name: "value", title: "欄位內容", type: "text", rows: 2 }),
                  ],
                  preview: { select: { title: "label", subtitle: "value" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "title", subtitle: "homeDuration" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "演講邀約內容" };
    },
  },
});
