import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";
import { logger } from "./utils/logger";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, () => {
  logger.info("Discord bot is ready! 🤖");
});

client.on(Events.GuildCreate, async (guild) => {
  logger.info("Guild create");
  await deployCommands({ guildId: guild.id });
});

client.on(Events.GuildUpdate, async (guild) => {
  logger.info("Guild update");
});

client.on(Events.GuildIntegrationsUpdate, async (guild) => {
  logger.info("Guild Integrations update");
});

client.on(Events.InteractionCreate, async (interaction) => {
  logger.info("Interaction create");
  if (!interaction.isCommand()) {
    logger.info("Interaction is not a command");
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    logger.trace("Running", commandName);
    commands[commandName as keyof typeof commands].execute(interaction);
  } else {
    logger.error("Failed to find command for", commandName);
  }

  logger.trace("Interaction handling complete");
});

client.login(config.DISCORD_TOKEN);
