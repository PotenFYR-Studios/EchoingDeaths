package in.potenfyr.echoingdeaths.listener;

import in.potenfyr.echoingdeaths.EchoingDeathsPlugin;
import in.potenfyr.echoingdeaths.model.DeathEffectData;
import in.potenfyr.echoingdeaths.util.MessageUtil;
import org.bukkit.GameMode;
import org.bukkit.World;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.EntityDamageEvent;
import org.bukkit.event.entity.PlayerDeathEvent;

public class DeathListener implements Listener {

    private final EchoingDeathsPlugin plugin;

    public DeathListener(EchoingDeathsPlugin plugin) {
        this.plugin = plugin;
    }

    @EventHandler
    public void onDeath(PlayerDeathEvent event) {

        /*
         * Plugin disabled
         */
        if (!plugin.getConfig()
                .getBoolean("settings.enabled")) {
            return;
        }

        Player dead = event.getEntity();

        World world = dead.getWorld();

        /*
         * Ignored worlds
         */
        if (plugin.getConfig()
                .getStringList("settings.ignored-worlds")
                .contains(world.getName())) {
            return;
        }

        /*
         * Get actual Bukkit damage cause dynamically
         *
         * Example:
         * FIRE
         * FALL
         * DROWNING
         * SONIC_BOOM
         * HOT_FLOOR
         * etc.
         */
        String mappedCause = mapCause(
                dead.getLastDamageCause()
        );

        /*
         * Load configured effect data
         */
        DeathEffectData data =
                plugin.getEffectManager()
                        .getEffectData(mappedCause);

        double radius =
                plugin.getConfig()
                        .getDouble("settings.radius");

        /*
         * Affect nearby players
         */
        for (Player nearby : world.getPlayers()) {

            /*
             * Ignore dead player
             */
            if (nearby.equals(dead)) {
                continue;
            }

            /*
             * Radius check
             */
            if (nearby.getLocation()
                    .distance(dead.getLocation()) > radius) {
                continue;
            }

            /*
             * Permission bypass
             */
            if (nearby.hasPermission(
                    "echoingdeaths.bypass")) {
                continue;
            }

            /*
             * Creative mode handling
             */
            if (!plugin.getConfig()
                    .getBoolean("settings.affect-creative")
                    && nearby.getGameMode() == GameMode.CREATIVE) {
                continue;
            }

            /*
             * Spectator mode handling
             */
            if (!plugin.getConfig()
                    .getBoolean("settings.affect-spectator")
                    && nearby.getGameMode() == GameMode.SPECTATOR) {
                continue;
            }

            /*
             * Apply effects
             */
            plugin.getEffectManager()
                    .applyEffects(nearby, data);

            /*
             * Send messages
             */
            sendEffects(
                    dead,
                    nearby,
                    data
            );
        }
    }

    /**
     * Sends chat/actionbar/title messages.
     */
    private void sendEffects(
            Player dead,
            Player nearby,
            DeathEffectData data
    ) {

        String cause = data.getDisplayName();

        /*
         * Chat messages
         */
        if (plugin.getConfig()
                .getBoolean("display.chat-message")) {

            for (String line :
                    plugin.getConfig()
                            .getStringList("messages.chat")) {

                MessageUtil.sendChat(
                        nearby,
                        MessageUtil.replacePlaceholders(
                                line,
                                dead.getName(),
                                cause
                        )
                );
            }
        }

        /*
         * Actionbar messages
         */
        if (plugin.getConfig()
                .getBoolean("display.actionbar-message")) {

            for (String line :
                    plugin.getConfig()
                            .getStringList("messages.actionbar")) {

                MessageUtil.sendActionbar(
                        nearby,
                        MessageUtil.replacePlaceholders(
                                line,
                                dead.getName(),
                                cause
                        )
                );
            }
        }

        /*
         * Title messages
         */
        if (plugin.getConfig()
                .getBoolean("display.title-message")) {

            String title =
                    plugin.getConfig()
                            .getString("messages.title.title");

            String subtitle =
                    plugin.getConfig()
                            .getString("messages.title.subtitle");

            title = MessageUtil.replacePlaceholders(
                    title,
                    dead.getName(),
                    cause
            );

            subtitle = MessageUtil.replacePlaceholders(
                    subtitle,
                    dead.getName(),
                    cause
            );

            MessageUtil.sendTitle(
                    plugin,
                    nearby,
                    title,
                    subtitle
            );
        }
    }

    /**
     * Dynamically maps Bukkit DamageCause enums.
     * This allows ANY Bukkit death cause
     * to work automatically from config.yml
     */
    private String mapCause(EntityDamageEvent damage) {

        if (damage == null) {
            return "UNKNOWN";
        }

        return damage.getCause().name();
    }
}