"use client";

import { useEffect, useRef, useState } from "react";

// 首頁四格數據的跑動動畫：捲到畫面內時從 0 跑到目標值，約 1.2 秒 ease-out。
// 伺服器端與尚未觸發前一律顯示最終值（s.value），沒 JS／SEO 爬蟲看到的都是正確數字，
// 版面也不會因為初始值是 0 而跳動；只有進入視窗那一刻才用 JS 把它「跑」起來。
// prefers-reduced-motion 時直接維持最終值，不跑動畫。

type StatCounterProps = {
  value: string; // 例如 "80+"、"175+"、"4.8"、"292K"
  suffix?: string; // 數字後面的文楷小字（例如「分」），與 value 內的 +／K 不同層
  label: string;
};

function parseValue(raw: string): { target: number; decimals: number; unit: string } {
  const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { target: 0, decimals: 0, unit: "" };
  const [, numPart, unit] = match;
  const decimals = numPart.includes(".") ? numPart.split(".")[1].length : 0;
  return { target: parseFloat(numPart), decimals, unit };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function StatCounter({ value, suffix, label }: StatCounterProps) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // 初始 state 就是 value（最終值），不用動畫時什麼都不必做，維持原樣即可。
    if (prefersReduced) return;

    const { target, decimals, unit } = parseValue(value);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || played.current) return;
        played.current = true;

        const duration = 1200;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = easeOutCubic(progress);
          const current = target * eased;
          setDisplay(progress < 1 ? `${current.toFixed(decimals)}${unit}` : value);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="num" ref={ref}>
      <b>
        {display}
        {suffix && <small>{suffix}</small>}
      </b>
      <span>{label}</span>
    </div>
  );
}
