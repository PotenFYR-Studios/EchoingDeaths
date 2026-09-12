/**
 * EchoingDeaths curse catalog, mirrored from the plugin's default
 * `src/main/resources/config.yml`. Values here must match that file.
 */

export interface Curse {
  /** Bukkit EntityDamageEvent.DamageCause enum mapped in config.yml */
  cause: string;
  /** config.yml display-name */
  displayName: string;
  /** config.yml duration-seconds */
  durationSeconds: number;
  /** config.yml amplifier (0 = Level I) */
  amplifier: number;
  /** config.yml potion-effects (Bukkit PotionEffectType enums) */
  potionEffects: string[];
  /** short flavor line for cards */
  blurb: string;
}

/** The 16 death causes mapped by the default config.yml. */
export const CURSES: Curse[] = [
  {
    cause: "FALL",
    displayName: "Fall",
    durationSeconds: 10,
    amplifier: 1,
    potionEffects: ["SLOWNESS", "WEAKNESS"],
    blurb: "The impact lingers: legs heavy, grip gone.",
  },
  {
    cause: "LAVA",
    displayName: "Lava",
    durationSeconds: 12,
    amplifier: 1,
    potionEffects: ["WEAKNESS", "NAUSEA", "HUNGER"],
    blurb: "The burn spreads as weakness, queasiness and hunger.",
  },
  {
    cause: "FIRE",
    displayName: "Fire",
    durationSeconds: 8,
    amplifier: 1,
    potionEffects: ["WEAKNESS", "HUNGER"],
    blurb: "Flames hollow out strength and appetite nearby.",
  },
  {
    cause: "DROWNING",
    displayName: "Drowning",
    durationSeconds: 10,
    amplifier: 1,
    potionEffects: ["MINING_FATIGUE", "SLOWNESS"],
    blurb: "Waterlogged lungs drag everything around them down.",
  },
  {
    cause: "VOID",
    displayName: "Void",
    durationSeconds: 8,
    amplifier: 0,
    potionEffects: ["DARKNESS", "BLINDNESS"],
    blurb: "The abyss stares back: light dies with the fallen.",
  },
  {
    cause: "MAGIC",
    displayName: "Magic",
    durationSeconds: 12,
    amplifier: 1,
    potionEffects: ["BLINDNESS", "WEAKNESS"],
    blurb: "Arcane backlash blinds and weakens bystanders.",
  },
  {
    cause: "WITHER",
    displayName: "Wither",
    durationSeconds: 10,
    amplifier: 1,
    potionEffects: ["WITHER", "HUNGER"],
    blurb: "Decay echoes outward, rotting flesh and resolve.",
  },
  {
    cause: "EXPLOSION",
    displayName: "Explosion",
    durationSeconds: 8,
    amplifier: 1,
    potionEffects: ["NAUSEA", "WEAKNESS"],
    blurb: "The shockwave leaves nausea and frailty in its ring.",
  },
  {
    cause: "FREEZE",
    displayName: "Freezing",
    durationSeconds: 12,
    amplifier: 1,
    potionEffects: ["SLOWNESS", "WEAKNESS"],
    blurb: "Cold radiates from the fallen, stiffening every joint.",
  },
  {
    cause: "LIGHTNING",
    displayName: "Lightning",
    durationSeconds: 8,
    amplifier: 1,
    potionEffects: ["GLOWING", "NAUSEA"],
    blurb: "The charge marks bystanders: glowing, reeling.",
  },
  {
    cause: "POISON",
    displayName: "Poison",
    durationSeconds: 12,
    amplifier: 1,
    potionEffects: ["POISON", "HUNGER"],
    blurb: "Venom hangs in the air after a poisoned death.",
  },
  {
    cause: "STARVATION",
    displayName: "Starvation",
    durationSeconds: 15,
    amplifier: 0,
    potionEffects: ["HUNGER", "WEAKNESS"],
    blurb: "The empty stomach of the dead gnaws at the living.",
  },
  {
    cause: "SUFFOCATION",
    displayName: "Suffocation",
    durationSeconds: 10,
    amplifier: 1,
    potionEffects: ["BLINDNESS", "SLOWNESS"],
    blurb: "Buried breath returns as darkness and dead weight.",
  },
  {
    cause: "SONIC_BOOM",
    displayName: "Sonic Boom",
    durationSeconds: 8,
    amplifier: 1,
    potionEffects: ["DARKNESS", "WEAKNESS"],
    blurb: "The Warden's blast deafens and dims everything near.",
  },
  {
    cause: "THORNS",
    displayName: "Thorns",
    durationSeconds: 6,
    amplifier: 0,
    potionEffects: ["WEAKNESS"],
    blurb: "A pricked death: brief, barbed weakness.",
  },
  {
    cause: "CONTACT",
    displayName: "Sharp Contact",
    durationSeconds: 6,
    amplifier: 0,
    potionEffects: ["POISON"],
    blurb: "Cactus and berry bush deaths leave a toxic sting.",
  },
];

/** Used when a death cause has no mapped section in config.yml. */
export const FALLBACK_CURSE: Curse = {
  cause: "FALLBACK",
  displayName: "Unknown",
  durationSeconds: 5,
  amplifier: 0,
  potionEffects: ["WEAKNESS"],
  blurb: "Any Bukkit DamageCause without a mapping falls back to this curse.",
};

/** Marquee band of default causes (landing page only). */
export const CAUSE_MARQUEE: string[] = CURSES.map((c) => c.cause);
