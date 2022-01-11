const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Join our support server!"),
  execute(interaction) {
    interaction.reply(
      "Check out our support server: https://discord.gg/pvxnHjNFcT"
    );
  },
};
