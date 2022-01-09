const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { token, mongo_db_url, top_gg_token } = require("./config");
const { connect } = require("mongoose");
const { magentaBright } = require("chalk");
const { AutoPoster } = require("topgg-autoposter");
const CronJob = require("cron").CronJob;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
  allowedMentions: [(parse = [])],
});

// const ap = AutoPoster(top_gg_token, client);
// ap.on("posted", () => {
//   console.log(magentaBright("Posted stats to Top.gg!"));
// });

// Cooldowns
client.cooldowns = new Collection();

// Cron
const updateStatus = new CronJob("0 * * * * *", function () {
  client.shard
    .fetchClientValues("guilds.cache.size")
    .then((results) => {
      client.user.setActivity(
        `${results.reduce((acc, guildCount) => acc + guildCount, 0)} servers`,
        { type: "WATCHING" }
      );
    })
    .catch(console.error);
});

updateStatus.start();

// Commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Events
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

connect(mongo_db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});
client.login(token);
