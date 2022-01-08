const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

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
  cooldown: 4,
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setTimestamp()
      .setTitle("Ship")
      .setFooter("🚢")
      .setColor("GOLD")
      .setDescription(
        `${interaction.options.getString(
          "user1"
        )} :heart: ${interaction.options.getString(
          "user2"
        )}\nShipping Quality: ${Math.round(Math.random() * 100 + 1)}%`
      );
    interaction.reply({ embeds: [embed] });
  },
};
