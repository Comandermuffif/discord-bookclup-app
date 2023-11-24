import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Book, addBook } from "../db";
import { logger } from "../utils/logger";

export const data = new SlashCommandBuilder()
  .setName("add")
  .setDescription("Add a new book")
  .addStringOption((option) =>
    option.setName("key")
      .setDescription("Short ID for the book")
      .setRequired(true))
  .addStringOption((option) =>
    option.setName("link")
      .setDescription("Link to the book")
      .setRequired(false))
  .addNumberOption((option) =>
    option.setName("sections")
      .setDescription("Number of progress sections in this book")
      .setMinValue(1)
      .setRequired(true));

export async function execute(interaction: CommandInteraction) {
  logger.info("Add book called");
  return interaction.reply("Book Added");
}