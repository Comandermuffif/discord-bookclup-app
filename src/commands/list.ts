import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { bookStorage } from "../db";

export const data = new SlashCommandBuilder()
  .setName("list")
  .setDescription("List books");

export async function autocomplete(interaction: AutocompleteInteraction) {
  throw new Error('Not implemented');
};

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.guildId) {
    return interaction.reply({
      ephemeral: true,
      content: "No guild ID provided",
    });
  }

  const guildBooks = await bookStorage.listBooks(interaction.guildId);

  return interaction.reply({
    ephemeral: true,
    content: `# Books:${guildBooks.map((x) => `\n- ${x.name}`)}`,
  });
}
