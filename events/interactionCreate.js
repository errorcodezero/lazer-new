const { blueBright, redBright } = require("chalk");
module.exports = {
  name: "interactionCreate",
  execute(interaction, client) {
    console.log(
      blueBright(
        `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
      )
    );
    client.shard
      .fetchClientValues("guilds.cache.size")
      .then((results) => {
        console.log(
          `${results.reduce(
            (acc, guildCount) => acc + guildCount,
            0
          )} total guilds`
        );
      })
      .catch(console.error);

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.execute(interaction);
    } catch (error) {
      console.error(redBright(error));
      return interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
