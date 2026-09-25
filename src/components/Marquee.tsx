import { testimonials } from "@/data/testimonials";

export default function Marquee() {
  return (
    <div>
      {/* 一般狀態：CSS 跑馬燈，hover 暫停。內容重複一次做出無縫循環 */}
      <div className="ticker-track motion-reduce:hidden overflow-hidden border-y border-sand py-4">
        <div className="flex w-max animate-ticker gap-10">
          {[...testimonials, ...testimonials].map((quote, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-lg font-heading text-coffee dark:text-parchment"
            >
              「{quote}」
            </span>
          ))}
        </div>
      </div>

      {/* prefers-reduced-motion：改靜態清單 */}
      <ul className="hidden motion-reduce:flex flex-col gap-3 border-y border-sand py-4">
        {testimonials.map((quote, i) => (
          <li
            key={i}
            className="text-lg font-heading text-coffee dark:text-parchment"
          >
            「{quote}」
          </li>
        ))}
      </ul>
    </div>
  );
}
