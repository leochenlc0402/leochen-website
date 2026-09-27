# Design — 陳荐宏 Leo Chen 講師站

真本狀態：**定稿版（2026-09-27）**。首頁已出靜態稿給客戶看過、客戶說 OK
（`outputs/leo-website/mockups/final-home.html`，截圖對照 `final-home-desktop.png`／
`final-home-mobile.png`）。這份 design.md 是把那份定稿轉成可維護的規則說明，
**不是另一套設計**——改版面先看 final-home.html 長什麼樣，design.md 只是把它寫下來。
舊的極簡海軍藍／雙聲道-only 版本（`archive/design.md.pre-2026-09-27-rewrite.md`）已作廢。

## Genre

editorial（個人、內容主導），但比舊版更有溫度、更有色彩層次——不是純黑白排印，
是「印刷講義＋手寫補充」的質感。

## 色票（里歐指定，2026-09-27）

| token | 值 | 用途 |
|---|---|---|
| `--color-paper` | `#F6F1E8` | 主背景（暖米白） |
| `--color-paper-2` | `#EFE8DB` | 次背景（回頭再邀／合作單位牆） |
| `--color-teal` | `#2D7188` | 主色湖水藍（數字、講題 fit 行、chain 大數字） |
| `--color-navy` | `#17364D` | 墨藍——當「墨」用，不是點綴。首屏、頁首、信念段、收尾都是這底色 |
| `--color-coral` | `#E56B45` | 強調珊瑚橘（按鈕、hero「好玩」二字、淺底 note） |
| `--color-gold` | `#C8A45D` | 點綴金（navy 底的 note／byline／次要連結底線） |
| `--color-ink-2` | `#3d5566` | 內文次色 |
| `--color-muted` | `#6b7c86` | 弱化文字（日期、單位待補、小字說明） |
| `--color-rule` | `#e2d9c8` | hairline 分隔線 |

雙色慣例：**同一個「口語聲道」在淺底用 coral、在 navy 底用 gold**
（`.note` / `.navy .note`，見 `globals.css`）。不要在淺底用 gold（對比不足）。

## Typography

`next/font/google` 三套字，掛成 `--font-serif` / `--font-sans` / `--font-voice`：

- `Noto Serif TC`（700、900）→ `--font-serif`：所有標題、hero 主張句、big number。
- `Noto Sans TC`（400、500）→ `--font-sans`：全站內文，body 預設字型。
- `LXGW WenKai TC`（400）→ `--font-voice`：只給「里歐自己補一句」的角色——
  雙聲道標題下面那行口語註、hero byline、信念段 note、收尾 mail 行的強調字。

## 標題系統：雙聲道

上行 `Noto Serif TC` 700（`.h2`）＋下行 `LXGW WenKai TC`（`.note`，coral／navy 底 gold）。
用 `<Heading formal="正式標題" casual="口語一句" />`（`src/components/Heading.tsx`）。
不疊加底線、編號或圖示。頁首區用同一套但字級更大（`.page-head .h2` 46px）。

## Layout

- 頁容器 `.wrap`：`max-width:1200px; padding:0 40px`（手機 20px）。
- 區塊垂直節奏 `--sec`：桌機 112px、手機 72px（`tokens.css` 依 media query 覆寫）。
- 墨藍色帶（`.navy`）只用在：**各頁頂部（導覽＋頁首）、信念句、全站共用收尾**。
  其他區塊一律淺底（paper／paper-2）。
- 分隔：淺底大區塊用留白；需要逐列分隔的地方（履歷、費用、合作形式、講題）用
  1px `--color-rule` hairline（`.spec-row` / `.fmt` / `.topic` / `.chain`）。

## 按鈕（只有兩種）

1. **主要**：`.btn` 珊瑚橘實心、`color:paper`、`border-radius:3px`、`padding:15px 30px`。
2. **次要**：文字＋底線。navy 底用 `.link`（金色底線）；淺底用 `.link-ink`（墨藍底線，
   金色在暖米白背景上對比不足，改用墨藍）。
3. 純文字連結（媒體報導標題、Podcast 連結）用 `.link-ink`，不套 `.btn`。

## 共用元件

### 頁首（Header，`src/components/Header.tsx`，全站每頁都有）

墨藍底，左字標「陳荐宏 Leo Chen」（`.mark`，宋體），右側 `關於／講題／作品與報導／邀請演講`
（最後一個金色底線）。手機收成「選單」按鈕，展開全寬清單（client component，`useState` 控制）。
和各頁自己的「首屏／頁首區」背景色相同，視覺上無縫接軌成一整塊墨藍。

### 收尾（EndCTA，`src/components/EndCTA.tsx`，放在 `layout.tsx`，全站共用)

墨藍底：「下一場性平課，交給里歐。」＋ mail 行＋ `.btn` 寫信邀請＋ `.link` 看費用說明＋
頁尾一行（© 年份＋ Fufuknows · Podcast）。四頁都自動接到同一份，不在個別頁面重複寫。

## 動態

只有「台下怎麼說」跑馬燈：兩排反方向，CSS `animation`（58s／64s，`linear infinite`），
內容自我複製一次讓 `translateX(-50%)` 無縫循環。`.rows:hover .row` 暫停。
`prefers-reduced-motion: reduce` 時 `.row{animation:none}`。除此之外全站沒有進場動畫、
沒有 hover 位移，只有連結顏色／底線的 150ms 過渡。

## Macrostructure（逐頁）

- `/`（首頁）：九段一比一照 `final-home.html`——首屏（navy hero）／數據＋照片條／
  台下怎麼說（跑馬燈）／為什麼是他（三張身份卡）／信念（navy）／四個講題／
  可以怎麼請他／回頭再邀＋合作單位／收尾（共用）。
- `/about`：Letter——navy 頁首（金色小字＋大標＋右側形象照）→ 自介全文逐字（信念句
  coral 強調）→ 履歷各段用 hairline 列表（工作經歷／學歷／公部門服務／民間組織／
  專業資格／主持經歷兩欄／出版與研究）。
- `/speaking`：Long Document——navy 頁首＋ mail 按鈕 → 邀約說明與來信七項 → `#fees`
  費用說明（hairline 兩欄）→ `#topics` 四個講題完整版（子題全列＋簡報封面／內頁成對）
  → 五種合作形式（逐字，含曾經合作）→ `#clients` 合作單位（縣市 logo 牆＋四類全名單）。
- `/media`：Index-First——navy 頁首 → 兩支 YouTube（銀獎第一）→ 媒體報導（新到舊）→
  Podcast。

## 圖片資產

- `public/images/`：首頁與關於頁用圖，直接沿用 `outputs/leo-website/mockups/img/` 的
  英文檔名（`jacket-wall.jpg`、`committee.jpg`、`cover-*.jpg` 等）。
- `public/images/logo-<city>.png`：8 個縣市政府 logo，中文檔名已改英文
  （taipei／hsinchu-city／yilan／changhua／yunlin／chiayi／tainan／kaohsiung）。
- `public/images/covers/<slug>-cover.jpg` ／ `<slug>-inner.jpg`：/speaking 講題完整版
  的簡報封面＋內頁，原始檔在 `outputs/leo-website/photos-raw/covers/`（中文檔名），
  已用 `sips` 縮到 1600px 寬並轉存英文檔名 jpg。slug 對照見 `src/data/topics.ts`
  的 `coverSlugs` 註解。
- 全部用 `next/image`；需要 `fill` 的容器（`.portrait`／`.ph`／`.strip-img`／
  `.cover-img`／`.logo-img`）在 `globals.css` 已設 `position:relative` ＋ 固定
  比例／尺寸。首屏形象照與 about 頁形象照帶 `priority`。

## Copy

禁用詞與句型照 `lucas_agent/brand_voice.md`。逐字段落（自介、合作形式、來信七項、
費用說明）標明來源見對應 `src/data/*.ts` 檔頭註解，不得改寫或新增里歐的事實。
引號只用在逐字引用的聽眾回饋（`src/data/testimonials.ts`）。

## 預覽部署

`layout.tsx` 的 `metadata.robots` 依 `process.env.NEXT_PUBLIC_NOINDEX === "1"` 決定要不要
加 `{index:false, follow:false}`。正式網域上線前拿掉這個環境變數即可，不用改程式碼。
