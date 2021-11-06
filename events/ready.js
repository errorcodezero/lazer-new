const { greenBright } = require('chalk');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(greenBright(`Ready! Logged in as ${client.user.tag}`));
	},
};