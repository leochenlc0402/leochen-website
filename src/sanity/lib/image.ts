import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

// Sanity image 型別（帶 hotspot）。前端頁面用這個型別接 Sanity 讀回來的圖片欄位。
export type SanityImageWithHotspot = {
  asset?: { _ref?: string; _id?: string; url?: string };
  hotspot?: { x: number; y: number };
} | null | undefined;

/**
 * 算 object-position：有 hotspot 就用 hotspot 换算成百分比，
 * 沒有 hotspot（或圖片是空的、還沒在 Sanity 設定）就用呼叫端傳入的寫死百分比 fallback。
 * fallback 格式例："50% 20%" 或只給 x 用 fallbackXPercent。
 */
export function objectPositionFromHotspot(
  image: SanityImageWithHotspot,
  fallback: string
): string {
  if (image?.hotspot) {
    const x = Math.round(image.hotspot.x * 100);
    const y = Math.round(image.hotspot.y * 100);
    return `${x}% ${y}%`;
  }
  return fallback;
}

/**
 * 決定一張圖最終要用的 src 與 object-position：
 * Sanity 有上傳圖片就用 Sanity 的圖＋(有 hotspot 用 hotspot／沒有用 fallbackPosition)；
 * Sanity 沒有圖（還沒在後台設定，或讀取失敗）就整個退回 public/images 的寫死路徑與位置。
 */
export function resolveImage(
  image: SanityImageWithHotspot,
  fallbackSrc: string,
  fallbackPosition: string = "50% 50%"
): { src: string; objectPosition: string } {
  if (image?.asset?.url) {
    return {
      src: image.asset.url,
      objectPosition: objectPositionFromHotspot(image, fallbackPosition),
    };
  }
  return { src: fallbackSrc, objectPosition: fallbackPosition };
}
