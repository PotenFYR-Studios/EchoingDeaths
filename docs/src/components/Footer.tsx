import { SITE, withBase } from "../data/pages";

/** Full-bleed 3-zone footer per SPEC 5.2. */
export function SiteFooter() {
  return (
    <footer
      className="border-t border-line-light"
      style={{ background: "rgba(14,17,29,.6)" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div style={{ maxWidth: 420 }}>
            <div className="flex items-center gap-2 font-mono text-[0.95em] font-bold text-white">
              EchoingDeaths
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--grad-text)" }}
                aria-hidden
              />
            </div>
            <p className="mt-2 text-[0.8em]" style={{ color: "var(--muted)" }}>
              Immersive death-based curses for nearby players. Lightweight,
              Bukkit-only, NMS-free, for Spigot, Paper and Purpur.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-start gap-5 font-mono text-[0.78em]"
            style={{ color: "var(--muted)" }}
          >
            <a
              href={SITE.repo}
              target="_blank"
              rel="noopener"
              className="no-underline transition-colors hover:text-white"
            >
              GitHub Org
            </a>
            <a
              href={SITE.website}
              target="_blank"
              rel="noopener"
              className="no-underline transition-colors hover:text-white"
            >
              potenfyr.in
            </a>
            <a
              href={SITE.discord}
              target="_blank"
              rel="noopener"
              className="no-underline transition-colors hover:text-white"
            >
              Support Discord
            </a>
            <a
              href={SITE.modrinth}
              target="_blank"
              rel="noopener"
              className="no-underline transition-colors hover:text-white"
            >
              Modrinth
            </a>
            <a
              href={withBase("/examples/")}
              className="no-underline transition-colors hover:text-white"
            >
              Examples
            </a>
            <a href={withBase("/docs/")} className="no-underline" style={{ color: "#a78bfa" }}>
              Docs
            </a>
            <a
              href={withBase("/license/")}
              className="no-underline transition-colors hover:text-white"
            >
              License
            </a>
          </nav>
        </div>

        <div
          className="mt-6 flex flex-col gap-2 border-t border-line-light pt-4 text-[0.75em] md:flex-row md:items-center md:justify-between"
          style={{ color: "var(--faint)" }}
        >
          <span>
            © 2026 PotenFYR Studios. Released under the MIT License.
          </span>
          <span>Crafted with ♥ for Minecraft server owners.</span>
        </div>
      </div>
    </footer>
  );
}
