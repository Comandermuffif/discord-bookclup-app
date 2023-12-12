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
      .setAutocomplete(true)
  )
  .addNumberOption((option) => 
    option
      .setName("section")
      .setDescription("The section that has been read")
      .setMinValue(0)
      .setRequired(true)
      .setAutocomplete(true)
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
