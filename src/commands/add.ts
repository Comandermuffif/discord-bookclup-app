import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Book, bookStorage } from "../db";

export const data = new SlashCommandBuilder()
  .setName("add")
  .setDescription("Add a new book")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("Name of the book")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("link")
      .setDescription("Name of the book")
      .setRequired(false)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.guildId) {
    return interaction.reply({
      ephemeral: true,
      content: "No guild ID provided",
    });
  }

  const book: Book = {
    guild_id: interaction.guildId,
    name: interaction.options.getString("name", true),
  };

  bookStorage.addBook(book);

  return interaction.reply(`Added ${book.name}`);
}
