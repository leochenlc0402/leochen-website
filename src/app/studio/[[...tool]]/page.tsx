/**
 * Sanity Studio 內嵌路由。整段路由不吃網站的 Header／EndCTA／NoOrphans（見 src/app/layout.tsx
 * 與 src/app/(site)/layout.tsx 的拆分），也標記 noindex、不進 sitemap.ts（見 robots.ts 的 disallow）。
 * https://github.com/sanity-io/next-sanity
 */
import type { Metadata } from "next";
import StudioClient from "./StudioClient";

export const metadata: Metadata = {
  title: { absolute: "後台管理" },
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioClient />;
}
