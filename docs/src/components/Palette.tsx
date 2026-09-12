import { useEffect, useMemo, useRef, useState } from "react";
import { DOC_PAGES, SITE, type SearchEntry } from "../data/pages";

/** Search index: every doc page + its on-page sections. */
function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const p of DOC_PAGES) {
    entries.push({ page: p.title, pagePath: p.path, label: p.title, kind: "page" });
    for (const s of PAGE_SECTIONS[p.id] ?? []) {
      entries.push({
        page: p.title,
        pagePath: p.path,
        label: s.label,
        headingId: s.id,
        kind: "section",
      });
    }
  }
  return entries;
}

/** Sections per page, kept in sync with the headings rendered by each page. */
const PAGE_SECTIONS: Record<string, { id: string; label: string }[]> = {
  "getting-started": [
    { id: "requirements", label: "Requirements" },
    { id: "install", label: "Installation" },
    { id: "first-steps", label: "First steps in game" },
    { id: "troubleshooting", label: "Troubleshooting" },
  ],
  curses: [
    { id: "how-curses-work", label: "How curses work" },
    { id: "default-curses", label: "Default curses" },
    { id: "any-damage-cause", label: "Any damage cause" },
    { id: "fallback-curse", label: "The fallback curse" },
  ],
  configuration: [
    { id: "settings", label: "settings" },
    { id: "display", label: "display" },
    { id: "messages", label: "messages" },
    { id: "effects", label: "effects" },
    { id: "fallback", label: "fallback" },
    { id: "full-default-config", label: "Full default config.yml" },
  ],
  "commands-permissions": [
    { id: "commands", label: "Commands" },
    { id: "permissions", label: "Permissions" },
    { id: "permission-flow", label: "Permission flow" },
  ],
  faq: [{ id: "faq", label: "Frequently asked questions" }],
};

/** Command palette on Cmd/Ctrl+K per SPEC 5.12. */
export function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const index = useMemo(buildIndex, []);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 14);
    return index
      .filter((e) => `${e.label} ${e.page}`.toLowerCase().includes(q))
      .slice(0, 14);
  }, [index, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSel(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((s) => Math.min(s + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const hit = results[sel];
        if (hit) go(hit);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, sel, onClose]);

  if (!open) return null;

  const go = (hit: SearchEntry) => {
    onClose();
    const url =
      hit.kind === "section" ? `${hit.pagePath}#${hit.headingId}` : hit.pagePath;
    if (
      location.pathname === hit.pagePath ||
      location.pathname === hit.pagePath.replace(/\/$/, "")
    ) {
      document.getElementById(hit.headingId ?? "")?.scrollIntoView({ behavior: "smooth" });
    } else {
      location.href = url;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 pt-28 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-[#101320] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSel(0);
          }}
          placeholder="Search docs…"
          className="w-full border-b border-line-light bg-transparent px-4 py-3.5 text-sm text-[#e8eaf2] outline-none placeholder:text-[#6a7089]"
        />
        <div className="max-h-80 overflow-y-auto p-1.5">
          {results.length === 0 && (
            <div className="px-3 py-6 text-center text-[13px] text-[#6a7089]">
              No results for “{query}”.
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={`${r.pagePath}-${r.headingId ?? "page"}-${r.label}`}
              type="button"
              onMouseEnter={() => setSel(i)}
              onClick={() => go(r)}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] ${
                i === sel ? "bg-brand-violet/15 text-white" : "text-[#b9bfd4]"
              }`}
            >
              <span className="font-mono text-[10px] text-[#6a7089]" aria-hidden>
                {r.kind === "section" ? "§" : "→"}
              </span>
              <span className="flex-1 truncate">{r.label}</span>
              <span className="font-mono text-[10px] text-[#6a7089]">{r.page}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-line-light px-4 py-2 font-mono text-[10px] text-[#6a7089]">
          <span>↑↓ navigate · Enter open · Esc close</span>
          <a href={SITE.repo} target="_blank" rel="noopener" className="hover:text-[#c4b5fd]">
            EchoingDeaths {SITE.version}
          </a>
        </div>
      </div>
    </div>
  );
}
