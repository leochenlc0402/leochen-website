import { defineArrayMember, defineField, defineType } from "sanity";

// 講題（singleton）。對應 src/data/topics.ts。
// 四個演講主題，首頁與演講邀約頁共用同一份資料（首頁顯示精簡版、演講邀約頁顯示完整版）。
export const topics = defineType({
  name: "topics",
  title: "講題",
  type: "document",
  fields: [
    defineField({
      name: "topics",
      title: "四個講題",
      type: "array",
      description: "可拖曳調整順序，順序會同時影響首頁與演講邀約頁的排列。",
      of: [
        defineArrayMember({
          type: "object",
          name: "topicItem",
          fields: [
            defineField({
              name: "no",
              title: "編號",
              type: "string",
              description: "例：「①」「②」，純粹是編號用的符號，不是流水號。",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "講題名稱",
              type: "string",
              description: "例：「性別平等與 CEDAW」，會同時顯示在首頁卡片與演講邀約頁。",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "fit",
              title: "適合場合（首頁卡片副標）",
              type: "string",
              description: "例：「對應公務員年度性別主流化時數」。",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "homeSummary",
              title: "首頁卡片內文（精簡版）",
              type: "text",
              rows: 3,
              description: "首頁卡片用的精簡摘要，用頓號或逗號連接子題目。",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtopics",
              title: "完整子題目清單（演講邀約頁用）",
              type: "array",
              description: "演講邀約頁會把這些子題目用「、」串成一長句。",
              of: [defineArrayMember({ type: "string" })],
              validation: (Rule) => Rule.min(1),
            }),
            defineField({
              name: "legalHours",
              title: "對應法定時數",
              type: "string",
              description: "例：「性別主流化 2 小時」。",
            }),
            defineField({
              name: "homeCoverImages",
              title: "首頁示意圖（兩張）",
              type: "array",
              description: "首頁卡片右側的兩張示意圖。",
              of: [
                defineArrayMember({
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
              validation: (Rule) => Rule.length(2),
            }),
            defineField({
              name: "coverPairs",
              title: "演講邀約頁簡報封面組",
              type: "array",
              description:
                "演講邀約頁完整版的簡報封面＋內頁縮圖，一組是「一張封面＋一張內頁」，可拖曳調整幾組的順序。",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "coverPair",
                  fields: [
                    defineField({
                      name: "cover",
                      title: "簡報封面",
                      type: "image",
                      options: { hotspot: true },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "inner",
                      title: "簡報內頁",
                      type: "image",
                      options: { hotspot: true },
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: { media: "cover" },
                    prepare({ media }) {
                      return { title: "封面＋內頁一組", media };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "no", media: "homeCoverImages.0" },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: "四個講題" };
    },
  },
});
