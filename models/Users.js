const { Schema, model } = require("mongoose");

const Users = Schema({
  user_id: {
    type: String,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
    minimum: 0,
  },
  bank_balance: {
    type: Number,
    default: 0,
    minimum: 0,
  },
});

module.exports = model("Users", Users);
