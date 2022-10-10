const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const AdministratorsModel = sequelize.define('serv_administrators', {
    id_responsable: {
      type: Sequelize.INTEGER,
    },
    id_type_user: {
      type: Sequelize.INTEGER,
    },
    id_rol: {
      type: Sequelize.INTEGER,
    },
    adm_name: {
      type: Sequelize.STRING,
    },
    adm_lastName: {
      type: Sequelize.STRING,
    },
    adm_email: {
      type: Sequelize.STRING,
    },
    adm_password: {
      type: Sequelize.STRING,
    },
    adm_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=AdministratorsModel;
  