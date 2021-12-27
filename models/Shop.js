const { Schema, model } = require("mongoose");

const Shop = Schema({
  name: String,
  description: String,
  cost: Number,
});

module.exports = model("Shop", Shop);
