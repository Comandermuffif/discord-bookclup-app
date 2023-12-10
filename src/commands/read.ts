import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { bookStorage } from "../db";

export const data = new SlashCommandBuilder()
  .setName("read")
  .setDescription("Update book progress")
  .addStringOption((option) =>
    option
      .setName("book")
      .setDescription("Name of the book")
      .setRequired(true)
      .setAutocomplete(true))
  .addNumberOption((option) => 
    option
      .setName("section")
      .setMinValue(0)
      .setRequired(true));

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

  const inputName = interaction.options.getString("book", true);
  const inputSection = interaction.options.getNumber("section", true);

  const books = await bookStorage.listBooks(interaction.guildId);
  const book = books.find(x => x.name == inputName)

  if (!book || !book.id) {
    return interaction.reply({
      ephemeral: true,
      content: `No book found with name ${inputName}`,
    });
  }

  const sections = await bookStorage.listSections(book.id);    
  const section = sections.find((x) => x.order == inputSection);

  if (!section) {
    return interaction.reply({
      ephemeral: true,
      content: `No section found with number ${inputSection}`,
    });
  }

  bookStorage.addProgress({
    id: -1,
    section_id: section.id,
    updated: new Date(Date.now()),
    user_id: interaction.user.id,
  });

  return interaction.reply({
    ephemeral: true,
    content: "Progress updated",
  });
}
