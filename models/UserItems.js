const { Schema, model } = require("mongoose");

const UserItems = Schema({
  user_item: {
    user_id: String,
    item_id: String,
    amount: {
      default: 0,
      type: Int,
    },
  },
});

module.exports = model("UserItems", UserItems);
