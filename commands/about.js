const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const randomHex = require('random-hex');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Tells you about the bot"),
  cooldown: 60,
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setTitle("About Me")
      .setColor(randomHex.generate())
      .setDescription(
        "I was made by a fellow discord user named yeetsquad747. He created me to bring life to the servers and fun."
      );
    await interaction.reply({ embeds: [embed] });
  },
};
