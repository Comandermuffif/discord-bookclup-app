import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { bookStorage } from "../db";

export const data = new SlashCommandBuilder()
  .setName("remove")
  .setDescription("Remove a book")
  .addStringOption((option) =>
    option
      .setName("id")
      .setDescription("Short ID for the book")
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.guildId) {
    return interaction.reply({
      ephemeral: true,
      content: "No guild ID provided",
    });
  }

  return interaction.reply({
    ephemeral: true,
    content: "Not implemented",
  });
}