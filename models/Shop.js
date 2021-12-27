const { Schema, model } = require("mongoose");

const Shop = Schema({
  name: String,
  cost: Int,
});

module.exports = model("Shop", Shop);
