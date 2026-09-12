import {
  Download,
  Github,
  Skull,
  Timer,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { CURSES, FALLBACK_CURSE } from "../data/curses";
import { SITE, withBase } from "../data/pages";
import { CurseCard } from "../components/CurseCard";
import { CodeBlock } from "../components/CodeBlock";
import { DotPattern, GlowOrb, Marquee, Meteors, NumberTicker } from "../components/magicui";

const HOW_IT_WORKS = [
  {
    title: "A player dies",
    body: "EchoingDeaths listens for PlayerDeathEvent and reads the killer's Bukkit damage cause: FALL, LAVA, VOID, whatever finished the job.",
  },
  {
    title: "The cause picks a curse",
    body: "The damage-cause name is looked up in config.yml. Any Bukkit DamageCause can be mapped; unmapped causes fall back to a generic curse.",
  },
  {
    title: "Nearby players are cursed",
    body: "Everyone in the same world within the configured radius gets the curse's potion effects, plus your chat, actionbar, title and sound feedback.",
  },
];

const STATS = [
  { icon: Skull, value: 16, label: "death curses" },
  { icon: Timer, value: 14, label: "block curse radius" },
  { icon: MessageSquareText, value: 3, label: "message channels" },
  { icon: ShieldCheck, value: 0, label: "NMS internals" },
];

/** Landing page: hero with Magic UI, curse grid, how-it-works, quick start. */
export function Landing() {
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden" style={{ padding: "72px 0 40px" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <GlowOrb className="-top-48 left-[8%]" color="rgba(139,92,246,.18)" size={550} />
          <GlowOrb className="-top-40 right-[6%]" color="rgba(236,72,153,.15)" size={500} />
          <GlowOrb className="top-[30%] left-[38%]" color="rgba(6,182,212,.12)" size={420} />
          <Meteors number={16} />
          <DotPattern className="opacity-60" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div
            className="ed-hero-in mono-label inline-flex items-center gap-2 rounded-full border border-line-light px-3.5 py-1.5 backdrop-blur-[8px]"
            style={{ background: "rgba(255,255,255,.03)" }}
          >
            <span
              className="pulse-dot inline-block h-2 w-2 rounded-full"
              style={{
                background: "#34d399",
                boxShadow: "0 0 8px rgba(16,185,129,.5)",
              }}
              aria-hidden
            />
            v0.1.0-alpha · Spigot / Paper / Purpur · MC 1.21+
          </div>

          <h1
            className="ed-hero-in grad-text mt-6 font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2.6em, 6vw, 4em)",
              lineHeight: 1.08,
              animationDelay: "0.08s",
            }}
          >
            Death leaves a curse behind.
          </h1>

          <p
            className="ed-hero-in mx-auto mt-5 max-w-[720px] text-[1.04em] leading-[1.75]"
            style={{ color: "var(--muted)", animationDelay: "0.16s" }}
          >
            Every player death echoes. EchoingDeaths grips nearby players with
            temporary debuffs themed by the cause of death: a lava death
            nauseates witnesses, a void death blinds them, the Warden's sonic
            boom leaves them in darkness. Fully configurable, Bukkit-only,
            NMS-free.
          </p>

          <div
            className="ed-hero-in mt-8 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "0.24s" }}
          >
            <a className="btn btn-primary" href={SITE.modrinth} target="_blank" rel="noopener">
              <Download className="h-4 w-4" /> Get it on Modrinth
            </a>
            <a className="btn btn-ghost" href={withBase("/docs/")}>
              Read the docs
            </a>
          </div>

          <div
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3.5 sm:grid-cols-4"
          >
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center backdrop-blur-md transition-transform hover:-translate-y-0.5"
              >
                <Icon
                  className="mx-auto mb-1.5 h-5 w-5"
                  style={{ color: value === 0 ? "#34d399" : "#a78bfa" }}
                  aria-hidden
                />
                <div className="grad-text font-mono text-3xl font-extrabold">
                  <NumberTicker value={value} />
                </div>
                <div className="mt-1 text-[11.5px] uppercase tracking-[1.4px] text-[#9aa0b4]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- cause marquee */}
      <section className="py-6" aria-label="Default death causes">
        <Marquee className="opacity-80">
          {CURSES.map((c) => (
            <span
              key={c.cause}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#6a7089]"
            >
              <span style={{ color: "var(--violet)" }} aria-hidden>
                ☠
              </span>
              {c.cause}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ----------------------------------------------------- curse grid */}
      <section className="mx-auto max-w-7xl px-6 py-16" id="curses">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mono-label">The curse catalog</div>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            One curse for every way to die.
          </h2>
          <p className="mt-3 text-[0.95em]" style={{ color: "var(--muted)" }}>
            These sixteen curses ship in the default config.yml. Every value,
            display name, duration, amplifier, potion effects, is yours to
            change, and any Bukkit damage cause can join the list.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CURSES.map((c) => (
            <CurseCard key={c.cause} curse={c} />
          ))}
          <div className="doc-card sm:col-span-2 lg:col-span-3 xl:col-span-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span
                className="mono-label"
                style={{ color: "#a78bfa" }}
              >
                fallback
              </span>
              <p className="m-0 text-[0.83em]" style={{ color: "var(--muted)" }}>
                <strong className="text-white">{FALLBACK_CURSE.displayName}</strong>, 
                any death cause without a mapping still curses:{" "}
                {FALLBACK_CURSE.potionEffects.join(", ").toLowerCase()},{" "}
                {FALLBACK_CURSE.durationSeconds}s.
              </p>
              <a
                href={withBase("/docs/curses/")}
                className="ml-auto text-[0.83em] no-underline"
                style={{ color: "#c4b5fd" }}
              >
                Full curse reference →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- how it works */}
      <section className="py-16" style={{ background: "var(--bg2)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mono-label">Mechanics</div>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            How a death becomes a curse.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="doc-card">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-brand-violet/10 font-mono text-sm font-bold"
                  style={{ color: "#a78bfa" }}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="m-0 text-[0.98em] font-[640] text-white">{step.title}</h3>
                <p className="m-0 text-[0.83em] leading-[1.55]" style={{ color: "var(--muted)" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- quick start */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mono-label">Quick start</div>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Cursing in three moves.
            </h2>
            <ol className="quickstart mt-5 space-y-3 pl-5" style={{ color: "var(--text-2)" }}>
              <li>
                Drop the jar from{" "}
                <a href={SITE.modrinth} target="_blank" rel="noopener">
                  Modrinth
                </a>{" "}
                into your server's <code>/plugins/</code> folder and restart.
              </li>
              <li>
                Tune <code>plugins/EchoingDeaths/config.yml</code>: radius,
                worlds, messages and every curse.
              </li>
              <li>
                Run <code>/echoingdeaths reload</code>, then{" "}
                <code>/echoingdeaths test LAVA</code> to feel one yourself.
              </li>
            </ol>
            <a className="btn btn-ghost mt-6" href={withBase("/docs/getting-started/")}>
              Full installation guide
            </a>
          </div>
          <CodeBlock
            lang="yaml"
            title="config.yml: a curse, end to end"
            code={`FIRE:
  display-name: "Fire"
  duration-seconds: 8
  amplifier: 1          # 0 = Level I, 1 = Level II
  potion-effects:
    - WEAKNESS
    - HUNGER`}
          />
        </div>
      </section>

      {/* -------------------------------------------------------- cta band */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div
          className="relative overflow-hidden rounded-2xl border border-line px-8 py-12 text-center"
          style={{ background: "var(--bg2)" }}
        >
          <div className="relative">
            <h2 className="m-0 text-2xl font-bold text-white sm:text-3xl">
              Let every death echo.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[0.95em]" style={{ color: "var(--muted)" }}>
              Free and open source under the MIT license. Questions? The support
              Discord and the issue tracker are open.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <a className="btn btn-primary" href={SITE.modrinth} target="_blank" rel="noopener">
                Download from Modrinth
              </a>
              <a className="btn btn-ghost" href={SITE.repo} target="_blank" rel="noopener">
                <Github className="h-4 w-4" /> Source on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
