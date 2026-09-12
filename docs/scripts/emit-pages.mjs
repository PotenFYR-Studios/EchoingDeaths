/**
 * Post-build prerender + emit. Runs after `vite build`; see package.json.
 *
 * 1. Renders every route to static HTML with react-dom/server (under Bun),
 *    so crawlers get full body content instead of an empty SPA shell.
 * 2. Stamps per-page title/description/canonical/OG/Twitter meta + the
 *    landing JSON-LD into the built shell and writes <route>/index.html
 *    copies, plus a prerendered 404 fallback.
 *
 * The vite shell ships the landing description verbatim; it is REPLACED (not
 * duplicated) so every page carries exactly one, its own, description.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES } from "../vite.config.ts";

const __dir = dirname(fileURLToPath(import.meta.url));
const docsDir = resolve(__dir, "..");
const outDir = resolve(docsDir, "dist");
const CANON = "https://echoingdeaths.docs.potenfyr.in";
const OG_IMAGE = `${CANON}/og.png`;
const OG_ALT = "EchoingDeaths: death-triggered curses for Minecraft servers";

/** Minimal window stub: App reads window.location.pathname at render time and
 * nothing else in the app graph touches DOM globals outside effects/handlers.
 * `motion` (framer-motion) instanceof-checks these DOM classes while
 * rendering, so they must exist for the server render too. */
class ElementStub {}
class HTMLElementStub extends ElementStub {}
class SVGElementStub extends ElementStub {}
Object.assign(globalThis, {
  window: {
    location: { href: `${CANON}/`, pathname: "/", search: "", hash: "" },
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  },
  Element: ElementStub,
  HTMLElement: HTMLElementStub,
  SVGElement: SVGElementStub,
});
// Dynamic import so the stub exists before the app graph is evaluated.
const { render } = await import("../src/entry-server.tsx");

const shell = readFileSync(resolve(outDir, "index.html"), "utf8");

// Vite keeps this tag intact (line breaks included), but match any shape.
const TITLE_RE = /<title>.*?<\/title>/;
const DESCRIPTION_RE = /<meta\s+name="description"[^>]*>/;
const ROOT_RE = /<div id="root"><\/div>/;

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const p of PAGES) {
  window.location.pathname = p.path;
  window.location.href = `${CANON}${p.path}`;
  const body = render();

  const dir = p.path === "/" ? outDir : resolve(outDir, p.path.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  const canon = `${CANON}${p.path}`;
  const head = [
    `<link rel="canonical" href="${canon}">`,
    `<meta property="og:title" content="${esc(p.title)}">`,
    `<meta property="og:description" content="${esc(p.description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${canon}">`,
    `<meta property="og:site_name" content="EchoingDeaths">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:type" content="image/png">`,
    `<meta property="og:image:alt" content="${esc(OG_ALT)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(p.title)}">`,
    `<meta name="twitter:description" content="${esc(p.description)}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
    `<meta name="twitter:image:alt" content="${esc(OG_ALT)}">`,
    p.jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(p.jsonLd)}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n  ");

  const html = shell
    .replace(TITLE_RE, `<title>${esc(p.title)}</title>`)
    .replace(DESCRIPTION_RE, `<meta name="description" content="${esc(p.description)}">`)
    .replace("</head>", `  ${head}\n  </head>`)
    .replace(ROOT_RE, `<div id="root">${body}</div>`);
  writeFileSync(resolve(dir, "index.html"), html);
}

// 404 SPA fallback: prerendered body (noindex + instant bounce to home).
window.location.pathname = "/404";
const notFound = shell
  .replace(TITLE_RE, "<title>Not Found · EchoingDeaths Docs</title>")
  .replace(DESCRIPTION_RE, '<meta name="robots" content="noindex">')
  .replace("</head>", '  <meta http-equiv="refresh" content="0;url=/">\n  </head>')
  .replace("</body>", `<script>location.replace("/");</script>\n  </body>`)
  .replace(ROOT_RE, `<div id="root">${render()}</div>`);
writeFileSync(resolve(outDir, "404.html"), notFound);

console.log(
  `emit-pages: prerendered ${PAGES.length} route pages + 404.html to dist/`,
);
