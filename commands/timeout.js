const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Allows the admin or owner to give a member a timeout")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The person who you want to give a timeout")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason to timeout member")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("minutes")
        .setDescription("Amount of minutes for timeout")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("hours")
        .setDescription("Amount of minutes for timeout")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("days")
        .setDescription("Amount of days for timeout")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has("MODERATE_MEMBERS"))
      return interaction.reply({
        content: "You do not have enough permissions to use this command.",
      });

    const user = interaction.options.getUser("user");
    const member =
      interaction.guild.members.cache.get(user.id) ||
      (await interaction.guild.members.fetch(user.id).catch((err) => {}));

    if (!member)
      return interaction.reply("I am unable to get details about this member.");
    const reason = interaction.options.getString("reason");

    if (!member.manageable)
      return interaction.reply("I am unable to timeout this member.");
    if (
      interaction.member.roles.highest.position <= member.roles.highest.position
    )
      return interaction.reply(
        "Given member has a higher or equal role as you so I cannot timeout them."
      );

    const time =
      interaction.options.getNumber("minutes") * 60000 +
      interaction.options.getNumber("hours") * 3600000 +
      interaction.options.getNumber("days") * 86400000;
    await member.timeout(time, interaction.options.getString("reason"));
    const embed = new MessageEmbed()
      .setDescription(
        `**${member.user.tag}** is timed out from the server for \`${reason}\` `
      )
      .setColor("ORANGE")
      .setFooter({ text: "Get timed out nerd" })
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
