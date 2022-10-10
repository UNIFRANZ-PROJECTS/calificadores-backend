const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const PermisionRolesModel = sequelize.define('serv_permision_roles', {
    id_rol: {
      type: Sequelize.INTEGER,
    },
    id_permision: {
      type: Sequelize.INTEGER,
    },
    prmRls_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=PermisionRolesModel;