import {
  Apple,
  ArrowDown,
  Bomb,
  CircleHelp,
  Eclipse,
  Flame,
  FlameKindling,
  FlaskConical,
  Skull,
  Shrub,
  Snowflake,
  Sparkles,
  Swords,
  Waves,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Curse } from "../data/curses";

/** Lucide glyph per Bukkit damage cause (visual identity of each curse). */
const CAUSE_ICONS: Record<string, LucideIcon> = {
  FALL: ArrowDown,
  LAVA: FlameKindling,
  FIRE: Flame,
  DROWNING: Waves,
  VOID: Eclipse,
  MAGIC: Sparkles,
  WITHER: Skull,
  EXPLOSION: Bomb,
  FREEZE: Snowflake,
  LIGHTNING: Zap,
  POISON: FlaskConical,
  STARVATION: Apple,
  SUFFOCATION: Wind,
  SONIC_BOOM: Wind,
  THORNS: Shrub,
  CONTACT: Swords,
  FALLBACK: CircleHelp,
};

/** Cause → effect curse card: icon tile, cause tag, effect chain, duration meta. */
export function CurseCard({ curse }: { curse: Curse }) {
  const Icon = CAUSE_ICONS[curse.cause] ?? CircleHelp;
  return (
    <article className="doc-card">
      <div className="flex items-center gap-3">
        <span
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-line-light bg-white/5 transition-transform group-hover:scale-[1.08]"
          style={{ color: "#a78bfa" }}
          aria-hidden
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h3 className="m-0 truncate text-[0.98em] font-[640] text-white">
            {curse.displayName}
          </h3>
          <span className="font-mono text-[0.68em] tracking-[0.08em] text-[#6a7089]">
            {curse.cause === "FALLBACK" ? "fallback" : curse.cause}
          </span>
        </div>
      </div>

      <p className="m-0 text-[0.83em] leading-[1.55] text-[#9aa0b4]">{curse.blurb}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {curse.potionEffects.map((fx) => (
          <span key={fx} className="tag">
            {fx}
          </span>
        ))}
      </div>

      <div
        className="flex items-center gap-3 font-mono text-[0.68em] uppercase tracking-[0.1em]"
        style={{ color: "var(--faint)" }}
      >
        <span>{curse.durationSeconds}s</span>
        <span aria-hidden>·</span>
        <span>amp {curse.amplifier}</span>
        <span aria-hidden>·</span>
        <span>lvl {curse.amplifier + 1}</span>
      </div>
    </article>
  );
}
