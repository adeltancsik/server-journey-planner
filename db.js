const timezone = "Europe/Vilnius";
require("moment").tz.setDefault(timezone);

const Sequelize = require("sequelize");
const databaseUrl = "postgres://postgres:secret@localhost:5432/postgres";

const db = new Sequelize(databaseUrl, {
  timezone: timezone
});

db.sync({ force: false })
  .then(() => console.log("The database has been set up!!"))
  .catch(err =>
    console.error("Oops.. Something happend while syncing w database: ", err)
  );

module.exports = db;
