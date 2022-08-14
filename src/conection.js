const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  database: process.env.DATABASEDB,
  username: process.env.USERDB,
  password: process.env.PASSWORDDB,
  dialect: "mysql",
  host: process.env.HOST,
  timezone: "-04:00",
  logging: false,
  port: 3306,
});
module.exports = sequelize;
