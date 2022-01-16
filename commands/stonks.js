// new DIG.Stonk().getImage(`<Avatar>`);
const { SlashCommandBuilder } = require("@discordjs/builders");
const DIG = require("discord-image-generation");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stonks")
        .setDescription("Use the stonks meme format")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Who should be the stonks person")
                .setRequired(true)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("user")
            const avatar = user.displayAvatarURL({ dynamic: false, format: "png" })
            const img = await new DIG.Stonk().getImage(avatar);
            interaction.reply({ files: [img] })
        }
}