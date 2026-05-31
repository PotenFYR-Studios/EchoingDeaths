package in.potenfyr.echoingdeaths.manager;

import in.potenfyr.echoingdeaths.EchoingDeathsPlugin;
import in.potenfyr.echoingdeaths.model.DeathEffectData;
import org.bukkit.Sound;
import org.bukkit.configuration.ConfigurationSection;
import org.bukkit.entity.Player;
import org.bukkit.potion.PotionEffect;
import org.bukkit.potion.PotionEffectType;

import java.util.ArrayList;
import java.util.List;

public class EffectManager {

    private final EchoingDeathsPlugin plugin;

    public EffectManager(EchoingDeathsPlugin plugin) {
        this.plugin = plugin;
    }

    public DeathEffectData getEffectData(String cause) {

        ConfigurationSection section =
                plugin.getConfig()
                        .getConfigurationSection("effects." + cause);

        if (section == null) {

            section = plugin.getConfig()
                    .getConfigurationSection("fallback");
        }

        String displayName =
                section.getString(
                        "display-name",
                        "Unknown"
                );

        int duration =
                section.getInt("duration-seconds");

        int amplifier =
                section.getInt("amplifier");

        List<PotionEffectType> effects =
                new ArrayList<>();

        for (String effect :
                section.getStringList("potion-effects")) {

            PotionEffectType type =
                    PotionEffectType.getByName(effect);

            if (type != null) {
                effects.add(type);
            }
        }

        return new DeathEffectData(
                displayName,
                duration,
                amplifier,
                effects
        );
    }

    public void applyEffects(
            Player player,
            DeathEffectData data
    ) {

        for (PotionEffectType type :
                data.getEffects()) {

            player.addPotionEffect(
                    new PotionEffect(
                            type,
                            data.getDurationSeconds() * 20,
                            data.getAmplifier()
                    )
            );
        }

        if (plugin.getConfig()
                .getBoolean("display.sound-enabled")) {

            try {

                Sound sound =
                        Sound.valueOf(
                                plugin.getConfig()
                                        .getString(
                                                "display.sound.type"
                                        )
                        );

                player.playSound(
                        player.getLocation(),
                        sound,
                        (float) plugin.getConfig()
                                .getDouble(
                                        "display.sound.volume"
                                ),
                        (float) plugin.getConfig()
                                .getDouble(
                                        "display.sound.pitch"
                                )
                );

            } catch (Exception ignored) {
            }
        }
    }
}