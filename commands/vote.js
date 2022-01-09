const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { client_id } = require("../config");

module.exports = {
  data: new SlashCommandBuilder().setName("vote").setDescription("vote for me"),
  async execute(interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Vote for me!")
        .setStyle("LINK")
        .setURL(`https://top.gg/bot/${client_id}`)
    );

    const embed = new MessageEmbed().setTitle("Vote for me");

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
