import { ChatInputCommandInteraction, CommandInteraction, Guild, MessagePayload, SlashCommandBuilder } from "discord.js";
import { bookStorage } from "../db";
import { logger } from "../utils/logger";

export const data = new SlashCommandBuilder()
  .setName("list")
  .setDescription("List books")
  .addSubcommand(subcommand =>
    subcommand
      .setName("reading")
      .setDescription("List reading books"))
  .addSubcommand(subcommand =>
    subcommand
      .setName("all")
      .setDescription("List all books"));

export async function execute(interaction: ChatInputCommandInteraction) {
  logger.debug("Listing all books");

  if (!interaction.guildId) { return interaction.reply("Error") };

  if (interaction.options.getSubcommand() == "reading") {
    return interaction.reply({
      ephemeral: true,
      content: `# Books:${bookStorage.getProgresses(interaction.guildId, interaction.user.id).map(x => `\n- ${x.name}\n  - Key: \`${x.key}\`\n  - Sections: \`${x.sections}\``)}`,
    });
  }

  return interaction.reply({
    ephemeral: true,
    content: `# Books:${bookStorage.listBooks(interaction.guildId).map(x => `\n- ${x.name}\n  - Key: \`${x.key}\`\n  - Sections: \`${x.sections}\``)}`,
  });
}