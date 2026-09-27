"use client";

import { useEffect } from "react";

// 避免段落最後一行只剩一個字（創晃 2026-09-27 規則）。
// 支援 CSS `text-wrap: pretty` 的瀏覽器由 globals.css 處理；不支援的瀏覽器（較舊的 Safari 等）
// 才在這裡把每段最後兩個字（連同句尾標點）包成不換行，讓最後一行至少兩個字。
// 網址加 ?noorphan=force 可在支援的瀏覽器上強制啟用，方便測試。
const SELECTOR = "main p, main li, main dd, main dt, main h1, main h2, main h3, main h4";
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
  useEffect(() => {
    const force = new URLSearchParams(window.location.search).get("noorphan") === "force";
    if (!force && CSS.supports("text-wrap", "pretty")) return;
    document.querySelectorAll(SELECTOR).forEach(fixElement);
  }, []);
  return null;
}
