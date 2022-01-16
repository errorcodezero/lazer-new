// new DIG.LisaPresentation().getImage(`<Text>`);
const { SlashCommandBuilder } = require("@discordjs/builders");
const DIG = require("discord-image-generation");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("presentation")
        .setDescription("Use the lisa presentation meme format")
        .addStringOption((option) =>
            option
                .setName("text")
                .setDescription("What text do you want in your prsentation")
                .setRequired(true)
        ),
        async execute(interaction) {
            const text = interaction.options.getString("text");
            const img = await new DIG.LisaPresentation().getImage(text);
            interaction.reply({ files: [img] })
        }
}