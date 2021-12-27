const UserModel = require("../models/Users.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("Withdraw some money from the bank")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of money to withdraw")
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = interaction.options.getNumber("amount");
    if (amount % 1 != 0 || amount <= 0)
      return interaction.reply("Withdraw amount must be a whole number");
    try {
      if (amount > UserModel.bank)
        return interation.reply(
          `You don't have that amount of coins to withdraw`
        );
      await UserModel.findOneAndUpdate(
        {
          user_id: interaction.user.id,
        },
        {
          $inc: {
            balance: amount,
            bank_balance: -amount,
          },
        }
      );

      return interaction.reply(
        `You withdrew ${amount} of coins from your bank`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
