import type { StructureResolver } from "sanity/structure";

// 側欄固定列出七個頁面分組，每個都是唯一一份的 singleton 文件，
// 不提供「新增文件」的入口，避免非技術用戶不小心建出第二份同類型文件。
const singletonItems: { id: string; title: string }[] = [
  { id: "siteProfile", title: "基本資料" },
  { id: "homepage", title: "首頁" },
  { id: "about", title: "關於我" },
  { id: "topics", title: "講題" },
  { id: "speaking", title: "演講邀約" },
  { id: "media", title: "作品與報導" },
  { id: "clients", title: "合作單位" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("網站內容")
    .items(
      singletonItems.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(id).documentId(id).title(title))
      )
    );
