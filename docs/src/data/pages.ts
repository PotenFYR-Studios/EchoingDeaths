/** Route registry, must stay in sync with the PAGES table in vite.config.ts. */

export const SITE = {
  name: "EchoingDeaths",
  version: "v0.1.0-alpha",
  domain: "https://echoingdeaths.docs.potenfyr.in",
  repo: "https://github.com/PotenFYR-Studios/EchoingDeaths",
  org: "https://github.com/PotenFYR-Studios",
  website: "https://potenfyr.in",
  modrinth: "https://modrinth.com/plugin/echoing-deaths",
  discord: "https://discord.com/invite/zUaN2FPBec",
} as const;

export interface DocPageMeta {
  id: string;
  /** route path with trailing slash */
  path: string;
  title: string;
  navTitle: string;
  description: string;
  group: "Get started" | "Core reference" | "Community";
}

/** Doc-reader pages, in reading order (drives sidebar + prev/next). */
export const DOC_PAGES: DocPageMeta[] = [
  {
    id: "getting-started",
    path: "/docs/getting-started/",
    title: "Getting Started",
    navTitle: "Getting Started",
    description: "Install EchoingDeaths and cast your first curse.",
    group: "Get started",
  },
  {
    id: "curses",
    path: "/docs/curses/",
    title: "Curses",
    navTitle: "Curses",
    description: "Every curse, its trigger cause and its effects.",
    group: "Core reference",
  },
  {
    id: "configuration",
    path: "/docs/configuration/",
    title: "Configuration",
    navTitle: "Configuration",
    description: "The complete config.yml reference.",
    group: "Core reference",
  },
  {
    id: "commands-permissions",
    path: "/docs/commands-permissions/",
    title: "Commands & Permissions",
    navTitle: "Commands & Permissions",
    description: "/echoingdeaths subcommands and the permission nodes.",
    group: "Core reference",
  },
  {
    id: "faq",
    path: "/docs/faq/",
    title: "FAQ",
    navTitle: "FAQ",
    description: "Answers to common server-owner questions.",
    group: "Community",
  },
];

/** Extra static pages outside the doc reader. */
export const STATIC_PAGES = [
  { id: "portal", path: "/docs/", title: "Documentation Hub" },
  { id: "examples", path: "/examples/", title: "Examples" },
  { id: "about", path: "/about/", title: "About" },
  { id: "license", path: "/license/", title: "License" },
  { id: "home", path: "/", title: "Home" },
] as const;


const envBase: unknown = import.meta.env?.BASE_URL;

/** Deploy base ("/" on a custom domain, "/EchoingDeaths/" on github.io
 *  project pages): vite inlines BASE_URL in the client bundle; the process-env
 *  fallback covers tooling that imports this module outside vite. */
export const BASE: string =
  typeof envBase === "string" ? envBase
  : typeof process !== "undefined" ? process.env?.VITE_BASE ?? "/"
  : "/";

/** Prefix an in-site path with the deploy base. Idempotent, and a no-op for
 *  anything not site-rooted, so call sites can wrap unconditionally. */
export function withBase(p: string): string {
  if (BASE !== "/" && (p === BASE || p.startsWith(BASE))) return p;
  if (!p.startsWith("/")) return p;
  return `${BASE}${p.slice(1)}`;
}

/** Strip the deploy base from a location pathname, yielding the canonical
 *  in-site route used by the page tables above. */
export function stripBase(p: string): string {
  if (BASE !== "/") {
    if (p === BASE) return "/";
    if (p.startsWith(BASE)) return p.slice(BASE.length - 1);
  }
  return p;
}

/** Resolve the page id for the current location pathname. */
export function pageIdForPath(pathname: string): string | null {
  const raw = stripBase(pathname);
  const p = raw.endsWith("/") ? raw : `${raw}/`;
  for (const d of DOC_PAGES) if (d.path === p) return d.id;
  for (const s of STATIC_PAGES) if (s.path === p) return s.id;
  return null;
}

/** Prev/next neighbours within DOC_PAGES reading order. */
export function neighborsOf(id: string): { prev: DocPageMeta | null; next: DocPageMeta | null } {
  const i = DOC_PAGES.findIndex((d) => d.id === id);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? DOC_PAGES[i - 1] : null,
    next: i < DOC_PAGES.length - 1 ? DOC_PAGES[i + 1] : null,
  };
}

/** TOC heading descriptor. */
export interface Heading {
  id: string;
  label: string;
  level: 2 | 3;
}

/** Search index entry for the ⌘K palette. */
export interface SearchEntry {
  page: string;
  pagePath: string;
  label: string;
  headingId?: string;
  kind: "page" | "section";
}
