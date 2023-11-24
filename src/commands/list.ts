import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { bookStorage } from "../db";
import { logger } from "../utils/logger";

export const data = new SlashCommandBuilder()
  .setName("list")
  .setDescription("List all known books");

export async function execute(interaction: CommandInteraction) {
  logger.debug("Listing all books");

  if (!interaction.guildId) { return interaction.reply("Error") };

  let returnString = "Books:";

  bookStorage.listBooks(interaction.guildId).forEach(element => {
    returnString += `\n- [${element.key}] ${element.name}`
  });

  return interaction.reply(returnString);
}