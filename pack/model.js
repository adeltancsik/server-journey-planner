const Sequelize = require("sequelize");
const db = require("../db");
const Journey = require("../journey/model");

const Pack = db.define("pack", {
  name: Sequelize.STRING,
  done: Sequelize.BOOLEAN
});

Pack.belongsTo(Journey);
Journey.hasMany(Pack);

module.exports = Pack;
