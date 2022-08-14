const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const forgotPasswords = sequelize.define('serv_forgot_passwords',{
  user_id: {
    type: Sequelize.INTEGER,
  },
  code: {
    type: Sequelize.STRING,
  },
});
module.exports = forgotPasswords;
