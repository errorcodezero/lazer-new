const { SlashCommandBuilder } = require("@discordjs/builders");
const UserModel = require("../models/Users.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("See how much money you have"),
  cooldown: 5,

  async execute(interaction) {
    let user = await UserModel.findOne({
      user_id: interaction.user.id,
    });

    if (!user) {
      user = await UserModel.create({
        user_id: interaction.user.id,
        balance: 0,
      });
      return interaction.reply("Balance: 0\nBank Balance: 0");
    } else {
      user = await UserModel.findOne({
        user_id: interaction.user.id,
      });
      return interaction.reply(
        `Balance: ${user.balance}\nBank Balance: ${user.bank_balance}`
      );
    }
  },
};
