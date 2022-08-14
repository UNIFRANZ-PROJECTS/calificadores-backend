const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const RolesModel = sequelize.define('serv_roles', {
    rls_name: {
      type: Sequelize.STRING,
    },
    rls_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=RolesModel;
  