const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ship")
    .setDescription("Ship two people together")
    .addStringOption((option) =>
      option
        .setName("user1")
        .setDescription("First person to ship")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("user2")
        .setDescription("Second person to ship")
        .setRequired(true)
    ),
  async execute(interaction) {
    interaction.reply(
      `${interaction.options.getString(
        "user1"
      )} :heart: ${interaction.options.getString(
        "user2"
      )}\nShip Quality: ${Math.round(Math.random() * 100)}%`
    );
  },
};
