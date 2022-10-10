const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const TypeUsersModel = sequelize.define('serv_type_users', {
    tyUsr_name: {
        type: Sequelize.STRING,
    },
    tyUsr_state: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
  });
  module.exports=TypeUsersModel;
  