import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Book, bookStorage } from "../db";

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

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.guildId) {
    return interaction.reply({
      ephemeral: true,
      content: "No guild ID provided",
    });
  };

  const book:Book = {
    key: interaction.options.getString("key", true),
    name: interaction.options.getString("name", true),
    sections: [],
    readers: [],
  };

  bookStorage.addBook(interaction.guildId, book);

  return interaction.reply(`Added ${book.name}`);
}