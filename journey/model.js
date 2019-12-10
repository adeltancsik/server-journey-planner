const Sequelize = require("sequelize");
const db = require("../db");

const Journey = db.define("journey", {
  name: Sequelize.STRING,
  country: Sequelize.STRING
});

module.exports = Journey;
