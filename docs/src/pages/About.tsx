import { BookOpen, Download, Github, Globe, MessagesSquare } from "lucide-react";
import { DotPattern, GlowOrb } from "../components/magicui";
import { SITE, withBase } from "../data/pages";

const LINKS = [
  {
    icon: Globe,
    label: "potenfyr.in",
    desc: "The studio's home base.",
    href: SITE.website,
  },
  {
    icon: Download,
    label: "Modrinth",
    desc: "EchoingDeaths release downloads.",
    href: SITE.modrinth,
  },
  {
    icon: Github,
    label: "GitHub",
    desc: "Source, issues and pull requests.",
    href: SITE.repo,
  },
  {
    icon: MessagesSquare,
    label: "Support Discord",
    desc: "Community help and announcements.",
    href: SITE.discord,
  },
];

const ROADMAP = [
  "Custom particles",
  "Per-effect sounds",
  "PlaceholderAPI support",
  "Region support",
  "Totem interaction support",
  "Custom effect stacking",
  "MythicMobs compatibility",
];

/** About page: project, studio, license, roadmap. */
export function About() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ padding: "64px 0 8px" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <GlowOrb className="-top-32 left-[18%]" color="rgba(139,92,246,.16)" size={480} />
          <GlowOrb className="-top-24 right-[10%]" color="rgba(236,72,153,.12)" size={420} />
          <DotPattern className="opacity-50" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mono-label">About</div>
          <h1
            className="grad-text mt-3 font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2.2em, 5vw, 3.2em)", lineHeight: 1.1 }}
          >
            Every death echoes.
          </h1>
          <p className="mx-auto mt-4 text-[1.02em]" style={{ color: "var(--muted)" }}>
            EchoingDeaths is a Minecraft death plugin by PotenFYR Studios: when
            a player dies, the cause of death becomes a temporary curse that
            ripples out to everyone nearby.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-10 pb-20">
        <div className="doc-content">
          <h2>The project</h2>
          <p>
            EchoingDeaths started from a simple server-nightmare: deaths are
            moments players gather around, but nothing ever <em>happens</em>.
            The plugin listens for player deaths, resolves the Bukkit damage
            cause, and presses a themed set of debuffs onto nearby players.
            lava deaths nauseate witnesses, void deaths blind them, the
            Warden's sonic boom leaves them in darkness. Everything is driven
            by a single <code>config.yml</code>, and any Bukkit{" "}
            <code>DamageCause</code> can be mapped.
          </p>
          <p>
            Under the hood it is deliberately boring: pure Bukkit/Spigot API,{" "}
            no NMS, no reflection, no CraftBukkit internals, which keeps it
            stable across server updates. Current release:{" "}
            <strong>{SITE.version}</strong>, built for Spigot / Paper / Purpur
            on Minecraft 1.21+.
          </p>

          <h2>PotenFYR Studios</h2>
          <p>
            <a href={SITE.website} target="_blank" rel="noopener">
              PotenFYR Studios
            </a>{" "}
            is a creative hub for game development, hosting infrastructure,
            automation tools and community-driven projects, and Minecraft plugins
            and Fabric frameworks, Pterodactyl/Pelican eggs, API security. We
            build modular, performant, production-ready software in the open at{" "}
            <a href={SITE.org} target="_blank" rel="noopener">
              github.com/PotenFYR-Studios
            </a>
            .
          </p>

          <h2>Roadmap</h2>
          <p>Planned features, straight from the project board:</p>
          <ul>
            {ROADMAP.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p>
            Want to steer what ships next?{" "}
            <a href={`${SITE.repo}/issues`} target="_blank" rel="noopener">
              Open an issue
            </a>{" "}
            or bring it to the Discord.
          </p>

          <h2>License</h2>
          <p>
            EchoingDeaths is free to use under the{" "}
            <strong>Apache License 2.0 with the Commons Clause</strong>,
            Copyright © 2026 PotenFYR Studios. The{" "}
            <a href={withBase("/license/")}>license page</a> explains what that means in
            practice, and the{" "}
            <a href={`${SITE.repo}/blob/master/LICENSE`}>LICENSE file</a> in
            the repository is authoritative.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {LINKS.map(({ icon: Icon, label, desc, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener" : undefined}
              className="doc-card group no-underline"
              style={{ color: "inherit" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-line-light bg-white/5 transition-transform group-hover:scale-[1.08]"
                  style={{ color: "#a78bfa" }}
                  aria-hidden
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="m-0 text-[0.98em] font-[640] text-white">{label}</h3>
              </div>
              <p className="m-0 text-[0.83em]" style={{ color: "var(--muted)" }}>
                {desc}
              </p>
            </a>
          ))}
        </div>

        <div className="doc-content mt-10">
          <p style={{ color: "var(--muted)" }}>
            <BookOpen className="mr-1 inline h-4 w-4" aria-hidden />
            Back to the{" "}
            <a href={withBase("/docs/")}>
              documentation hub
            </a>{" "}
            or the{" "}
            <a href={withBase("/")}>
              landing page
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
