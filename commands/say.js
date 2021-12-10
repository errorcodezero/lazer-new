const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("What should the bot say")
    .addStringOption((option) =>
      option.setName("text").setDescription("What to say").setRequired(true)
    ),
  async execute(interaction) {
    // interaction.reply(interaction.options.getString("text"));
    interaction.reply(
      "This command was disabled due to an exploit, we are sorry for the inconvenience :(."
    );
  },
};
