const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const PermisionsModel = sequelize.define('serv_permisions', {
    prm_name: {
      type: Sequelize.STRING,
    },
    prm_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=PermisionsModel;