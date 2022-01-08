const { blueBright, redBright } = require("chalk");
const { Collection } = require("discord.js");
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
    const cooldowns = client.cooldowns;

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return interaction.reply(
          `please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing this command.`
        );
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      command.execute(interaction, cooldowns, command, client);
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "There was an error while executing this command",
        ephemeral: true,
      });
    }
  },
};
