import CTALink from "@/components/CTALink";
import { profile } from "@/data/profile";
import { podcast } from "@/data/media";
import { buildMailtoHref } from "@/data/speaking";
import SubscribeForm from "@/components/SubscribeForm";

// 收尾（全站共用，section 9）：照定稿靜態稿 final-home.html 一比一，
// 放在 layout.tsx 裡，四頁都會自動接到同一份收尾＋頁尾。
export default function EndCTA() {
  return (
    <section className="navy end">
      <div className="wrap">
        <h2 className="h2">
          下一場和你的性平課，
          <br />
          交給里歐。
        </h2>
        <p className="mail">
          演講、講座、課程或主題分享的邀請，請來信{" "}
          <b>{profile.email}</b>
        </p>
        <div className="actions">
          <CTALink href={buildMailtoHref()} className="btn">
            寫信邀請 →
          </CTALink>
          <CTALink href="/speaking#fees" className="link">
            看費用說明
          </CTALink>
        </div>
        <SubscribeForm />
        <p className="creed">{profile.creed}</p>
        <div className="foot">
          <span>© {new Date().getFullYear()} {profile.displayName}</span>
          <span>夫夫之道 Fufuknows · {podcast.name}</span>
        </div>
      </div>
    </section>
  );
}
