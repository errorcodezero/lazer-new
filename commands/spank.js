// new DIG.Spank().getImage(`<Avatar>`, `<Avatar2>`);
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spank")
    .setDescription("Spank a bad user")
    .addUserOption((option) =>
        option
            .setName("user")
            .setDescription("Who should be spanked")
            .setRequired(true)
    ),
    cooldown: 1,
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const img = await new DIG.Spank().getImage(interaction.user, user);
        interaction.reply({ files: [img] })
    }
};
