// <GuildMember>.timeout(time in seconds, optional reason)
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
        .setName("time")
        .setDescription("Amount of minutes for timeout")
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
        "Given member has a higher or equal role as you so I cannot ban them."
      );

    await member.timeout(
      interaction.options.getNumber("time") * 60000,
      interaction.options.getString("reason")
    );
    const embed = new MessageEmbed()
      .setDescription(
        `**${
          member.user.tag
        }** is timed out from the server for \`${reason}\` for ${interaction.options.getNumber(
          "time"
        )} minutes`
      )
      .setColor("ORANGE")
      .setFooter("Get timed out nerd")
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
