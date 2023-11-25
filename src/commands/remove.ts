import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { bookStorage } from "../db";
import { logger } from "../utils/logger";

export const data = new SlashCommandBuilder()
  .setName("remove")
  .setDescription("Remove a book")
  .addStringOption((option) =>
    option.setName("key")
      .setDescription("Short ID for the book")
      .setRequired(true));

export async function execute(interaction: CommandInteraction) {
  logger.debug("Remove book called", interaction.options.get("key")?.value);

  if (!interaction.guildId) { return interaction.reply("Error") };

  bookStorage.removeBook(interaction.guildId, interaction.options.get("key")?.value as string);

  return interaction.reply("Book removed");
}