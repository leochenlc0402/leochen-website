import Header from "@/components/Header";
import EndCTA from "@/components/EndCTA";
import NoOrphans from "@/components/NoOrphans";

// 一般網站頁面（首頁／關於我／演講邀約／作品與報導）共用的外框：
// 頂部導覽、底部 CTA、防孤字處理。/studio 後台不套用這層。
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <EndCTA />
      <NoOrphans />
    </>
  );
}
