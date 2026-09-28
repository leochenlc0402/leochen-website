// 通用的「Sanity 讀回來的值 vs. src/data 寫死值」合併規則：
// 逐一欄位比對，Sanity 那個欄位是 undefined／null／空字串／空陣列，就用 src/data 的值頂上。
// 這樣即使里歐只填了一部分欄位，其餘欄位還是能顯示原本的內容，網站不會因為漏填而出現空白。
export function mergeWithFallback<T extends Record<string, unknown>>(
  sanityData: Partial<T> | null | undefined,
  fallback: T
): T {
  if (!sanityData) return fallback;
  const result = { ...fallback };
  for (const key of Object.keys(fallback) as (keyof T)[]) {
    const value = sanityData[key];
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    result[key] = value as T[keyof T];
  }
  return result;
}
