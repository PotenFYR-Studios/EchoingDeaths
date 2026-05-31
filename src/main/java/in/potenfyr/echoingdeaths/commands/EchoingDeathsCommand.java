package in.potenfyr.echoingdeaths.command;

import in.potenfyr.echoingdeaths.EchoingDeathsPlugin;
import in.potenfyr.echoingdeaths.model.DeathEffectData;
import in.potenfyr.echoingdeaths.util.MessageUtil;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class EchoingDeathsCommand implements CommandExecutor {

    private final EchoingDeathsPlugin plugin;

    public EchoingDeathsCommand(
            EchoingDeathsPlugin plugin
    ) {
        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(
            CommandSender sender,
            Command command,
            String label,
            String[] args
    ) {

        /*
         * Base command
         */
        if (args.length == 0) {

            sendHelp(sender);

            return true;
        }

        /*
         * Reload command
         */
        if (args[0].equalsIgnoreCase("reload")) {

            if (!sender.hasPermission(
                    "echoingdeaths.reload")) {

                sender.sendMessage(
                        MessageUtil.color(
                                "&cYou do not have permission."
                        )
                );

                return true;
            }

            plugin.reloadConfig();

            sender.sendMessage(
                    MessageUtil.color(
                            "&aEchoingDeaths configuration reloaded."
                    )
            );

            return true;
        }

        /*
         * Plugin info command
         */
        if (args[0].equalsIgnoreCase("info")) {

            sender.sendMessage(
                    MessageUtil.color(
                            "&6&m--------------------------------"
                    )
            );

            sender.sendMessage(
                    MessageUtil.color(
                            "&6EchoingDeaths &7v"
                                    + plugin.getDescription()
                                    .getVersion()
                    )
            );

            sender.sendMessage(
                    MessageUtil.color(
                            "&7Author: &ePotenfyr"
                    )
            );

            sender.sendMessage(
                    MessageUtil.color(
                            "&7Nearby players receive"
                    )
            );

            sender.sendMessage(
                    MessageUtil.color(
                            "&7temporary curses based"
                    )
            );

            sender.sendMessage(
                    MessageUtil.color(
                            "&7on nearby deaths."
                    )
            );

            sender.sendMessage(
                    MessageUtil.color(
                            "&6&m--------------------------------"
                    )
            );

            return true;
        }

        /*
         * Test command
         */
        if (args[0].equalsIgnoreCase("test")) {

            if (!(sender instanceof Player player)) {

                sender.sendMessage(
                        MessageUtil.color(
                                "&cOnly players may use this command."
                        )
                );

                return true;
            }

            if (args.length < 2) {

                player.sendMessage(
                        MessageUtil.color(
                                "&cUsage: /echoingdeaths test <cause>"
                        )
                );

                return true;
            }

            String cause =
                    args[1].toUpperCase();

            DeathEffectData data =
                    plugin.getEffectManager()
                            .getEffectData(cause);

            /*
             * Apply configured effects
             */
            plugin.getEffectManager()
                    .applyEffects(player, data);

            /*
             * Send configured messages
             */
            if (plugin.getConfig()
                    .getBoolean("display.chat-message")) {

                for (String line :
                        plugin.getConfig()
                                .getStringList("messages.chat")) {

                    MessageUtil.sendChat(
                            player,
                            MessageUtil.replacePlaceholders(
                                    line,
                                    player.getName(),
                                    data.getDisplayName()
                            )
                    );
                }
            }

            /*
             * Actionbar
             */
            if (plugin.getConfig()
                    .getBoolean("display.actionbar-message")) {

                for (String line :
                        plugin.getConfig()
                                .getStringList("messages.actionbar")) {

                    MessageUtil.sendActionbar(
                            player,
                            MessageUtil.replacePlaceholders(
                                    line,
                                    player.getName(),
                                    data.getDisplayName()
                            )
                    );
                }
            }

            /*
             * Title
             */
            if (plugin.getConfig()
                    .getBoolean("display.title-message")) {

                String title =
                        plugin.getConfig()
                                .getString(
                                        "messages.title.title"
                                );

                String subtitle =
                        plugin.getConfig()
                                .getString(
                                        "messages.title.subtitle"
                                );

                title =
                        MessageUtil.replacePlaceholders(
                                title,
                                player.getName(),
                                data.getDisplayName()
                        );

                subtitle =
                        MessageUtil.replacePlaceholders(
                                subtitle,
                                player.getName(),
                                data.getDisplayName()
                        );

                MessageUtil.sendTitle(
                        plugin,
                        player,
                        title,
                        subtitle
                );
            }

            player.sendMessage(
                    MessageUtil.color(
                            "&aApplied test effects for cause: &e"
                                    + cause
                    )
            );

            return true;
        }

        /*
         * Unknown subcommand
         */
        sendHelp(sender);

        return true;
    }

    /**
     * Sends help menu.
     */
    private void sendHelp(CommandSender sender) {

        sender.sendMessage(
                MessageUtil.color(
                        "&6&m--------------------------------"
                )
        );

        sender.sendMessage(
                MessageUtil.color(
                        "&6EchoingDeaths Commands"
                )
        );

        sender.sendMessage(
                MessageUtil.color(
                        "&e/echoingdeaths reload &7- Reload config"
                )
        );

        sender.sendMessage(
                MessageUtil.color(
                        "&e/echoingdeaths info &7- Plugin info"
                )
        );

        sender.sendMessage(
                MessageUtil.color(
                        "&e/echoingdeaths test <cause> &7- Test effects"
                )
        );

        sender.sendMessage(
                MessageUtil.color(
                        "&6&m--------------------------------"
                )
        );
    }
}