import { defineArrayMember, defineField, defineType } from "sanity";

// 合作單位（singleton）。對應 src/data/clients.ts。
export const clients = defineType({
  name: "clients",
  title: "合作單位",
  type: "document",
  groups: [
    { name: "lists", title: "單位名單" },
    { name: "referral", title: "回頭再邀" },
  ],
  fields: [
    defineField({
      name: "corporateClients",
      title: "企業合作單位",
      type: "array",
      description: "每則一個單位名稱，會用「、」串成一整句顯示。",
      group: "lists",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "governmentClients",
      title: "政府合作單位",
      type: "array",
      group: "lists",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "schoolClients",
      title: "學校合作單位",
      type: "array",
      group: "lists",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "ngoClients",
      title: "NGO 合作單位",
      type: "array",
      group: "lists",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "clientsSummaryLine",
      title: "「還有⋯等 80 多個單位」摘要句",
      type: "string",
      description:
        "首頁與關於頁用的合作單位摘要句，例：「還有 Dell、Deloitte 勤業眾信⋯等 80 多個單位。」——句尾數字建議跟單位總數對得上，但不會自動計算，改名單後記得順手調整這句話。",
      group: "lists",
    }),
    defineField({
      name: "cityLogos",
      title: "回頭再邀縣市政府 Logo 牆",
      type: "array",
      description: "首頁與演講邀約頁「謝謝這些單位的邀請」區塊的縣市政府 Logo，可拖曳調整順序。",
      group: "referral",
      of: [
        defineArrayMember({
          type: "object",
          name: "cityLogo",
          fields: [
            defineField({ name: "name", title: "縣市政府名稱", type: "string", description: "例：「臺北市政府」，也會當作圖片的替代文字。" }),
            defineField({ name: "image", title: "Logo 圖片", type: "image" }),
          ],
          preview: { select: { title: "name", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "referralCount",
      title: "回頭再邀數字",
      type: "object",
      group: "referral",
      fields: [
        defineField({ name: "number", title: "數字", type: "string", description: "例：「10」。" }),
        defineField({ name: "suffix", title: "數字後綴", type: "string", description: "例：「+」。" }),
      ],
    }),
    defineField({
      name: "referralLeadLines",
      title: "回頭再邀說明句",
      type: "array",
      description: "大數字旁邊的說明句，例：「個單位，再次邀約第二場的延續——」。",
      group: "referral",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "referralNote",
      title: "回頭再邀小字備註",
      type: "string",
      description: "例：「承辦聽完覺得讚，回去用自己單位的名義再邀一場」。",
      group: "referral",
    }),
  ],
  preview: {
    prepare() {
      return { title: "合作單位內容" };
    },
  },
});
