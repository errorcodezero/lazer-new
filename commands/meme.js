const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const randomHex = require('random-hex');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Sends epic memes")
    .addBooleanOption((option) =>
      option
        .setName("clean")
        .setDescription("Should the memes be clean")
    ),
  cooldown: 2,
  async execute(interaction) {
    const isClean = interaction.options.getBoolean("clean");
    if(!isClean || isClean == false) {
      const data = await fetch("http://meme-api.herokuapp.com/gimme/memes").then(
        (res) => res.json()
      );
      const embed = new MessageEmbed()
        .setTitle(data.title)
        .setURL(data.postLink)
        .setImage(data.url)
        .setFooter({ text: `${data.ups} upvotes` })
        .setTimestamp()
        .setColor(randomHex.generate());
      await interaction.reply({ embeds: [embed] });
    } else {
      const cleanData = await fetch("http://meme-api.herokuapp.com/gimme/cleanmemes").then(
        (res) => res.json()
      );
      const embed = new MessageEmbed()
        .setTitle(cleanData.title)
        .setURL(cleanData.postLink)
        .setImage(cleanData.url)
        .setFooter({ text: `${cleanData.ups} upvotes` })
        .setTimestamp()
        .setColor(randomHex.generate());
      await interaction.reply({ embeds: [embed] });
    }
  },
};
