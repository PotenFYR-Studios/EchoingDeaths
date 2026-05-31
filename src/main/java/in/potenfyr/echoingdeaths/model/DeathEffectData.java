package in.potenfyr.echoingdeaths.model;

import org.bukkit.potion.PotionEffectType;

import java.util.List;

public class DeathEffectData {

    private final String displayName;

    private final int durationSeconds;

    private final int amplifier;

    private final List<PotionEffectType> effects;

    public DeathEffectData(
            String displayName,
            int durationSeconds,
            int amplifier,
            List<PotionEffectType> effects
    ) {
        this.displayName = displayName;
        this.durationSeconds = durationSeconds;
        this.amplifier = amplifier;
        this.effects = effects;
    }

    public String getDisplayName() {
        return displayName;
    }

    public int getDurationSeconds() {
        return durationSeconds;
    }

    public int getAmplifier() {
        return amplifier;
    }

    public List<PotionEffectType> getEffects() {
        return effects;
    }
}