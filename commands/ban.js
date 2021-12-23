const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Allows the admin or owner to ban the member.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The person who you want to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason to ban member")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has("BAN_MEMBERS"))
      return interaction.reply({
        content: "You do not have enough permissions to use this command.",
        ephemeral: true,
      });

    const user = interaction.options.getUser("user");
    const member =
      interaction.guild.members.cache.get(user.id) ||
      (await interaction.guild.members.fetch(user.id).catch((err) => {}));

    if (!member)
      return interaction.reply("I am unable to get details about this member.");
    const reason = interaction.options.getString("reason");

    if (!member.bannable || member.user.id === interaction.user.id)
      return interaction.reply("I am unable to ban this member.");

    if (
      interaction.member.roles.highest.position <= member.roles.highest.position
    )
      return interaction.reply(
        "Given member has a higher or equal role as you so I cannot ban them."
      );

    const embed = new MessageEmbed()
      .setDescription(
        `**${member.user.tag}** is banned from the server for \`${reason}\``
      )
      .setColor("PURPLE")
      .setFooter("Get banned nerd")
      .setTimestamp();

    member.ban({ reason });

    return interaction.reply({ embeds: [embed] });
  },
};
