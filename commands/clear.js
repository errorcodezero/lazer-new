const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Mass-delete up to 99 messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Number of messages to prune")
        .setRequired(true)
    ),
  cooldown: 1,
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      return interaction.reply(
        "You do not have enough permissions to use this command"
      );
    }

    if (amount <= 1 || amount > 100) {
      return interaction.reply({
        content: "You need to input a number between 1 and 99.",
        ephemeral: true,
      });
    }
    await interaction.channel.bulkDelete(amount, true).catch((error) => {
      console.error(error);
      interaction.reply({
        content:
          "There was an error trying to delete messages in this channel!",
        ephemeral: true,
      });
    });

    return interaction.reply({
      content: `Deleted ${amount} messages`,
      ephemeral: true,
    });
  },
};
