import type { ReactNode } from "react";

export default function Section({
  id,
  eyebrow,
  title,
  children,
  tone = "light",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
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
            <p
              className={`text-xs tracking-[0.25em] uppercase mb-3 ${
                isDark ? "text-clay" : "text-clay"
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
