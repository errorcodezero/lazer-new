const { greenBright, blueBright } = require("chalk");
const { status } = require("../config");
const { top_gg, top_gg_token } = require("../config");
const { AutoPoster } = require("topgg-autoposter");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(greenBright(`Ready! Logged in as ${client.user.tag}`));
    client.user.setActivity(status, { type: "PLAYING" });
  },
};
