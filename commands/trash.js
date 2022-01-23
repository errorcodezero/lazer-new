// new DIG.Trash().getImage(`<Avatar>`);
const { SlashCommandBuilder } = require("@discordjs/builders");
const DIG = require("discord-image-generation");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("trash")
        .setDescription("See what someone truly is")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("What do you want to see")
                .setRequired(true)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("user")
            const avatar = user.displayAvatarURL({ dynamic: false, format: "png" })
            const img = await new DIG.Trash().getImage(avatar);
            interaction.reply({ files: [img] })
        }
}