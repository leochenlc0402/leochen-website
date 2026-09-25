import { profile } from "@/data/profile";
import { podcast } from "@/data/media";

export default function Footer() {
  return (
    <footer className="bg-coffee text-parchment">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-2">
            <p className="font-heading text-xl font-semibold">
              {profile.displayName}
            </p>
            <p className="text-sm text-parchment/60">{profile.title}</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-parchment/40">
              聯絡
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="block text-sm text-parchment/70 hover:text-accent transition-colors"
            >
              {profile.email}
            </a>
          </div>

          <div className="space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-parchment/40">
              夫夫之道 Fufuknows
            </p>
            <a
              href={podcast.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-parchment/70 hover:text-accent transition-colors"
            >
              {podcast.name}
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-parchment/10 text-xs text-parchment/30">
          © {new Date().getFullYear()} {profile.displayName}
        </div>
      </div>
    </footer>
  );
}
