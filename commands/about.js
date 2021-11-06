const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Tells you about the bot"),
  async execute(interaction) {
    await interaction.reply("Ok so lemme tell u about me... Nah too lazy");
  },
};
