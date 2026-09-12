import { DocsShell } from "../components/DocsShell";
import { CodeBlock } from "../components/CodeBlock";
import { CurseCard } from "../components/CurseCard";
import { CURSES, FALLBACK_CURSE } from "../data/curses";
import { type Heading } from "../data/pages";

const HEADINGS: Heading[] = [
  { id: "how-curses-work", label: "How curses work", level: 2 },
  { id: "default-curses", label: "Default curses", level: 2 },
  { id: "any-damage-cause", label: "Any damage cause", level: 2 },
  { id: "fallback-curse", label: "The fallback curse", level: 2 },
];

/** Curses reference: every real curse from the default config.yml. */
export function Curses() {
  return (
    <DocsShell
      pathname="/docs/curses/"
      pageId="curses"
      headings={HEADINGS}
    >
      <h1 className="grad-text">Curses</h1>
      <p>
        A "curse" is a bundle of potion effects that EchoingDeaths presses onto
        the players standing near a death. This page lists every curse in the
        default configuration and explains how causes are resolved.
      </p>

      <h2 id="how-curses-work">How curses work</h2>
      <p>
        When a player dies, EchoingDeaths reads the{" "}
        <strong>last damage cause</strong> of the death event, a Bukkit{" "}
        <code>EntityDamageEvent.DamageCause</code> enum such as{" "}
        <code>FALL</code>, <code>LAVA</code> or <code>SONIC_BOOM</code>. The
        enum's name is looked up as a section in <code>config.yml</code> under{" "}
        <code>effects</code>. For every player in the same world within{" "}
        <code>settings.radius</code> blocks of the corpse (excluding the dead
        player, bypass holders, and creative/spectator players unless
        configured otherwise), the plugin:
      </p>
      <ul>
        <li>
          applies each of the curse's <code>potion-effects</code> for{" "}
          <code>duration-seconds</code> at the configured <code>amplifier</code>{" "}
          (0 = Level I, 1 = Level II, 2 = Level III…);
        </li>
        <li>
          sends your configured chat lines, actionbar text and title/subtitle
          with <code>%player%</code> and <code>%cause%</code> filled in;
        </li>
        <li>
          plays <code>display.sound.type</code> at the configured volume and
          pitch (default: <code>ENTITY_WARDEN_HEARTBEAT</code>).
        </li>
      </ul>

      <h2 id="default-curses">Default curses</h2>
      <p>
        Sixteen curses ship with the plugin. "Amp" is the potion amplifier from
        config; the in-game level is amp + 1.
      </p>

      <table>
        <thead>
          <tr>
            <th>Cause</th>
            <th>Curse name</th>
            <th>Duration</th>
            <th>Amp</th>
            <th>Effects</th>
          </tr>
        </thead>
        <tbody>
          {CURSES.map((c) => (
            <tr key={c.cause}>
              <td>
                <code>{c.cause}</code>
              </td>
              <td>{c.displayName}</td>
              <td>{c.durationSeconds}s</td>
              <td>{c.amplifier}</td>
              <td>{c.potionEffects.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        The same catalog as cards, for browsing:
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {CURSES.map((c) => (
          <CurseCard key={c.cause} curse={c} />
        ))}
      </div>

      <h2 id="any-damage-cause">Any damage cause</h2>
      <p>
        Cause detection is <strong>dynamic</strong>: the plugin maps whatever
        Bukkit reports, so <em>any</em> <code>DamageCause</code> works the
        moment you add a matching section under <code>effects</code>.{" "}
        <code>HOT_FLOOR</code>, <code>DRAGON_BREATH</code>,{" "}
        <code>PROJECTILE</code>, <code>ENTITY_ATTACK</code>,{" "}
        <code>FIRE_TICK</code> and friends. Valid enum names are in the{" "}
        <a
          href="https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityDamageEvent.DamageCause.html"
          target="_blank"
          rel="noopener"
        >
          Spigot DamageCause javadoc
        </a>
        , and valid potion entries in the{" "}
        <a
          href="https://hub.spigotmc.org/javadocs/spigot/org/bukkit/potion/PotionEffectType.html"
          target="_blank"
          rel="noopener"
        >
          PotionEffectType javadoc
        </a>
        .
      </p>
      <CodeBlock
        lang="yaml"
        title="config.yml: mapping a cause that has no default curse"
        code={`effects:
  DRAGON_BREATH:
    display-name: "Dragon's Breath"
    duration-seconds: 10
    amplifier: 1
    potion-effects:
      - DARKNESS
      - WEAKNESS`}
      />

      <h2 id="fallback-curse">The fallback curse</h2>
      <p>
        Deaths whose cause has no section under <code>effects</code> (including
        rare deaths with no damage event at all) receive the{" "}
        <code>fallback</code> curse, by default{" "}
        {FALLBACK_CURSE.potionEffects.join(" and ").toLowerCase()} for{" "}
        {FALLBACK_CURSE.durationSeconds} seconds. Edit the <code>fallback</code>{" "}
        section to change what unmapped deaths feel like; see{" "}
        <a href="/docs/configuration/">Configuration</a>.
      </p>
    </DocsShell>
  );
}
