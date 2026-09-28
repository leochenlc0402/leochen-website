import { type SchemaTypeDefinition } from "sanity";

import { siteProfile } from "./siteProfile";
import { homepage } from "./homepage";
import { about } from "./about";
import { topics } from "./topics";
import { speaking } from "./speaking";
import { media } from "./media";
import { clients } from "./clients";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteProfile, homepage, about, topics, speaking, media, clients],
};

// singleton 文件的 type 名稱清單，structure.ts 與 studio deskStructure 都靠這份清單
// 擋掉「新增文件」入口，確保每種文件永遠只有一份。
export const singletonTypes = new Set([
  "siteProfile",
  "homepage",
  "about",
  "topics",
  "speaking",
  "media",
  "clients",
]);
