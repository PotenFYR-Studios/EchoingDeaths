import { DocsShell } from "../components/DocsShell";
import { CodeBlock } from "../components/CodeBlock";
import { SITE, type Heading } from "../data/pages";

const HEADINGS: Heading[] = [
  { id: "requirements", label: "Requirements", level: 2 },
  { id: "install", label: "Installation", level: 2 },
  { id: "first-steps", label: "First steps in game", level: 2 },
  { id: "troubleshooting", label: "Troubleshooting", level: 2 },
];

export function GettingStarted() {
  return (
    <DocsShell
      pathname="/docs/getting-started/"
      pageId="getting-started"
      headings={HEADINGS}
    >
      <h1 className="grad-text">Getting Started</h1>
      <p>
        EchoingDeaths drops onto any Spigot-family server in minutes. This page
        covers requirements, installation and the first commands worth running.
      </p>

      <h2 id="requirements">Requirements</h2>
      <table>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Server software</td>
            <td>Spigot, Paper or Purpur</td>
          </tr>
          <tr>
            <td>Minecraft</td>
            <td>
              1.21+ (<code>api-version: '1.21'</code> in plugin.yml; built
              against the Spigot 1.21.8 API)
            </td>
          </tr>
          <tr>
            <td>Java</td>
            <td>21 or newer (the plugin is compiled for Java 21)</td>
          </tr>
          <tr>
            <td>Dependencies</td>
            <td>None, no NMS, no reflection, no other plugins required</td>
          </tr>
        </tbody>
      </table>

      <h2 id="install">Installation</h2>
      <ol>
        <li>
          Download the latest jar from{" "}
          <a href={SITE.modrinth} target="_blank" rel="noopener">
            EchoingDeaths on Modrinth
          </a>
          .
        </li>
        <li>
          Place it in your server's <code>/plugins/</code> folder.
        </li>
        <li>Restart the server. The plugin generates its default config on first boot.</li>
        <li>
          Edit <code>plugins/EchoingDeaths/config.yml</code> to taste, then run{" "}
          <code>/echoingdeaths reload</code> (or restart again).
        </li>
      </ol>

      <p>
        Building from source instead? The project is plain Maven:
      </p>
      <CodeBlock lang="bash" code={`git clone https://github.com/PotenFYR-Studios/EchoingDeaths.git\ncd EchoingDeaths\nmvn clean package   # requires JDK 21+; jar lands in target/`} />

      <h2 id="first-steps">First steps in game</h2>
      <p>
        With ops (or the <code>echoingdeaths.admin</code> permission), try:
      </p>
      <CodeBlock
        lang="text"
        code={`/echoingdeaths info          # version + author banner
/echoingdeaths reload       # apply config edits without a restart
/echoingdeaths test LAVA    # apply the Lava curse to yourself`}
      />
      <p>
        Stand next to a friend, have them jump off something tall, and watch
        the curse ripple out to everyone within the configured radius.
      </p>

      <h2 id="troubleshooting">Troubleshooting</h2>
      <ul>
        <li>
          <strong>No curses at all?</strong> Check <code>settings.enabled</code>{" "}
          is <code>true</code> and that your world isn't listed in{" "}
          <code>settings.ignored-worlds</code>.
        </li>
        <li>
          <strong>Curses feel too weak/strong?</strong> Tune{" "}
          <code>settings.radius</code> and each curse's{" "}
          <code>duration-seconds</code> / <code>amplifier</code>.
        </li>
        <li>
          <strong>A player never gets cursed?</strong> They may hold{" "}
          <code>echoingdeaths.bypass</code>, be in creative or spectator mode
          (see <code>settings.affect-creative</code> /{" "}
          <code>settings.affect-spectator</code>), or be standing outside the
          radius.
        </li>
        <li>
          <strong>Config edits not applying?</strong> Run{" "}
          <code>/echoingdeaths reload</code>; effects are read from config on
          every death.
        </li>
      </ul>
      <p>
        Still stuck? Ask in the{" "}
        <a href={SITE.discord} target="_blank" rel="noopener">
          support Discord
        </a>{" "}
        or{" "}
        <a href={`${SITE.repo}/issues`} target="_blank" rel="noopener">
          open an issue
        </a>
        .
      </p>
    </DocsShell>
  );
}
