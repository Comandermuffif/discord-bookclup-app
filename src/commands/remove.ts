import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { bookStorage } from "../db";

export const data = new SlashCommandBuilder()
  .setName("remove")
  .setDescription("Remove a book")
  .addStringOption((option) =>
    option.setName("key")
      .setDescription("Short ID for the book")
      .setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.guildId) {
    return interaction.reply({
      ephemeral: true,
      content: "No guild ID provided",
    });
  };

  bookStorage.removeBook(interaction.guildId, interaction.options.getString("key", true));
  return interaction.reply({
    ephemeral: true,
    content: "Book removed",
  });
}