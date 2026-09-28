import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// 統一的讀取包裝：60 秒 ISR，失敗時回傳 null（呼叫端一律要接 null 並退回 src/data 寫死值，
// 讓網站絕對不會因為 Sanity 讀不到或欄位空白而壞掉）。
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (err) {
    console.error("sanityFetch failed (falling back to src/data):", err);
    return null;
  }
}
