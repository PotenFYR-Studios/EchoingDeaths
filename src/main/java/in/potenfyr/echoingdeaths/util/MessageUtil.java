package in.potenfyr.echoingdeaths.util;

import in.potenfyr.echoingdeaths.EchoingDeathsPlugin;
import net.md_5.bungee.api.ChatColor;
import net.md_5.bungee.api.ChatMessageType;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.entity.Player;

public class MessageUtil {

    /**
     * Sends normal chat message.
     */
    public static void sendChat(
            Player player,
            String message
    ) {

        if (message == null || message.isEmpty()) {
            return;
        }

        player.sendMessage(
                color(message)
        );
    }

    /**
     * Sends actionbar message.
     */
    public static void sendActionbar(
            Player player,
            String message
    ) {

        if (message == null || message.isEmpty()) {
            return;
        }

        player.spigot().sendMessage(
                ChatMessageType.ACTION_BAR,
                new TextComponent(
                        color(message)
                )
        );
    }

    /**
     * Sends title/subtitle.
     */
    public static void sendTitle(
            EchoingDeathsPlugin plugin,
            Player player,
            String title,
            String subtitle
    ) {

        int fadeIn =
                plugin.getConfig()
                        .getInt("messages.title.fade-in");

        int stay =
                plugin.getConfig()
                        .getInt("messages.title.stay");

        int fadeOut =
                plugin.getConfig()
                        .getInt("messages.title.fade-out");

        player.sendTitle(
                color(title),
                color(subtitle),
                fadeIn,
                stay,
                fadeOut
        );
    }

    /**
     * Replaces placeholders.
     */
    public static String replacePlaceholders(
            String text,
            String playerName,
            String cause
    ) {

        if (text == null) {
            return "";
        }

        return text
                .replace("%player%", playerName)
                .replace("%cause%", cause);
    }

    /**
     * Converts color codes.
     */
    public static String color(String text) {

        return ChatColor.translateAlternateColorCodes(
                '&',
                text
        );
    }
}