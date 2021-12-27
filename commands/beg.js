const { SlashCommandBuilder } = require("@discordjs/builders");
const { findOneAndUpdate } = require("../models/Users.js");
const UserModel = require("../models/Users.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for some coins"),
  async execute(interaction) {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    // const response = await profileModel.findOneAndUpdate(
    //     {
    //       userID: message.author.id,
    //     },
    //     {
    //       $inc: {
    //         coins: randomNumber,
    //       },
    //     }
    //   );

    // const doc = new UserModel({
    //   user_id: interaction.user.id,
    //   $inc: {
    //     balance: randomNumber,
    //   },
    // });
    // await doc.save();

    const user = await UserModel.findOneAndUpdate(
      {
        user_id: interaction.user.id,
      },
      {
        $inc: {
          balance: randomNumber,
        },
      }
    );
    interaction.reply(`You begged and received ${randomNumber} coins!`);
  },
};
