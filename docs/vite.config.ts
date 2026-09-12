import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));

/** Per-route SEO data, consumed by scripts/emit-pages.mjs, which runs after
 * `vite build` to stamp the SPA shell into /<route>/index.html copies.
 * `jsonLd` (landing only) is injected as an application/ld+json script. */
export const PAGES = [
  {
    path: "/",
    title: "EchoingDeaths: Death leaves a curse behind",
    description:
      "Spigot, Paper and Purpur plugin that turns every player death into an immersive curse. Nearby players get temporary debuffs themed by the cause of death.",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://echoingdeaths.docs.potenfyr.in/#website",
          url: "https://echoingdeaths.docs.potenfyr.in/",
          name: "EchoingDeaths Docs",
          publisher: { "@id": "https://echoingdeaths.docs.potenfyr.in/#org" },
        },
        {
          "@type": "Organization",
          "@id": "https://echoingdeaths.docs.potenfyr.in/#org",
          name: "PotenFYR Studios",
          url: "https://potenfyr.in",
          sameAs: [
            "https://github.com/PotenFYR-Studios",
            "https://modrinth.com/organization/potenfyr",
          ],
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://echoingdeaths.docs.potenfyr.in/#app",
          name: "EchoingDeaths",
          applicationCategory: "GameApplication",
          operatingSystem: "Minecraft 1.21+ Spigot/Paper",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          codeRepository: "https://github.com/PotenFYR-Studios/EchoingDeaths",
          downloadUrl: "https://modrinth.com/plugin/echoing-deaths",
          author: { "@id": "https://echoingdeaths.docs.potenfyr.in/#org" },
        },
      ],
    },
  },
  {
    path: "/docs/",
    title: "Documentation Hub · EchoingDeaths Docs",
    description:
      "EchoingDeaths documentation hub: installation, the full curse catalog, configuration reference, commands and permissions, and FAQ.",
  },
  {
    path: "/docs/getting-started/",
    title: "Getting Started · EchoingDeaths Docs",
    description:
      "Install EchoingDeaths on your Spigot, Paper or Purpur server: download from Modrinth, drop the jar in /plugins, tune config.yml and test curses in game.",
  },
  {
    path: "/docs/curses/",
    title: "Curses · EchoingDeaths Docs",
    description:
      "Every EchoingDeaths curse: the Bukkit damage cause that triggers it, its potion effects, duration and amplifier, plus how to map any DamageCause.",
  },
  {
    path: "/docs/configuration/",
    title: "Configuration Reference · EchoingDeaths Docs",
    description:
      "Complete config.yml reference for EchoingDeaths: settings, display channels, messages, placeholders, per-cause effects and the fallback curse.",
  },
  {
    path: "/docs/commands-permissions/",
    title: "Commands & Permissions · EchoingDeaths Docs",
    description:
      "EchoingDeaths commands (/echoingdeaths, /ed) and permissions: echoingdeaths.admin, echoingdeaths.reload and echoingdeaths.bypass.",
  },
  {
    path: "/docs/faq/",
    title: "FAQ · EchoingDeaths Docs",
    description:
      "EchoingDeaths frequently asked questions: compatibility, curse behavior, bypassing, per-world setups and troubleshooting.",
  },
  {
    path: "/about/",
    title: "About · EchoingDeaths Docs",
    description:
      "About EchoingDeaths and PotenFYR Studios: project story, links, license and roadmap.",
  },
  {
    path: "/license/",
    title: "License · EchoingDeaths Docs",
    description:
      "EchoingDeaths license: Apache-2.0 with the Commons Clause. What you can do (fork, modify, self-host, build on it) and what you can't (sell it).",
  },
  {
    path: "/examples/",
    title: "Examples · EchoingDeaths Docs",
    description:
      "Copy-paste EchoingDeaths examples: a real config.yml curse block, command usage with required permissions, and the %player% / %cause% message format.",
  },
];

export default defineConfig({
  root: __dir,
  base: process.env.VITE_BASE ?? "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
  server: { port: 5179 },
});
