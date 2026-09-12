import { DocsShell } from "../components/DocsShell";
import { type Heading } from "../data/pages";

const HEADINGS: Heading[] = [
  { id: "commands", label: "Commands", level: 2 },
  { id: "permissions", label: "Permissions", level: 2 },
  { id: "permission-flow", label: "Permission flow", level: 2 },
];

/** Commands & permissions: real data from plugin.yml + EchoingDeathsCommand. */
export function CommandsPermissions() {
  return (
    <DocsShell
      pathname="/docs/commands-permissions/"
      pageId="commands-permissions"
      headings={HEADINGS}
    >
      <h1 className="grad-text">Commands &amp; Permissions</h1>
      <p>
        Everything the plugin registers, straight from{" "}
        <code>plugin.yml</code> and the command executor.
      </p>

      <h2 id="commands">Commands</h2>
      <p>
        The base command is <code>/echoingdeaths</code>, with{" "}
        <code>/ed</code> registered as an alias. With no arguments it prints
        the help menu.
      </p>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Permission</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>/echoingdeaths</code> · <code>/ed</code>
            </td>
            <td>
              <code>echoingdeaths.admin</code>
            </td>
            <td>Base command; prints the help menu.</td>
          </tr>
          <tr>
            <td>
              <code>/echoingdeaths reload</code>
            </td>
            <td>
              <code>echoingdeaths.reload</code>
            </td>
            <td>
              Reloads <code>config.yml</code> from disk and confirms in chat.
            </td>
          </tr>
          <tr>
            <td>
              <code>/echoingdeaths info</code>
            </td>
            <td>
              <code>echoingdeaths.admin</code>
            </td>
            <td>Shows plugin version, author and a short description.</td>
          </tr>
          <tr>
            <td>
              <code>/echoingdeaths test &lt;cause&gt;</code>
            </td>
            <td>
              <code>echoingdeaths.admin</code>
            </td>
            <td>
              Players only. Applies the curse configured for{" "}
              <code>&lt;cause&gt;</code> (case-insensitive, uppercased) to
              yourself, including the configured messages, a safe way to
              preview any curse. Unknown causes resolve to the fallback curse.
            </td>
          </tr>
        </tbody>
      </table>
      <blockquote>
        <p>
          <code>&lt;cause&gt;</code> is a Bukkit <code>DamageCause</code> enum
          name such as <code>FALL</code>, <code>LAVA</code> or{" "}
          <code>SONIC_BOOM</code>, the same keys used under{" "}
          <code>effects</code> in config.yml.
        </p>
      </blockquote>

      <h2 id="permissions">Permissions</h2>
      <p>All three nodes default to server operators.</p>
      <table>
        <thead>
          <tr>
            <th>Permission</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>echoingdeaths.admin</code>
            </td>
            <td>
              <code>op</code>
            </td>
            <td>
              Gate for the whole <code>/echoingdeaths</code> command (declared
              on the command in plugin.yml).
            </td>
          </tr>
          <tr>
            <td>
              <code>echoingdeaths.reload</code>
            </td>
            <td>
              <code>op</code>
            </td>
            <td>
              Required for the <code>reload</code> subcommand, checked again at
              execution time.
            </td>
          </tr>
          <tr>
            <td>
              <code>echoingdeaths.bypass</code>
            </td>
            <td>
              <code>op</code>
            </td>
            <td>
              Holders are never cursed by nearby deaths, checked per player
              when a curse spreads.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="permission-flow">Permission flow</h2>
      <ul>
        <li>
          <strong>Base gate:</strong> plugin.yml attaches{" "}
          <code>echoingdeaths.admin</code> to the command itself, so players
          without it can't invoke <code>/echoingdeaths</code> (or{" "}
          <code>/ed</code>) at all.
        </li>
        <li>
          <strong>Reload double-check:</strong> <code>reload</code> re-checks{" "}
          <code>echoingdeaths.reload</code> at execution time, so you can grant
          reload without granting <code>info</code>/<code>test</code> access
          only if you also negate the admin node; by default ops hold both.
        </li>
        <li>
          <strong>Bypass:</strong> <code>echoingdeaths.bypass</code> is checked
          for each nearby player during a death, not at command time. It's the
          node to give to staff you don't want cursed.
        </li>
      </ul>
    </DocsShell>
  );
}
