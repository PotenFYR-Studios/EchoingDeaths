import { useState } from "react";
import { DocsShell } from "../components/DocsShell";
import { AccordionItem } from "../components/magicui";
import { SITE, type Heading } from "../data/pages";

const HEADINGS: Heading[] = [{ id: "faq", label: "Frequently asked questions", level: 2 }];

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Which server platforms and versions are supported?",
    a: (
      <>
        Spigot, Paper and Purpur on Minecraft 1.21+ (the plugin declares{" "}
        <code>api-version: '1.21'</code> and is compiled against the Spigot
        1.21.8 API with Java 21). It is pure Bukkit, with no NMS, no reflection, no
        version-specific internals.
      </>
    ),
  },
  {
    q: "Does the dead player also get cursed?",
    a: (
      <>
        No. The curse spreads only to <em>other</em> players in the same world
        within <code>settings.radius</code> blocks; the listener explicitly
        skips the player who died.
      </>
    ),
  },
  {
    q: "How do I stop staff or specific players from being cursed?",
    a: (
      <>
        Grant them <code>echoingdeaths.bypass</code>. It's checked for every
        nearby player each time a curse spreads. Creative and spectator players
        are also skipped unless you enable{" "}
        <code>settings.affect-creative</code> /{" "}
        <code>settings.affect-spectator</code>.
      </>
    ),
  },
  {
    q: "Can I add a curse for a cause that isn't in the default config?",
    a: (
      <>
        Yes: cause mapping is dynamic. Add a section under <code>effects</code>{" "}
        named after any Bukkit <code>DamageCause</code> enum (for example{" "}
        <code>HOT_FLOOR</code>, <code>DRAGON_BREATH</code> or{" "}
        <code>PROJECTILE</code>), reload, and that death starts cursing. See{" "}
        <a href="/docs/curses/">Curses</a>.
      </>
    ),
  },
  {
    q: "What happens to deaths with no matching curse?",
    a: (
      <>
        They use the <code>fallback</code> section, by default Weakness I for
        5 seconds, displayed as "Unknown". Edit that section to change the
        experience for unmapped causes.
      </>
    ),
  },
  {
    q: "Do I need to restart after editing config.yml?",
    a: (
      <>
        No. Run <code>/echoingdeaths reload</code> (permission{" "}
        <code>echoingdeaths.reload</code>) and the new values apply to the next
        death.
      </>
    ),
  },
  {
    q: "Is it performance-safe for busy servers?",
    a: (
      <>
        That's the design goal: the plugin only reacts to player death events,
        applies vanilla potion effects, plays a sound and sends messages, with no
        packet manipulation, no scheduled tasks, no NMS. If you spot a problem
        on a busy server, please{" "}
        <a href={`${SITE.repo}/issues`} target="_blank" rel="noopener">
          report it
        </a>
        .
      </>
    ),
  },
  {
    q: "Does it work in specific worlds only / can I disable a world?",
    a: (
      <>
        Add the world's name to <code>settings.ignored-worlds</code>; deaths in
        listed worlds trigger nothing.
      </>
    ),
  },
  {
    q: "Can I change the sound and messages?",
    a: (
      <>
        Yes. <code>display.sound.type</code> takes any Bukkit{" "}
        <code>Sound</code> enum (invalid names are silently ignored), with{" "}
        <code>volume</code> and <code>pitch</code> next to it. Chat, actionbar
        and title texts live under <code>messages</code> and support color
        codes plus <code>%player%</code> / <code>%cause%</code>.
      </>
    ),
  },
  {
    q: "Where do I report a bug or request a feature?",
    a: (
      <>
        Use the GitHub issue tracker:{" "}
        <a href={`${SITE.repo}/issues`} target="_blank" rel="noopener">
          github.com/PotenFYR-Studios/EchoingDeaths/issues
        </a>{" "}
        or ask in the{" "}
        <a href={SITE.discord} target="_blank" rel="noopener">
          support Discord
        </a>
        . Please include your server version and the relevant config section.
      </>
    ),
  },
];

/** FAQ doc page with functional accordion. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <DocsShell
      pathname="/docs/faq/"
      pageId="faq"
      headings={HEADINGS}
    >
      <h1 className="grad-text">FAQ</h1>
      <p>
        Short answers to the questions that come up most on server.owner
        threads. Anything missing? Ask in the{" "}
        <a href={SITE.discord} target="_blank" rel="noopener">
          support Discord
        </a>
        .
      </p>

      <h2 id="faq">Frequently asked questions</h2>
      <div className="flex flex-col gap-3 not-prose">
        {FAQS.map((f, i) => (
          <AccordionItem
            key={f.q}
            title={f.q}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          >
            {f.a}
          </AccordionItem>
        ))}
      </div>
    </DocsShell>
  );
}
