const { greenBright } = require('chalk');
const { status } = require('../config');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(greenBright(`Ready! Logged in as ${client.user.tag}`));
    client.user.setActivity(status, { type: "PLAYING" });
	},
};