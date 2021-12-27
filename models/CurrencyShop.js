const { Schema, model } = require("mongoose");

const CurrencyShop = Schema({
  name: String,
  cost: Int,
});

module.exports = model("CurrencyShop", CurrencyShop);
