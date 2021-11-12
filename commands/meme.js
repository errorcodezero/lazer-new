const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Sends epic memes"),
  async execute(interaction) {
    const data = await fetch("http://meme-api.herokuapp.com/gimme/memes").then(
      (res) => res.json()
    );
    const embed = new MessageEmbed()
      .setTitle(data.title)
      .setURL(data.postLink)
      .setImage(data.url)
      .setFooter(data.ups + " upvotes")
      .setTimestamp()
      .setColor("#EC123E");
    await interaction.reply({ embeds: [embed] });
  },
};
