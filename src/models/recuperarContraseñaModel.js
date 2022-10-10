const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const forgotPasswords = sequelize.define('serv_forgot_passwords',{
  user_id: {
    type: Sequelize.INTEGER,
  },
  code: {
    type: Sequelize.STRING,
  },
});
module.exports = forgotPasswords;
