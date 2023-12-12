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
          .setDescription("Name of the book to remove")
          .setRequired(true)
          .setAutocomplete(true)
      )
  )
  .addSubcommand((subcommand) => 
    subcommand
      .setName("section")
      .setDescription("Remove a book section")
      .addStringOption((option) => 
        option
          .setName("book")
          .setDescription("Name of the book to remove a section from")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addNumberOption((option) =>
        option
          .setName("section")
          .setDescription("The section to remove")
          .setMinValue(0)
          .setRequired(true)
          .setAutocomplete(true)
      )
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  if (!interaction.guildId) {
    return interaction.respond([]);
  }

  const focusedOption = interaction.options.getFocused(true);

  if (focusedOption.name == "book") {
    const books = await bookStorage.listBooks(interaction.guildId);
  
    await interaction.respond(books
      .filter((x) => x.name.toLowerCase().startsWith(focusedOption.value.toLowerCase()))
      .map((x) => ({ name: x.name, value: x.name })));
  } else if (focusedOption.name == "section") {
    const inputName = interaction.options.getString("book", true);
    const books = await bookStorage.listBooks(interaction.guildId);
    const book = books.find(x => x.name == inputName)

    if (!book || !book.id) { return; }
    const bookSections = await bookStorage.listSections(book.id);
  
    await interaction.respond(bookSections
      .filter((x) => x.description.toLowerCase().startsWith(focusedOption.value.toLowerCase()))
      .map((x) => ({ name: x.description, value: x.order })));
  } else {
    return interaction.respond([]);
  }
};

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.guildId) {
    return interaction.reply({
      ephemeral: true,
      content: "No guild ID provided",
    });
  }

  const interactionBook = interaction.options.getString("book", true);
  const books = await bookStorage.listBooks(interaction.guildId);
  const book = books.find((x) => x.name == interactionBook);

  if (!book || !book.id) {
    return interaction.reply({
      ephemeral: true,
      content: `No book with title ${interactionBook} found`,
    });
  }

  if (interaction.options.getSubcommand(true) == "book") {    
    await bookStorage.removeBook(book.id);  
    return interaction.reply(`Removed ${interactionBook}`);
  }

  if (interaction.options.getSubcommand(true) == "section") {
    const interactionSection = interaction.options.getNumber("section", true);

    const sections = await bookStorage.listSections(book.id);
    const section = sections.find((x) => x.order == interactionSection);

    if (!section) {
      return interaction.reply({
        ephemeral: true,
        content: `No section found for ${interactionSection} in ${interactionBook}`,
      });
    }

    await bookStorage.removeSection(section.id);
    return interaction.reply(`Removed ${interactionBook}`);
  }

  return interaction.reply({
    ephemeral: true,
    content: "Not implemented",
  });
}