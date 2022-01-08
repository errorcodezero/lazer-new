const { SlashCommandBuilder } = require("@discordjs/builders");
const UserModel = require("../models/Users.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for some coins"),
  cooldonw: 30,
  async execute(interaction) {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    let user = await UserModel.findOne({ user_id: interaction.user.id });
    if (!user) {
      user = await UserModel.create({
        user_id: interaction.user.id,
        balance: randomNumber,
      });
      return interaction.reply(
        `You begged and received ${randomNumber} coins!`
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
