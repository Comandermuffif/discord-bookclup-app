import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Book, bookStorage } from "../db";
import { logger } from "../utils/logger";

export const data = new SlashCommandBuilder()
  .setName("add")
  .setDescription("Add a new book")
  .addStringOption((option) =>
    option.setName("key")
      .setDescription("Short ID for the book")
      .setRequired(true))
  .addStringOption((option) =>
    option.setName("name")
      .setDescription("Name of the book")
      .setRequired(true))
  .addNumberOption((option) =>
    option.setName("sections")
      .setDescription("Number of progress sections in this book")
      .setMinValue(1)
      .setRequired(true));

export async function execute(interaction: CommandInteraction) {
  logger.info("Add book called", interaction.options.get("key")?.value);

  if (!interaction.guildId) { return interaction.reply("Error") };

  const book = new Book(
    interaction.options.get("key")?.value as string,
    interaction.options.get("name")?.value as string,
    interaction.options.get("sections")?.value as number,
  );

  bookStorage.addBook(interaction.guildId, book);

  return interaction.reply("Book Added");
}