const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { client_id } = require("../config");
const randomHex = require('random-hex');

module.exports = {
  data: new SlashCommandBuilder().setName("vote").setDescription("Click the button!"),
  async execute(interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Vote for me!")
        .setStyle("LINK")
        .setURL(`https://top.gg/bot/${client_id}`)
    );

    const embed = new MessageEmbed().setTitle("Vote for me").setColor(randomHex.generate()),;

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
