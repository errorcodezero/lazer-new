require('dotenv').config();
module.exports = {
    token: process.env.BOT_TOKEN || "",
    client_id: process.env.BOT_CLIENT_ID || "",
    status: process.env.BOT_STATUS || "",
    testing_guild_id: process.env.TESTING_GUILD_ID || "",
}