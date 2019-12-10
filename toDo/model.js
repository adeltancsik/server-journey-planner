const Sequelize = require("sequelize");
const db = require("../db");
const Journey = require("../journey/model");

const ToDo = db.define("toDo", {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  time: Sequelize.DATE
});

ToDo.belongsTo(Journey);
Journey.hasMany(ToDo);

module.exports = ToDo;
