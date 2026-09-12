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

/** Resolve the page id for the current location pathname. */
export function pageIdForPath(pathname: string): string | null {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
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
