"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

// 訂閱名單：直接送進 Google 表單（擁有者 vialucaschang@gmail.com，回覆接到試算表），
// 不經網站後端，所以不需要在 Vercel 設任何環境變數。
// 換表單時只要改 FORM_ACTION 與三個 entry 代碼（在表單 viewform 頁的 FB_PUBLIC_LOAD_DATA_ 查得到）。
const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScc_YashDlwF5XrQox3yBUutPGRuOvHAnYojqQIA6F07s-8tw/formResponse";
const ENTRY = {
  email: "entry.1145180789",
  name: "entry.1443144565",
  org: "entry.1507737662",
};

type Status = "idle" | "sending" | "done" | "error";

export default function SubscribeForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = new URLSearchParams({
      [ENTRY.email]: String(data.get("email") ?? "").trim(),
      [ENTRY.name]: String(data.get("name") ?? "").trim(),
      [ENTRY.org]: String(data.get("org") ?? "").trim(),
    });
    setStatus("sending");
    try {
      // Google 表單不回 CORS 標頭，只能用 no-cors 送出；送得出去就視為成功。
      await fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="subscribe">
        <p className="subscribe-done">收到了，謝謝你！有新的講座或電子報，會寄到你的信箱。</p>
      </div>
    );
  }

  return (
    <div className="subscribe">
      <p className="subscribe-title">想收到里歐的新講題與活動消息？</p>
      <p className="subscribe-desc">留下 Email，有新的講座、課程或電子報時，會第一個通知你。</p>
      <form className="subscribe-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email（必填）"
          aria-label="Email（必填）"
          autoComplete="email"
        />
        <input type="text" name="name" placeholder="稱呼" aria-label="稱呼" autoComplete="name" />
        <input
          type="text"
          name="org"
          placeholder="服務單位"
          aria-label="服務單位"
          autoComplete="organization"
        />
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "送出中…" : "訂閱"}
        </button>
      </form>
      {status === "error" && (
        <p className="subscribe-error">送出沒有成功，請稍後再試，或直接來信 {profile.email}。</p>
      )}
      <p className="subscribe-privacy">
        資料只用來寄送里歐的活動與電子報，不會提供給第三方；想退訂或刪除資料，來信 {profile.email} 即可。
      </p>
    </div>
  );
}
