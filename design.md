# Design — 陳荐宏 Leo Chen 講師站

依 hallmark（`lucas_agent/.agents/skills/hallmark`）多頁流程鎖定的設計系統。每一頁動工前先讀本檔；要變動就改本檔，不准在頁面裡各自即興。
參考節奏：destroytoday.com（一欄、窄量尺、一屏一件事、大量留白、零卡片）。

## Genre
editorial（個人、內容主導）。

## 一句話原則
**每一屏只做一件事。** 元素能拿掉就拿掉；靠字級、字體、留白做層級，不靠框線、色帶、圖示、陰影。

## Macrostructure family
- `/`（首頁）：**Marquee Hero** — 主張句填滿首屏、無副標無按鈕；粗線分隔後變成一欄敘事。
- `/about`：**Letter** — 第一人稱信件式開場，之後履歷用 F3 規格表（hairline 列）。
- `/speaking`：**Long Document** — 連續散文＋F3 表（費用）＋講題列。
- `/media`：**Index-First** — 條列即設計。

## Theme（custom，錨定海軍藍；暖色只當高亮）
- `--color-paper`     oklch(97.5% 0.006 250)   冷白（不是奶油色）
- `--color-paper-2`   oklch(94.5% 0.008 250)
- `--color-rule`      oklch(85% 0.010 250)
- `--color-muted`     oklch(48% 0.030 255)
- `--color-ink-2`     oklch(34% 0.045 255)
- `--color-ink`       oklch(24% 0.055 255)     海軍藍是「墨」，不是點綴
- `--color-accent`    oklch(52% 0.120 60)      暖赭（口語聲道、連結底線、焦點）
- `--color-accent-ink` oklch(97.5% 0.006 250)
- `--color-focus`     oklch(52% 0.120 60)
- 累計 accent 面積每屏 ≤ 3%（首屏主張句只把「好玩」兩字上 accent，其餘墨色）。無深色帶、無深色模式（單一淺色版）。

## Typography（2+1）
- Display：`Noto Serif TC` 600，tracking -0.01em，行高 1.1
- Body：`Noto Sans TC` 400，16–17px，行高 1.7，量尺 `max-width: 34em`（中文約 34 字）
- Outlier：`LXGW WenKai TC` 400 — **只給「里歐自己補一句」這一個角色**：區塊標題下的口語註、首屏角落的自介一行、首頁副標、關於頁開場與署名、頁尾那句邀請。**別人的話（聽眾回饋）不用它**，那是里歐的筆跡，不是拿來抄別人誇他的話。
- 字級只用五級：display `clamp(2.25rem, 1.5rem + 4.9vw, 6rem)`、`--text-2xl 2.25rem`、`--text-lg 1.375rem`、`--text-base 1.0625rem`、`--text-sm 0.875rem`。
- 中文標題不加粗到 700 以上；口語聲道永遠 400。

## Signature：雙聲道
上行印刷體（Noto Serif TC）＋下行手寫感楷體（WenKai）用 accent 色，像印好的講義旁邊有人用筆補了一句。全站一致，只此一招；沒有 kicker、沒有編號、沒有豎線、沒有底線。

## Spacing
4pt 命名尺：`--space-xs 8 · sm 12 · md 16 · lg 24 · xl 40 · 2xl 64 · 3xl 96 · 4xl 144`。區塊間距 `--space-3xl`～`4xl`，區塊內 `lg`～`xl`。留白刻意不等距：首屏後收緊、引言段放寬。

## Layout
- 頁容器 `max-width: 68rem`，內文欄 `max-width: 34em` 左靠，不置中。
- 主軸左偏；每頁允許一個出格元素（引言或圖片可跨出內文欄到 `52rem`）。
- 禁：卡片、框線容器、三等欄、深淺色帶交替、圖示、陰影、毛玻璃、跑馬燈、圓角頭像占位。
- 分隔：只用留白；首屏下方一條 2px 粗線是全站唯一的裝飾線，F3 規格表列間的 1px hairline 是唯一的結構線。

## Nav / Footer
- Nav：N1a 極簡 — 字標「陳荐宏 Leo Chen」硬靠左（display 面），右側三個純文字連結（關於 · 演講邀約 · 作品與報導），無按鈕、無底線、無 sticky、無毛玻璃；hover 只變色。375px 以下允許字標 0.95rem、連結 0.75rem 兩個例外字級，讓三連結留在同一列。
- Footer：Ft6 Letter close — 一句話收尾「有演講、講座或課程的邀請，寫信給我 → leochenlc0402@gmail.com」＋ 下一行小字：Fufuknows · Podcast · © 2026 陳荐宏。

## CTA voice
只有一種：C3 排印連結（文字＋→＋1px 底線同字色，hover 字與底線都變 accent，`:active` 回墨色，`:focus-visible` 2px accent 外框）。箭頭一律放句尾「⋯ →」。全站沒有實心按鈕。

## Motion
無進場動畫。只有連結 hover 底線變色 150ms `--ease-out`。`prefers-reduced-motion` 自然通過。

## Copy
禁用詞與句型照 `lucas_agent/brand_voice.md`。任何里歐未提供的事實一律占位「（待里歐提供：＿）」，不得編。引號只用在逐字引用的聽眾回饋。
