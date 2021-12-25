// <GuildMember>.timeout(time in seconds, optional reason)
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("untimeout")
    .setDescription(
      "Allows the admin or owner to remove a timeout from a member"
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The person who you want to remove a timeout from")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason to remove timeout member")
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
      return interaction.reply(
        "I am unable to remove timeouts from this member."
      );
    if (
      interaction.member.roles.highest.position <= member.roles.highest.position
    )
      return interaction.reply(
        "Given member has a higher or equal role as you so I cannot remove their timeout them."
      );
    await member.timeout(0, interaction.options.getString("reason"));
    const embed = new MessageEmbed()
      .setDescription(
        `**${member.user.tag}** has had their timeout removed for \`${reason}\``
      )
      .setColor("PURPLE")
      .setFooter("Welcome back to the gang")
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
