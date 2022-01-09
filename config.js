require("dotenv").config();
module.exports = {
  token: process.env.BOT_TOKEN || "",
  status: process.env.BOT_STATUS || "",
  testing_guild_id: process.env.TESTING_GUILD_ID || "",
  client_id: process.env.BOT_CLIENT_ID || "",
  mongo_db_url: process.env.MONGO_DB_URL || "",
  top_gg_token: process.env.TOP_GG_TOKEN || "",
};
