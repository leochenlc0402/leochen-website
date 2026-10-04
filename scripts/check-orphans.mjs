// 防單字成行檢查：八種寬度 × 四頁，找出最後一行只剩一個字（不含標點）的段落。
// 用法：先 `npm run build && npx next start -p 3211`，再 `node scripts/check-orphans.mjs`。
// 需要 playwright（可借用 /Users/zhangchuanghuang/lucas_agent/lucas-website/node_modules/playwright）。
const PW = process.env.PLAYWRIGHT_PATH || "/Users/zhangchuanghuang/lucas_agent/lucas-website/node_modules/playwright/index.mjs";
const { chromium } = await import(PW);
const BASE = process.env.BASE_URL || "http://localhost:3211";
const pages = ["", "about", "speaking", "media"];
const widths = [360, 390, 430, 768, 1024, 1280, 1440, 1920];
const found = [];
const b = await chromium.launch();
for (const w of widths) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  for (const pg of pages) {
    await p.goto(`${BASE}/${pg}`, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    const r = await p.evaluate(() => {
      const out = [];
      const punct = /[\s，。、：；！？「」『』（）()《》〈〉／・·,.:;!?\-–—→]/;
      for (const el of document.querySelectorAll("h1,h2,h3,h4,p,li,dt,dd,a")) {
        if (el.closest(".rows")) continue; // 跑馬燈不換行
        const text = el.innerText.trim();
        if (text.length < 4) continue;
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const chars = [];
        let n;
        while ((n = walker.nextNode())) {
          for (let i = 0; i < n.length; i++) {
            const ch = n.data[i];
            if (!ch.trim()) continue;
            const rg = document.createRange();
            rg.setStart(n, i);
            rg.setEnd(n, i + 1);
            const rects = rg.getClientRects();
            if (rects.length) chars.push([ch, Math.round(rects[0].top)]);
          }
        }
        if (!chars.length) continue;
        const tops = [...new Set(chars.map((c) => c[1]))].sort((a, b) => a - b);
        const lines = [];
        for (const t of tops) if (!lines.length || t - lines[lines.length - 1] > 6) lines.push(t);
        if (lines.length < 2) continue;
        const last = lines[lines.length - 1];
        const lastChars = chars.filter((c) => c[1] >= last - 6).map((c) => c[0]);
        if (lastChars.filter((c) => !punct.test(c)).length <= 1)
          out.push(`${el.tagName.toLowerCase()}「${text.slice(0, 24)}」最後一行：${lastChars.join("")}`);
      }
      return out;
    });
    for (const x of r) found.push(`${w}px /${pg} ${x}`);
  }
  await p.close();
}
await b.close();
console.log(found.length ? found.join("\n") : "NO ORPHANS");
