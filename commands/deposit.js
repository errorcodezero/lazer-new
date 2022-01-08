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
  cooldown: 5,
  async execute(interaction) {
    const amount = interaction.options.getNumber("amount");
    let user = await UserModel.findOne({ user_id: interaction.user.id });
    if (amount % 1 != 0 || amount <= 0)
      return interaction.reply("Deposit amount must be a whole number");
    try {
      if (!user) {
        user = await UserModel.create({
          user_id: interaction.user.id,
          balence: 0,
          bank_balence: 0,
        });

        return interaction.reply(
          "You don't have that amount of coins to deposit"
        );
      }
      if (amount > user.balance)
        return interaction.reply(
          "You don't have that amount of coins to deposit"
        );
      await UserModel.updateOne(
        {
          user_id: interaction.user.id,
        },
        {
          $inc: {
            balance: -amount,
            bank_balance: amount,
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
