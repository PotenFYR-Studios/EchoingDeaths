package in.potenfyr.echoingdeaths;

import in.potenfyr.echoingdeaths.listener.DeathListener;
import in.potenfyr.echoingdeaths.manager.EffectManager;
import org.bukkit.plugin.java.JavaPlugin;
import in.potenfyr.echoingdeaths.command.EchoingDeathsCommand;

public class EchoingDeathsPlugin extends JavaPlugin {

    private static EchoingDeathsPlugin instance;

    private EffectManager effectManager;

    @Override
    public void onEnable() {

        instance = this;

        saveDefaultConfig();

        this.effectManager = new EffectManager(this);

        getServer().getPluginManager().registerEvents(
                new DeathListener(this),
                this
        );

        getCommand("echoingdeaths").setExecutor(
                new EchoingDeathsCommand(this)
        );

        getLogger().info("EchoingDeaths enabled.");
    }

    @Override
    public void onDisable() {
        getLogger().info("EchoingDeaths disabled.");
    }

    public static EchoingDeathsPlugin getInstance() {
        return instance;
    }

    public EffectManager getEffectManager() {
        return effectManager;
    }
}