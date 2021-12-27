const { SlashCommandBuilder } = require("@discordjs/builders");
const UserModel = require("../models/Users.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("See how much money you have"),

  async execute(interaction) {
    const user = await UserModel.findOne({ user_id: interaction.user.id });
    interaction.reply(`Balance: ${user.balance}`);
  },
};
