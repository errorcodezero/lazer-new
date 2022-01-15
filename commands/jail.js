// new DIG.Jail().getImage(`<Avatar>`);
const { SlashCommandBuilder } = require("@discordjs/builders");
const DIG = require("discord-image-generation");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("jail")
        .setDescription("Put someone in jail")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Who do you want to put in jail")
                .setRequired(true)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("user")
            const avatar = user.displayAvatarURL({ dynamic: false, format: "png" })
            const img = await new DIG.Jail().getImage(avatar);
            interaction.reply({ files: [img] })
        }
}