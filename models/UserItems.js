const { Schema, model } = require("mongoose");

const UserItems = Schema({
  user_item: {
    user_id: {
      type: String,
      unique: true,
    },
    item_id: {
      type: String,
      unique: true,
    },
    amount: {
      default: 0,
      type: Int,
    },
  },
});

module.exports = model("UserItems", UserItems);
