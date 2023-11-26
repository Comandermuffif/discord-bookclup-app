import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { bookStorage } from "../db";

export const data = new SlashCommandBuilder()
  .setName("list")
  .setDescription("List books")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("reading")
      .setDescription("List reading books"))
  .addSubcommand((subcommand) =>
    subcommand
      .setName("all")
      .setDescription("List all books"));

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.guildId) {
    return interaction.reply({
      ephemeral: true,
      content: "No guild ID provided",
    });
  };

  if (interaction.options.getSubcommand() == "reading") {
    const bookLines = bookStorage.listProgressByUser(interaction.guildId, interaction.user.id)?.map((progress) => {
      const book = bookStorage.getBook(interaction.guildId, progress.bookID);
      if (!book) { return undefined; };
      const sections = bookStorage.listSections(interaction.guildId, book.key);
      const progresses = bookStorage.listProgressByBook(interaction.guildId, book.key);
      return [
        `- [${book.key}] ${book.name}`,
        `  - Progress ${progress.sectionIndex}/${sections.length}`,
        `  - There are ${progresses.length - 1} other readers`,
      ].join("\n");
    });

    return interaction.reply({
      ephemeral: true,
      content: `You are currently reading:\n${bookLines?.join("\n")}`,
    });
  }

  return interaction.reply({
    ephemeral: true,
    content: `# Books:${bookStorage.listBooks(interaction.guildId).map((x) => `\n- ${x.name}\n  - Key: \`${x.key}\`\n  - Sections: \`${x.sections}\``)}`,
  });
}