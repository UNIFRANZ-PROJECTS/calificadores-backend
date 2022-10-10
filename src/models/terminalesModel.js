const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const TerminalsModel = sequelize.define('serv_terminals', {
    id_administrator: {
      type: Sequelize.INTEGER,
    },
    trm_serie: {
      type: Sequelize.STRING,
    },
    trm_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=TerminalsModel;
  