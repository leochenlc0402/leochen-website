"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// 避免段落最後一行只剩一個字（創晃 2026-09-27 規則）。
// 一律在這裡把每段最後兩個字（連同句尾標點）包成不換行，讓最後一行至少兩個字。
// 2026-09-28：Safari 雖然回報支援 `text-wrap: pretty`，中文段落仍會落單一字（首頁信念句實測），
// 所以不再依瀏覽器支援度跳過，所有瀏覽器都跑。
const SELECTOR = "main p, main li, main dd, main dt, main h1, main h2, main h3, main h4, footer p, footer h2";
const PUNCT = /[\s，。、：；！？「」『』（）()《》〈〉／・·,.:;!?\-–—→]/;

function fixElement(el: Element) {
  if (el.closest(".rows") || el.querySelector("[data-no-orphan]")) return;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let last: Text | null = null;
  let n: Node | null;
  while ((n = walker.nextNode())) if ((n as Text).data.trim()) last = n as Text;
  if (!last) return;
  const data = last.data.replace(/\s+$/, "");
  let i = data.length;
  while (i > 0 && PUNCT.test(data[i - 1])) i--; // 句尾標點
  let real = 0;
  while (i > 0 && real < 2) {
    if (!PUNCT.test(data[i - 1])) real++;
    i--;
  }
  if (real < 2 || i <= 0) return;
  const tail = data.slice(i);
  const span = document.createElement("span");
  span.setAttribute("data-no-orphan", "");
  span.style.whiteSpace = "nowrap";
  span.textContent = tail;
  last.data = data.slice(0, i);
  last.after(span);
}

export default function NoOrphans() {
  const pathname = usePathname();
  useEffect(() => {
    // 站內換頁時版面外框不會重新掛載，所以跟著網址重跑；等新頁面畫完再處理。
    const id = requestAnimationFrame(() => document.querySelectorAll(SELECTOR).forEach(fixElement));
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}
