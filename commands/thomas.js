// new DIG.Thomas().getImage(`<Avatar>`);
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("thomas")
    .setDescription("Turn someone into thomas the train")
    .addUserOption((option) =>
        option
            .setName("user")
            .setDescription("Who should be the stonks person")
            .setRequired(true)
    ),
    cooldown: 1,
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const img = await new DIG.Thomas().getImage(user);
        interaction.reply({ files: [img] })
    }
};
