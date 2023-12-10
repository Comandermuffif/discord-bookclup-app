import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { bookStorage } from "../db";

export const data = new SlashCommandBuilder()
  .setName("remove")
  .setDescription("Remove an item")
  .addSubcommand((subcommand) => 
    subcommand
      .setName("book")
      .setDescription("Remove a book")
      .addStringOption((option) => 
        option
          .setName("book")
          .setRequired(true)
          .setAutocomplete(true)))
  .addSubcommand((subcommand) => 
    subcommand
      .setName("section")
      .setDescription("Remove a book section")
      .addStringOption((option) => 
        option
          .setName("book")
          .setRequired(true)
          .setAutocomplete(true))
      .addNumberOption((option) =>
        option
          .setName("section")
          .setMinValue(0)
          .setRequired(true)));

export async function autocomplete(interaction: AutocompleteInteraction) {
  if (!interaction.guildId) {
    return interaction.respond([]);
  }

  const books = await bookStorage.listBooks(interaction.guildId);

  await interaction.respond(books
    .filter((x) => x.name.startsWith(interaction.options.getFocused()))
    .map((x) => ({ name: x.name, value: x.name })));
};

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