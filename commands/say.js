const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("What should the bot say")
    .addStringOption((option) =>
      option.setName("text").setDescription("What to say").setRequired(true)
    ),
  cooldown: 3,
  async execute(interaction) {
    interaction.reply(interaction.options.getString("text"));
  },
};
