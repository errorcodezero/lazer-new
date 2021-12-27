const { SlashCommandBuilder } = require("@discordjs/builders");
const { findOneAndUpdate } = require("../models/Users.js");
const UserModel = require("../models/Users.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for some coins"),
  async execute(interaction) {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    let user = UserModel.findOneAndUpdate({ user_id: interaction.user.id });
    if (!user) {
      user = await UserModel.create({
        user_id: interaction.user.id,
      });
      return interaction.reply(
        `You seem to be new to this. A wallet has been created for you!`
      );
    } else {
      user = await UserModel.findOneAndUpdate(
        {
          user_id: interaction.user.id,
        },
        {
          $inc: {
            balance: randomNumber,
          },
        }
      );
      return interaction.reply(
        `You begged and received ${randomNumber} coins!`
      );
    }
  },
};
