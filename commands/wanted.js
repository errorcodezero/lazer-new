// new DIG.Wanted().getImage(`<Avatar>`, `<Currency>`);
const { SlashCommandBuilder } = require("@discordjs/builders");
const DIG = require("discord-image-generation");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wanted")
        .setDescription("Make a wanted poster for someone")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Who should be on the poster")
                .setRequired(true)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("user")
            const avatar = user.displayAvatarURL({ dynamic: false, format: "png" })
            const img = await new DIG.Wanted().getImage(avatar, '$');
            interaction.reply({ files: [img] })
        }
}