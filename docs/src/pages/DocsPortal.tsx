import {
  ArrowUpRight,
  BookOpen,
  CodeXml,
  Download,
  FileCog,
  HelpCircle,
  Scale,
  ScrollText,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { DOC_PAGES, SITE, withBase } from "../data/pages";
import { DotPattern, GlowOrb } from "../components/magicui";

const PAGE_ICONS: Record<string, typeof BookOpen> = {
  "getting-started": BookOpen,
  curses: ScrollText,
  configuration: SlidersHorizontal,
  "commands-permissions": FileCog,
  faq: HelpCircle,
  examples: CodeXml,
};

/** /docs: documentation hub, card grid of the doc pages. */
export function DocsPortal() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ padding: "64px 0 8px" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <GlowOrb className="-top-32 left-[20%]" color="rgba(139,92,246,.16)" size={480} />
          <GlowOrb className="-top-24 right-[12%]" color="rgba(236,72,153,.12)" size={420} />
          <DotPattern className="opacity-50" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mono-label">EchoingDeaths docs · {SITE.version}</div>
          <h1
            className="grad-text mt-3 font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2.2em, 5vw, 3.2em)", lineHeight: 1.1 }}
          >
            Documentation Hub
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-[1.02em]" style={{ color: "var(--muted)" }}>
            Everything you need to install, tune and live with the curse, from
            the first jar drop to every config key.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_PAGES.map((p) => {
            const Icon = PAGE_ICONS[p.id] ?? Sparkles;
            return (
              <a
                key={p.id}
                href={withBase(p.path)}
                className="doc-card group no-underline"
                style={{ color: "inherit" }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-line-light bg-white/5 transition-transform group-hover:scale-[1.08]"
                    style={{ color: "#a78bfa" }}
                    aria-hidden
                  >
                    <Icon />
                  </span>
                  <span
                    className="text-[#f9a8d4] opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
                <h2 className="m-0 mt-1 text-[0.98em] font-[640] text-white">{p.title}</h2>
                <p className="m-0 text-[0.83em] leading-[1.55]" style={{ color: "var(--muted)" }}>
                  {p.description}
                </p>
              </a>
            );
          })}

          <a
            href={withBase("/examples/")}
            className="doc-card group no-underline"
            style={{ color: "inherit" }}
          >
            <div className="flex items-center justify-between">
              <span
                className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-line-light bg-white/5 transition-transform group-hover:scale-[1.08]"
                style={{ color: "#a78bfa" }}
                aria-hidden
              >
                <CodeXml />
              </span>
              <span
                className="text-[#f9a8d4] opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              >
                →
              </span>
            </div>
            <h2 className="m-0 mt-1 text-[0.98em] font-[640] text-white">Examples</h2>
            <p className="m-0 text-[0.83em] leading-[1.55]" style={{ color: "var(--muted)" }}>
              Copy-paste snippets: a curse block, command usage, message format.
            </p>
          </a>

          <a
            href={withBase("/license/")}
            className="doc-card group no-underline"
            style={{ color: "inherit" }}
          >
            <div className="flex items-center justify-between">
              <span
                className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-line-light bg-white/5 transition-transform group-hover:scale-[1.08]"
                style={{ color: "#a78bfa" }}
                aria-hidden
              >
                <Scale />
              </span>
              <span
                className="text-[#f9a8d4] opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              >
                →
              </span>
            </div>
            <h2 className="m-0 mt-1 text-[0.98em] font-[640] text-white">License</h2>
            <p className="m-0 text-[0.83em] leading-[1.55]" style={{ color: "var(--muted)" }}>
              Apache-2.0 with the Commons Clause, in plain words.
            </p>
          </a>

          <a
            href={SITE.modrinth}
            target="_blank"
            rel="noopener"
            className="doc-card group no-underline"
            style={{ color: "inherit" }}
          >
            <div className="flex items-center justify-between">
              <span
                className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-line-light bg-white/5 transition-transform group-hover:scale-[1.08]"
                style={{ color: "#34d399" }}
                aria-hidden
              >
                <Download className="h-5 w-5" />
              </span>
              <ArrowUpRight
                className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
            </div>
            <h2 className="m-0 mt-1 text-[0.98em] font-[640] text-white">Download</h2>
            <p className="m-0 text-[0.83em] leading-[1.55]" style={{ color: "var(--muted)" }}>
              Grab the latest jar from EchoingDeaths on Modrinth.
            </p>
          </a>
        </div>
      </section>
    </>
  );
}
