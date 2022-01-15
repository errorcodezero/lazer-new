const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const randomHex = require("random-hex");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask the magic 8 ball a question")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("What do you want to ask the 8 ball")
        .setRequired(true)
    ),
  execute(interaction) {
    const random = Math.floor(Math.random() * 21) - 1;
    const question = interaction.options.getString("question");
    const ballPhrases = [
      "It is certain",
      "It is decidedly so",
      "Without a doubt",
      "Yes definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Yes",
      "Signs point to yes",
      "Reply hazy, try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again",
      "Don't count on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful",
    ];
    const answer = ballPhrases[random];
    const embed = new MessageEmbed()
      .setTitle(`Question: ${question}`)
      .setDescription(answer)
      .setColor(randomHex.generate());
    interaction.reply({ embeds: [embed] });
  },
};
