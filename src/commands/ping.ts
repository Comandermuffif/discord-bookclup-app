import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { logger } from "../utils/logger";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction) {
  logger.info("Ping called");
  return interaction.reply("Pong!");
}