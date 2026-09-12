import { CodeBlock } from "../components/CodeBlock";
import { GlowOrb, DotPattern } from "../components/magicui";
import { SITE } from "../data/pages";

/** /examples: copy-paste snippets built from the real default config. */
export function Examples() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ padding: "64px 0 8px" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <GlowOrb className="-top-32 left-[20%]" color="rgba(139,92,246,.16)" size={460} />
          <DotPattern className="opacity-50" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mono-label">EchoingDeaths examples</div>
          <h1
            className="grad-text mt-3 font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2.2em, 5vw, 3.2em)", lineHeight: 1.1 }}
          >
            Copy, paste, curse.
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-[1.02em]" style={{ color: "var(--muted)" }}>
            Real snippets from the default <code>config.yml</code> and command
            set. Drop them straight into your server setup.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <div className="doc-content">
          <h2 id="curse-block">A curse block</h2>
          <p>
            Two curses exactly as they ship in <code>config.yml</code>: the
            cause key is a Bukkit <code>DamageCause</code> name, and everything
            under it (display name, duration, amplifier, effect list) is
            yours to edit. Run <code>/echoingdeaths reload</code> after
            changing anything.
          </p>
          <CodeBlock
            lang="yaml"
            title="plugins/EchoingDeaths/config.yml"
            code={`effects:
  FALL:

    display-name: "Fall"

    duration-seconds: 10

    amplifier: 1

    potion-effects:
      - SLOWNESS
      - WEAKNESS

  THORNS:

    display-name: "Thorns"

    duration-seconds: 6

    amplifier: 0

    potion-effects:
      - WEAKNESS`}
          />

          <h2 id="commands">Command usage</h2>
          <p>
            Every subcommand and the permission it needs; all three nodes
            default to server operators.
          </p>
          <CodeBlock
            lang="text"
            title="in game, as op or with the listed permission"
            code={`# Print the help menu            (echoingdeaths.admin)
/echoingdeaths

# Apply config.yml edits live    (echoingdeaths.reload)
/echoingdeaths reload

# Show version + author          (echoingdeaths.admin)
/echoingdeaths info

# Preview the Lava curse on yourself
# (echoingdeaths.admin, players only)
/echoingdeaths test LAVA`}
          />

          <h2 id="messages">Message format</h2>
          <p>
            Messages support classic color codes and two placeholders:{" "}
            <code>%player%</code> for the player who died and <code>%cause%</code>{" "}
            for the curse's <code>display-name</code>.
          </p>
          <CodeBlock
            lang="yaml"
            title="config.yml: messages section (defaults)"
            code={`messages:
  chat:
    - "&4%player% died."
    - "&cYou were cursed by the echo of their death."
    - "&7Cause: &e%cause%"
  actionbar:
    - "&cCursed by %player%'s death"
  title:
    title: "&4Echoing Death"
    subtitle: "&cYou feel a lingering curse..."
    fade-in: 10
    stay: 50
    fade-out: 20`}
          />
          <p>
            More in the{" "}
            <a href="/docs/configuration/">configuration reference</a> and the{" "}
            <a href="/docs/commands-permissions/">
              commands &amp; permissions
            </a>{" "}
            page, or grab the jar from{" "}
            <a href={SITE.modrinth} target="_blank" rel="noopener">
              Modrinth
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
