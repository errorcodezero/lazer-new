const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Gives you an inspirational quote"),
  async execute(interaction) {
    const data = await fetch("https://zenquotes.io/api/random").then((res) =>
      res.json()
    );
    const embed = new MessageEmbed()
      .setTitle('Quote')
      .setColor('BLURPLE')
      .setDescription(data[0]["q"] + " -" + data[0]["a"])
    interaction.reply({ embeds: [embed] });
  },
};
