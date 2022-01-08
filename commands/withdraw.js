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
  cooldown: 5,
  async execute(interaction) {
    const amount = interaction.options.getNumber("amount");
    let user = await UserModel.findOne({ user_id: interaction.user.id });
    if (amount % 1 != 0 || amount <= 0)
      return interaction.reply("Withdraw amount must be a whole number");
    try {
      if (!user) {
        user = UserModel.create({
          user_id: interaction.user.id,
          balence: 0,
          bank_balence: 0,
        });

        return interaction.reply(
          "You don't have that amount of coins to withdraw"
        );
      }

      if (amount > user.bank_balance || user.bank_balance < 0)
        return interaction.reply(
          `You don't have that amount of coins to withdraw`
        );
      await UserModel.updateOne(
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
