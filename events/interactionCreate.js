const { blueBright, redBright } = require("chalk");
const talkedRecently = new Set();

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

    if (talkedRecently.has(interaction.user.id)) {
      interaction.reply(
        "Wait a bit before getting typing this again. - " + interaction.user.tag
      );
    } else {
      // the user can type the command ... your command code goes here :)

      // Adds the user to the set so that they can't talk for a minute
      talkedRecently.add(interaction.user.id);
      setTimeout(() => {
        // Removes the user from the set after a minute
        talkedRecently.delete(interaction.user.id);
      }, 10000);
    }

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
