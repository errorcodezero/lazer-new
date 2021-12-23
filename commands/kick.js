const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Allows the admin or owner to kick the member.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The person who you want to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason to kick member")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has("KICK_MEMBERS"))
      return interaction.reply({
        content: "You do not have enough permissions to use this command.",
        ephemeral: true,
      });

    const user = interaction.options.getUser("user");
    const member =
      interaction.guild.members.cache.get(user.id) ||
      (await interaction.guild.members.fetch(user.id).catch((err) => {}));

    if (!member)
      return interaction.reply(
        "Unable to get details related to given member."
      );
    const reason = interaction.options.getString("reason");

    if (!member.kickable)
      return interaction.reply("I am unable to kick this member.");

    if (
      interaction.member.roles.highest.position <= member.roles.highest.position
    )
      return interaction.reply(
        "Given that the member has a higher or equal rank as you, I cannot kick them."
      );

    const embed = new MessageEmbed()
      .setDescription(
        `**${member.user.tag}** is kicked out from the server for \`${reason}\``
      )
      .setColor("BLURPLE")
      .setFooter("Get kicked nerd")
      .setTimestamp();

    member.kick(reason);

    return interaction.reply({ embeds: [embed] });
  },
};
