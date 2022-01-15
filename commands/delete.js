const { SlashCommandBuilder } = require("@discordjs/builders");
const DIG = require("discord-image-generation");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("Delete someone")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Who do you want to delete")
                .setRequired(true)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("user")
            const avatar = user.displayAvatarURL({ dynamic: false, format: "png" })
            const img = await new DIG.Delete().getImage(avatar);
            interaction.reply({ files: [img] })
        }
}