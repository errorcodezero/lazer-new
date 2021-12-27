const { Schema, model } = require("mongoose");

const Users = Schema({
  user_id: String,
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Users", Users);
