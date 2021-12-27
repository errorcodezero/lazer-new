const UserModel = require("../models/Users.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("Deposit some money into the bank")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of money to deposit")
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = interaction.options.getNumber("amount");
    if (amount % 1 != 0 || amount <= 0)
      return interaction.reply("Deposit amount must be a whole number");
    try {
      if (amount > UserModel.coins)
        return interation.reply(
          `You don't have that amount of coins to deposit`
        );
      await UserModel.findOneAndUpdate(
        {
          user_id: interaction.user.id,
        },
        {
          $inc: {
            balance: -amount,
            bank_balence: amount,
          },
        }
      );

      return interaction.reply(
        `You deposited ${amount} of coins into your bank`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
