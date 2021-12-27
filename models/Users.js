const { Schema, model } = require("mongoose");

const Users = Schema({
  user_id: {
    type: String,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Users", Users);
