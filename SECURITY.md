# Security Policy

## Supported versions

| Version | Branch | Supported |
| --- | --- | --- |
| 0.1.0-alpha | `master` | ✅ |

Only the latest release on `master` receives security fixes.

## Reporting a vulnerability

**Do not open a public issue for a security problem.**

Preferred channels, in order:

1. **GitHub private vulnerability advisory**: use the
   [*Report a vulnerability*](https://github.com/PotenFYR-Studios/EchoingDeaths/security/advisories/new)
   button on this repository
2. **Email**: [support@potenfyr.in](mailto:support@potenfyr.in) with
   "EchoingDeaths security" in the subject
3. **Discord**: join the [support server](https://discord.com/invite/zUaN2FPBec)
   and DM a maintainer

Please include:

- Plugin version (from `/echoingdeaths info` or the jar name)
- Server software and version (Spigot / Paper / Purpur, MC version)
- A description of the impact and, if possible, reproduction steps
- Any relevant config snippets (redact anything private)

## What to expect

- Acknowledgement within **7 days**
- A fix or mitigation target for confirmed issues, coordinated with you
- Credit in the release notes unless you prefer to stay anonymous

## Scope notes

EchoingDeaths runs server-side only (no client mod), exposes one command tree
gated by `echoingdeaths.admin` / `echoingdeaths.reload`, and applies vanilla
potion effects to players. Areas of interest include permission bypasses,
config parsing and message/placeholder injection.
