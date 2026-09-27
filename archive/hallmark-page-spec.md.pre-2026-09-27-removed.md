# 頁面規格（依 design.md，逐頁的元素預算）— 2026-09-26

規則：**寫在這裡的才做，沒寫的不做。** 每頁區塊數與元素數是上限。

## `/` 首頁 — Marquee Hero
1. **首屏**：只放主張句 `<h1>`，兩行：「性別平等，可以很重要，」／「也可以很好玩。」display 字級，左靠，佔滿首屏約 70% 高度（不用 100vh）。第二行用 accent 色 **不換字體**。首屏右下角一行小字（WenKai、muted）：「陳荐宏 Leo Chen · 性平講師 × 社群媒體創作者」。**首屏沒有按鈕、沒有圖、沒有副標。**
2. 首屏下方一條 2px 粗線（`--color-ink`），全站唯一的線。
3. **自介段**（內文欄 34em）：一段文字，兩句話，開頭是「（待里歐提供：兩句話講你是誰、為什麼做性平教育）」占位；段落下方一行 WenKai accent：「把法定必修，講成大家想聽的那一堂。」（這是口語聲道，不是標題）。
4. **三個數字**：一行純文字，不是格子：`80+ 場演講　·　4.8／5 正向回饋　·　83 個政府、學校與企業單位`，數字用 display 面 `--text-2xl`、tabular-nums，標籤用 body。一行放不下就自然換行，不做 grid。
5. **一句聽眾的話**：T1 pull quote — 「整場沒睡點！」set `--text-2xl` display，允許跨出內文欄到 52rem；下方小字「（單位待補）」；旁邊（桌機在右側邊欄、手機在下方）用 WenKai accent 兩句：「講話很幽默、有梗。」「性別議題可以很重要，也可以很好玩。」不加引號框、不加大引號符號。
6. **講題**：雙聲道標題（Serif「四個講題」／WenKai「挑你要的，深淺我來調」），下面四行純文字列，每行：講題名 ＋ 右側 C3 連結「看內容 →」到 `/speaking#topic-n`。行與行之間只用留白，不畫線。
7. **邀請過的單位**：雙聲道標題（「他們請過我」／「政府、學校、企業都有」），下面是**一段散文**：「企業：Dell、Deloitte 勤業眾信、Uber⋯⋯」四類各一段，用全形頓號連接，全列不折疊。字級 `--text-sm`、muted。
8. **一張照片**：一個 `<figure>` 16:7，跨出到 52rem，目前灰底＋小字「授課現場照片，待補」；有照片後直接換圖。
9. Footer Ft6（共用）。
**首頁到此為止。沒有痛點段、沒有身份卡、沒有怎麼合作、沒有 CTA 帶。**

## `/about` — Letter
1. 開場（無標題）：WenKai accent 一行「你好，我是里歐。」然後內文段落：「（待里歐提供：為什麼做性平教育，300 字，第一人稱）」。
2. 一行小字：「目前累計 175 小時以上的演講時數。」
3. **履歷**：每一段用雙聲道標題（工作經歷／學歷／公部門服務／民間組織／專業資格／出版與研究），內容用 F3 規格表：每列 `dt`（年份或單位）＋`dd`（職稱或內容），列之間 1px `--color-rule` hairline，這是本站唯一允許畫線的地方。主持經歷資料為空就不出現。
4. 署名：WenKai「陳荐宏 Leo Chen」。
5. Footer。

## `/speaking` — Long Document
1. 標題雙聲道：「演講與分享邀約」／「來信就好，我會照活動安排回你」。
2. 內文段落（照 PDF 原文）：邀約說明＋「來信時可以提供以下資訊」七項，用一般 `<ul>`，不畫框。
3. C3 連結：「寫信給我 → leochenlc0402@gmail.com」（mailto，主旨預填「演講邀約｜〔單位名稱〕」）。
4. 雙聲道：「費用怎麼算」／「一次講清楚」；內容用 F3 兩欄表（公務機關／企業／交通費），hairline。
5. 雙聲道：「四個講題」／「挑你要的，深淺我來調」；每個講題是一個 `<section id="topic-n">`：講題名（`--text-lg` serif）→ 一行「適合對象／建議時長／形式：（待里歐提供）　對應時數：性別主流化 2 小時（等）」→ 子題用**一段散文**以頓號連接，不用 bullet。講題之間用 `--space-2xl` 留白，不畫線、不做卡片、不放簡報封面占位。
6. 雙聲道：「謝謝這些單位的邀請」／「政府、學校、企業都有」；四類散文段落同首頁。
7. Footer。

## `/media` — Index-First
1. 標題雙聲道：「作品與報導」／「銀獎那支排第一」。
2. 影音：兩支 YouTube 用 16:9 iframe（lazy），每支上方一行片名（serif `--text-lg`）＋一行說明；銀獎標註用純文字「113 年度勞動人權短片徵選比賽 銀獎」，不加星號、不加 badge。
3. 媒體報導：一個 `<ol>`，每項一行：媒體名（muted small）／標題（C3 連結）／日期（tabular）；項與項之間留白，不畫線。
4. Podcast：一段文字＋C3 連結。
5. Footer。

## 共用
- Nav N1a：字標左（serif `--text-lg`）、右側三連結（body `--text-sm`，1px 底線 hover 出現 accent）。`padding-block: var(--space-lg)`。不 sticky。
- Footer Ft6：`padding-block: var(--space-4xl) var(--space-2xl)`；第一行 WenKai accent「有演講、講座或課程的邀請，寫信給我 → leochenlc0402@gmail.com」；第二行 `--text-sm` muted：Fufuknows · 心靈處方籤 Podcast · © 2026 陳荐宏 Leo Chen。
- 全站只有淺色。移除 next-themes、ThemeToggle、dark: class、Marquee、Placeholder 圓形圖示、Section 的 tone 深底、所有 `border`（除 F3 hairline）、所有 `rounded`、所有 `shadow`。
- tokens 放 `src/app/tokens.css`（`:root` OKLCH），globals.css `@import` 它；Tailwind 只用 spacing utility 與版面，顏色一律 `var(--color-*)`（可用 arbitrary value `text-[var(--color-ink)]` 或在 tailwind config 映射 token）。
- 字型：`next/font/google` 載 Noto_Serif_TC(600)、Noto_Sans_TC(400)、LXGW_WenKai_TC(400)；三個 CSS 變數 `--font-display / --font-body / --font-voice`。
- 手機 375px：display 字級靠 clamp 下限；三數字自然換行；引言不出格；nav 三連結留在同一列（字小一點也要一列）。
