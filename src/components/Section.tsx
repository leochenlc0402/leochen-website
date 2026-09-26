import type { ReactNode } from "react";
import SectionTitle from "@/components/SectionTitle";

export default function Section({
  id,
  eyebrow,
  formal,
  casual,
  children,
  tone = "light",
}: {
  id?: string;
  eyebrow?: string;
  formal: string;
  casual: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ${
        isDark ? "bg-coffee text-parchment" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 sm:mb-12">
          {eyebrow && (
            <p className="text-xs tracking-[0.25em] uppercase mb-3 text-clay">
              {eyebrow}
            </p>
          )}
          <SectionTitle formal={formal} casual={casual} tone={tone} />
        </div>
        {children}
      </div>
    </section>
  );
}
