# Contributing to EchoingDeaths

Thanks for helping make every death echo a little louder! This guide covers
building the plugin and the docs site, and what to include in a contribution.

## Ways to contribute

- **Bug reports**: [open a bug report](https://github.com/PotenFYR-Studios/EchoingDeaths/issues/new?template=bug_report.yml) with your server version and config
- **Feature ideas**: [start a feature request](https://github.com/PotenFYR-Studios/EchoingDeaths/issues/new?template=feature_request.yml)
- **Documentation**: fix or extend anything under `docs/` ([template](https://github.com/PotenFYR-Studios/EchoingDeaths/issues/new?template=documentation.yml))
- **Code**: pick an open issue, fork, and send a pull request

## Building the plugin

EchoingDeaths is a plain Maven project with no wrapper and no codegen:

```bash
git clone https://github.com/PotenFYR-Studios/EchoingDeaths.git
cd EchoingDeaths
mvn clean package
```

Requirements:

- **JDK 21+** (`maven.compiler.source/target` = 21 in `pom.xml`)
- **Maven 3.x** (not bundled; install via your package manager)
- No other setup needed; the Spigot API dependency resolves from the Spigot snapshot repository

The plugin jar is written to `target/EchoingDeaths-<version>.jar`.

## Working on the docs site

The documentation lives in `docs/` and is built with Bun + Vite + React +
Tailwind v4:

```bash
cd docs
bun install     # once
bun run dev     # dev server with hot reload (http://localhost:5179)
bun run build   # production build -> docs/dist/
```

Content of note:

- `docs/src/data/curses.ts` mirrors the curse table from
  `src/main/resources/config.yml`; **keep them in sync** when changing the
  default config
- `docs/vite.config.ts` holds the per-route SEO table that
  `docs/scripts/emit-pages.mjs` stamps into `dist/<route>/index.html`
- The production bundle is served from `docs/dist/`; never commit that
  directory

## Pull request guidelines

1. Fork the repo and create a feature branch from `master`
2. Keep changes focused: one fix or feature per PR
3. Verify `mvn clean package` succeeds before pushing
4. If your change touches the default `config.yml`, update:
   - the docs pages (`docs/src/pages/`, `docs/src/data/curses.ts`)
   - the curse table on the landing page
5. Describe what changed and why in the PR description; link related issues

## Issue hygiene

- Search [existing issues](https://github.com/PotenFYR-Studios/EchoingDeaths/issues) before opening a new one
- Use the issue templates so we get server/software versions up front
- Security concerns go through [SECURITY.md](SECURITY.md), never public issues

## Licensing

By contributing you agree that your contributions are licensed under the
[Apache License 2.0 with the Commons Clause](LICENSE) that covers this repository.
