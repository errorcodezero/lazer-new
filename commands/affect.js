// new DIG.Affect().getImage(`<Avatar>`);
const { SlashCommandBuilder } = require("@discordjs/builders");
const DIG = require("discord-image-generation");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("affect")
        .setDescription("Use the affect meme format on someone")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Who do you want to put in the meme")
                .setRequired(true)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("user")
            const avatar = user.displayAvatarURL({ dynamic: false, format: "png" })
            const img = await new DIG.Affect().getImage(avatar);
            interaction.reply({ files: [img] })
        }
}