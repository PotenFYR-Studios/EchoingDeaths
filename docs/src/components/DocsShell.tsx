import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Search, X } from "lucide-react";
import {
  DOC_PAGES,
  SITE,
  neighborsOf,
  withBase,
  type Heading,
} from "../data/pages";

/**
 * Three-rail docs reader: sidebar 240 / main (to 1152) / TOC 220.
 * Wires ⌘K palette trigger, `[` `]` page jumps and mobile drawer.
 */
export function DocsShell({
  pathname,
  pageId,
  headings,
  children,
}: {
  pathname: string;
  pageId: string;
  headings: Heading[];
  children: React.ReactNode;
}) {
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const { prev, next } = neighborsOf(pageId);
  const current = DOC_PAGES.find((d) => d.id === pageId);

  // `[` / `]` jump to prev/next page (SPEC §6)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
      if (e.key === "[") prev && (location.href = prev.path);
      if (e.key === "]") next && (location.href = next.path);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const groups = [...new Set(DOC_PAGES.map((d) => d.group))];

  return (
    <div className="docs-grid mx-auto w-full max-w-[1748px] px-7 pt-9 pb-20">
      {/* ------------------------------------------------ sidebar */}
      <aside
        className="docs-side sticky top-14 h-[calc(100vh-56px)] overflow-y-auto border-r border-line-light/60 pr-4"
        style={{ gridArea: "side" }}
        aria-label="Docs navigation"
      >
        {groups.map((g) => (
          <div key={g} className="mb-6">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between rounded-md px-1 py-1 text-left text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-white"
              style={{ color: "var(--faint)" }}
              aria-expanded={!collapsed[g]}
              onClick={() => setCollapsed((c) => ({ ...c, [g]: !c[g] }))}
            >
              {g}
              <ChevronDown
                className="h-3.5 w-3.5 transition-transform"
                style={{ transform: collapsed[g] ? "rotate(-90deg)" : "none" }}
                aria-hidden
              />
            </button>
            {!collapsed[g] &&
              DOC_PAGES.filter((d) => d.group === g).map((d) => {
              const active = d.id === pageId;
              return (
                <a
                  key={d.id}
                  href={withBase(d.path)}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-1.5 text-[13px] no-underline transition-colors ${
                    active
                      ? "bg-brand-violet/15 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,.4)]"
                      : "text-[#9aa0b4] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {d.navTitle}
                </a>
              );
            })}
          </div>
        ))}
      </aside>

      {/* ------------------------------------------------ main */}
      <main style={{ gridArea: "main" }} className="max-w-6xl min-w-0">
        <button
          type="button"
          className="docs-mobile-btn mb-4 cursor-pointer items-center gap-2 rounded-lg border border-line-light bg-white/[0.03] px-3 py-1.5 text-xs text-[#9aa0b4]"
          onClick={() => setDrawer(true)}
          aria-expanded={drawer}
          aria-label="Open docs navigation"
        >
          <Menu className="h-4 w-4" /> Browse docs
        </button>

        <nav aria-label="Breadcrumb" className="mono-label mb-3">
          <a href={withBase("/docs/")} className="transition-colors hover:text-white">
            Docs
          </a>
          <span className="mx-1.5" aria-hidden>
            /
          </span>
          <span style={{ color: "#d8ccfe" }}>{current?.navTitle ?? "Docs"}</span>
        </nav>
        <article className="doc-content">{children}</article>

        {(prev || next) && (
          <nav className="mt-12 flex justify-between gap-4" aria-label="Pagination">
            {prev ? (
              <a
                href={withBase(prev.path)}
                className="flex-1 rounded-xl border border-line-light bg-white/[0.02] p-4 no-underline transition-all hover:-translate-y-0.5 hover:border-brand-violet/50"
              >
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--faint)" }}>
                  <ChevronLeft className="mr-1 inline h-3 w-3" />Previous
                </div>
                <div className="mt-1 text-sm text-[#b9bfd4]">{prev.title}</div>
              </a>
            ) : (
              <span className="flex-1" />
            )}
            {next ? (
              <a
                href={withBase(next.path)}
                className="flex-1 rounded-xl border border-line-light bg-white/[0.02] p-4 text-right no-underline transition-all hover:-translate-y-0.5 hover:border-brand-pink/50"
              >
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--faint)" }}>
                  Next<ChevronRight className="ml-1 inline h-3 w-3" />
                </div>
                <div className="mt-1 text-sm text-[#b9bfd4]">{next.title}</div>
              </a>
            ) : (
              <span className="flex-1" />
            )}
          </nav>
        )}
      </main>

      {/* ------------------------------------------------ TOC rail */}
      {headings.length >= 3 && (
        <aside
          className="docs-toc sticky h-fit overflow-y-auto"
          style={{
            gridArea: "toc",
            top: "calc(var(--header-h) + 28px)",
            maxHeight: "calc(100vh - var(--header-h) - 56px)",
          }}
          aria-label="On this page"
        >
          <TocList headings={headings} />
        </aside>
      )}

      {/* ------------------------------------------------ mobile drawer */}
      {drawer && (
        <div className="docs-mobile-only fixed inset-0 z-40" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-14 left-0 right-16 z-30 overflow-y-auto bg-[#0b0d14]/98 px-5 py-4">
            <button
              type="button"
              className="absolute top-3 right-3 cursor-pointer text-[#9aa0b4]"
              onClick={() => setDrawer(false)}
              aria-label="Close docs navigation"
            >
              <X className="h-5 w-5" />
            </button>
            {groups.map((g) => (
              <div key={g} className="mb-5">
                <div
                  className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: "var(--faint)" }}
                >
                  {g}
                </div>
                {DOC_PAGES.filter((d) => d.group === g).map((d) => (
                  <a
                    key={d.id}
                    href={withBase(d.path)}
                    className={`block rounded-lg px-3 py-1.5 text-[13px] no-underline ${
                      d.id === pageId
                        ? "bg-brand-violet/15 text-white"
                        : "text-[#9aa0b4]"
                    }`}
                    onClick={() => setDrawer(false)}
                  >
                    {d.navTitle}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TocList({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) setActive(en.target.id);
        }
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="grad-text text-[0.68em] font-bold uppercase tracking-[0.14em]">
          On this page
        </span>
        <span className="rounded-full border border-line-light px-1.5 font-mono text-[10px] text-[#6a7089]">
          {headings.length}
        </span>
      </div>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          aria-current={active === h.id ? "location" : undefined}
          className={`block border-l-2 py-1 pl-3 text-[0.82em] no-underline transition-colors ${
            active === h.id
              ? "border-brand-violet font-semibold text-[#d8ccfe]"
              : "border-line text-[#9aa0b4] hover:text-white"
          }`}
          style={
            h.level === 3
              ? { paddingLeft: 22, fontSize: "0.79em" }
              : undefined
          }
        >
          {h.label}
        </a>
      ))}
      <div className="mt-6 border-t border-line-light pt-4">
        <button
          type="button"
          onClick={() => {
            /* wired via App-level key handler; palette opens with ⌘K */
            dispatchEvent(new CustomEvent("ed:open-palette"));
          }}
          className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-line-light bg-white/[0.03] px-3 py-1.5 text-xs text-[#9aa0b4] transition-colors hover:border-brand-violet/50"
        >
          <Search className="h-3.5 w-3.5" />
          Search docs
          <kbd className="ml-auto font-mono text-[10px] text-[#6a7089]">⌘K</kbd>
        </button>
        <a
          href={`${SITE.repo}/issues`}
          target="_blank"
          rel="noopener"
          className="mt-2 block rounded-lg px-3 py-1.5 text-xs text-[#9aa0b4] no-underline transition-colors hover:text-white"
        >
          Report an issue →
        </a>
      </div>
    </div>
  );
}
