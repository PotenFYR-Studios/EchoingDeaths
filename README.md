

<!-- ========================================================= -->

<!--                      BANNER IMAGE                         -->

<!-- ========================================================= -->

<p align="center">
  <img src="./res/banner_ed.png" alt="EchoingDeaths Banner">
</p>

<p align="center">
  <b>Death leaves a curse behind.</b>
</p>

<p align="center">

  <img alt="Minecraft" src="https://img.shields.io/badge/Minecraft-26.1+-brightgreen">

  <img alt="Loader" src="https://img.shields.io/badge/Platform-Spigot%20%7C%20Paper%20%7C%20Purpur-orange">

</p>

---

# ✨ Features

EchoingDeaths adds immersive death-based curses to nearby players.

Whenever a player dies, nearby players receive temporary debuffs themed around the cause of death.

Examples:

* 🔥 Burn deaths spread weakness and hunger
* 💥 Explosions cause nausea
* 🌊 Drowning inflicts fatigue
* 🕳 Void deaths spread darkness
* ⚡ Lightning deaths shock nearby players

---

# ⚙️ Supported Platforms

* Spigot
* Paper
* Purpur

---

# 🧩 Supported Versions

* 26.1.x+
* Forward compatible toward future Bukkit revisions

---

# 📦 Installation

1. Download the plugin jar
2. Place it into:

```text
/plugins/
```

3. Restart your server
4. Configure:

```text
plugins/EchoingDeaths/config.yml
```

---

# 🛠 Commands

| Command                       | Description             |
| ----------------------------- | ----------------------- |
| `/echoingdeaths reload`       | Reload configuration    |
| `/echoingdeaths info`         | Show plugin information |
| `/echoingdeaths test <cause>` | Test death effects      |
| `/ed`                         | Command alias           |

---

# 🔐 Permissions

| Permission             | Description             |
| ---------------------- | ----------------------- |
| `echoingdeaths.admin`  | Access admin commands   |
| `echoingdeaths.reload` | Reload plugin config    |
| `echoingdeaths.bypass` | Immune to curse effects |

---

# ☠ Death Causes

EchoingDeaths supports configurable Bukkit death causes.

Examples:

```yaml
FIRE:
FIRE_TICK:
LAVA:
FALL:
VOID:
SONIC_BOOM:
DROWNING:
FREEZE:
EXPLOSION:
LIGHTNING:
MAGIC:
WITHER:
HOT_FLOOR:
DRAGON_BREATH:
PROJECTILE:
ENTITY_ATTACK:
```

All effects are configurable directly inside:

```text
config.yml
```

---

# 🧪 Example Effect Configuration

```yaml
FIRE:

  display-name: "Fire"

  duration-seconds: 8

  amplifier: 1

  potion-effects:
    - WEAKNESS
    - HUNGER
```

---

# 💬 Display Features

EchoingDeaths supports:

* Chat messages
* Actionbar messages
* Titles
* Sounds

All fully configurable.

---

# 🌍 World Support

Supports:

* Per-world disabling
* Creative bypass
* Spectator bypass
* Permission bypasses

---

# ⚡ Performance

Designed to be:

* Lightweight
* Async-safe
* NMS-free
* Bukkit-only
* Multi-loader compatible

No packet manipulation.
No version-specific internals.

---

# 📁 Configuration

The plugin automatically generates:

```text
plugins/EchoingDeaths/config.yml
```

with fully documented settings.

---

# 🔧 Developer Notes

Built using:

* Java 21
* Spigot API
* Pure Bukkit architecture

No:

* NMS
* Reflection
* CraftBukkit internals

This improves:

* stability
* compatibility
* forward support

---

# ❤️ Planned Features

* Custom particles
* Per-effect sounds
* PlaceholderAPI support
* Region support
* Totem interaction support
* Custom effect stacking
* MythicMobs compatibility

---

# 📜 License

MIT License

---

# 👤 Author

Developed by **Potenfyr**
