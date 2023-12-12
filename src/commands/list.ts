import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { bookStorage } from "../db";
import { Section } from "../db/models";

export const data = new SlashCommandBuilder()
  .setName("list")
  .setDescription("List books")
  .addSubcommand((subcommand) => 
    subcommand
      .setName("all")
      .setDescription("List all books"))
  .addSubcommand((subcommand) => 
    subcommand
      .setName("reading")
      .setDescription("List Books you are currently reading"));

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

  const books = await bookStorage.listBooks(interaction.guildId);
  const sections = new Map<number, Section[]>();
  const allSections = new Array<Section>();

  await Promise.all(books.map(async (book) => {      
    if (!book.id) { return; }
    const bookSections = await bookStorage.listSections(book.id);
    if (!bookSections) { return; }
    sections.set(book.id, bookSections);
    allSections.push(...bookSections);
  }));

  if (interaction.options.getSubcommand(true) == "all") {  
    return interaction.reply({
      ephemeral: true,
      content: [
        "# Books",
        ...books.map((book) => {
          if (!book.id) { return; }
          const bookSections = sections.get(book.id);
          if (!bookSections) { return; }
          return [
            `- ${book.name}`,
            ...bookSections.map((section) => {
              return `  - ${section.order} - ${section.description}`;
            })
          ].join("\n");
        }),
      ].join("\n"),
    });
  }

  if (interaction.options.getSubcommand(true) == "reading") {
    const progresses = await bookStorage.listProgressByUser(interaction.user.id);
  
    return interaction.reply({
      ephemeral: true,
      content: [
        "# Progresses",
        ...progresses.map((x) => {
            const section = allSections.find((y) => y.id == x.section_id);
            if (!section) { return "no section"; }
            const book = books.find((y) => y.id === section.book_id);
            if (!book || !book.id) { return "no book"; }
            return `- ${book.name} - ${section.description}`;
        })
      ].join("\n"),
    });
  }
  
  return interaction.reply({
    ephemeral: true,
    content: "Not implemented",
  });
}
