import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Book, bookStorage } from "../db";

export const data = new SlashCommandBuilder()
  .setName("add")
  .setDescription("Add an item")
  .addSubcommand((subcommand) => 
    subcommand
      .setName("book")
      .setDescription("Add a book")
      .addStringOption((option) => 
        option
          .setName("title")
          .setDescription("Name of the book")
          .setRequired(true)
      )
      .addStringOption((option) => 
        option
          .setName("link")
          .setRequired(false)
          .setDescription("Web link to the book")
      )
  )
  .addSubcommand((subcommand) => 
    subcommand
      .setName("section")
      .setDescription("Add a section")
      .addStringOption((option) => 
        option
          .setName("book")
          .setRequired(true)
          .setDescription("Name of the book")
          .setAutocomplete(true)
      )
      .addNumberOption((option) => 
        option
          .setName("order")
          .setRequired(true)
          .setDescription("Order of the section, ascending")
      )
      .addNumberOption((option) => 
        option
          .setName("description")
          .setRequired(false)
          .setDescription("Description of the section")
      )
  );

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

  if (interaction.options.getSubcommand(true) == "book") {
    const interactionTitle = interaction.options.getString("title", true);
    const interactionLink = interaction.options.getString("link", false);

    bookStorage.addBook({
      guild_id: interaction.guildId,
      name: interactionTitle,
      link: interactionLink || '',
    });
  
    return interaction.reply(`Added new book ${interactionTitle}`);
  }

  if (interaction.options.getSubcommand(true) == "section") {
    const interactionTitle = interaction.options.getString("book", true);
    const interactionOrder = interaction.options.getNumber("order", true);
    const interactionDescription = interaction.options.getString("description", false) || '';

    const books = await bookStorage.listBooks(interaction.guildId);
    const book = books.find((x) => x.name == interactionTitle);

    if (!book || !book.id) {
      return interaction.reply({
        ephemeral: true,
        content: `No book with title ${interactionTitle} found`,
      });
    }

    bookStorage.addSection({
      id: -1,
      book_id: book.id,
      order: interactionOrder,
      description: interactionDescription,
    });

    return interaction.reply(`Added new section ${interactionOrder} to ${book.name}`);
  }
}
