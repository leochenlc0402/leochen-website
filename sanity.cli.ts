/**
 * 讓 `npx sanity [command]`（例如 `sanity assets upload`）在這個資料夾能找到專案設定。
 * https://www.sanity.io/docs/cli
 */
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "7v4x71gf",
    dataset: "production",
  },
});
