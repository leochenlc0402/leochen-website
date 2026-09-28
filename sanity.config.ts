import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "leo-website",
  title: "陳荐宏 Leo Chen 官網後台",
  projectId,
  dataset,
  apiVersion,
  basePath: "/studio",
  schema,
  plugins: [structureTool({ structure })],
});
