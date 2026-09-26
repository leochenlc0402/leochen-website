import type { ReactNode } from "react";
import SectionTitle from "@/components/SectionTitle";

export default function Section({
  id,
  formal,
  casual,
  children,
  tone = "light",
  padding,
}: {
  id?: string;
  formal: string;
  casual: string;
  children: ReactNode;
  tone?: "light" | "dark";
  // 覆寫預設垂直間距（打破等距節奏用，例："pt-8 pb-16 sm:pb-20"）。
  // 不給就用預設 py-16 sm:py-20。
  padding?: string;
}) {
  const isDark = tone === "dark";
  return (
    <section
      id={id}
      className={`${padding ?? "py-16 sm:py-20"} px-4 sm:px-6 lg:px-8 ${
        isDark ? "bg-coffee text-parchment" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 sm:mb-12">
          <SectionTitle formal={formal} casual={casual} tone={tone} />
        </div>
        {children}
      </div>
    </section>
  );
}
