const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");

const Journey = db.define("journey", {
  name: Sequelize.STRING,
  country: Sequelize.STRING,
  startDate: Sequelize.DATEONLY
});

Journey.belongsTo(User);
User.hasMany(Journey);

module.exports = Journey;
