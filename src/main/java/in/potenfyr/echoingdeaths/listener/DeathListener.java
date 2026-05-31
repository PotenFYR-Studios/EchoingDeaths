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

        if (!plugin.getConfig()
                .getBoolean("settings.enabled")) {
            return;
        }

        Player dead = event.getEntity();

        World world = dead.getWorld();

        if (plugin.getConfig()
                .getStringList("settings.ignored-worlds")
                .contains(world.getName())) {
            return;
        }

        EntityDamageEvent lastDamage =
                dead.getLastDamageCause();

        String mappedCause = mapCause(lastDamage);

        DeathEffectData data =
                plugin.getEffectManager()
                        .getEffectData(mappedCause);

        double radius =
                plugin.getConfig()
                        .getDouble("settings.radius");

        for (Player nearby :
                world.getPlayers()) {

            if (nearby.equals(dead)) {
                continue;
            }

            if (nearby.getLocation()
                    .distance(dead.getLocation()) > radius) {
                continue;
            }

            if (nearby.hasPermission(
                    "echoingdeaths.bypass")) {
                continue;
            }

            if (!plugin.getConfig()
                    .getBoolean("settings.affect-creative")
                    && nearby.getGameMode() == GameMode.CREATIVE) {
                continue;
            }

            if (!plugin.getConfig()
                    .getBoolean("settings.affect-spectator")
                    && nearby.getGameMode() == GameMode.SPECTATOR) {
                continue;
            }

            plugin.getEffectManager()
                    .applyEffects(nearby, data);

            sendEffects(dead, nearby, data);
        }
    }

    private void sendEffects(
            Player dead,
            Player nearby,
            DeathEffectData data
    ) {

        String cause = data.getDisplayName();

        if (plugin.getConfig()
                .getBoolean("display.chat-message")) {

            for (String line :
                    plugin.getConfig()
                            .getStringList("messages.chat")) {

                MessageUtil.sendChat(
                        nearby,
                        line.replace(
                                        "%player%",
                                        dead.getName()
                                )
                                .replace(
                                        "%cause%",
                                        cause
                                )
                );
            }
        }

        if (plugin.getConfig()
                .getBoolean("display.actionbar-message")) {

            for (String line :
                    plugin.getConfig()
                            .getStringList("messages.actionbar")) {

                MessageUtil.sendActionbar(
                        nearby,
                        line.replace(
                                        "%player%",
                                        dead.getName()
                                )
                                .replace(
                                        "%cause%",
                                        cause
                                )
                );
            }
        }

        if (plugin.getConfig()
                .getBoolean("display.title-message")) {

            String titleText =
                    plugin.getConfig()
                            .getString("messages.title.title");

            String subtitleText =
                    plugin.getConfig()
                            .getString("messages.title.subtitle");

            titleText = MessageUtil.replacePlaceholders(
                    titleText,
                    dead.getName(),
                    cause
            );

            subtitleText = MessageUtil.replacePlaceholders(
                    subtitleText,
                    dead.getName(),
                    cause
            );

            MessageUtil.sendTitle(
                    plugin,
                    nearby,
                    titleText,
                    subtitleText
            );
        }
    }

    private String mapCause(EntityDamageEvent damage) {

        if (damage == null) {
            return "UNKNOWN";
        }

        return switch (damage.getCause()) {

            case FALL -> "FALL";

            case LAVA -> "LAVA";

            case FIRE, FIRE_TICK ->
                    "FIRE";

            case DROWNING ->
                    "DROWNING";

            case VOID ->
                    "VOID";

            case MAGIC ->
                    "MAGIC";

            case WITHER ->
                    "WITHER";

            case ENTITY_EXPLOSION,
                 BLOCK_EXPLOSION ->
                    "EXPLOSION";

            case FREEZE ->
                    "FREEZE";

            case LIGHTNING ->
                    "LIGHTNING";

            case POISON ->
                    "POISON";

            case STARVATION ->
                    "STARVATION";

            case SUFFOCATION ->
                    "SUFFOCATION";

            case SONIC_BOOM ->
                    "SONIC_BOOM";

            case THORNS ->
                    "THORNS";

            case CONTACT ->
                    "CONTACT";

            default -> "UNKNOWN";
        };
    }
}