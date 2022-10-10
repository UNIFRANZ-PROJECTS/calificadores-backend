const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const SurveysModel = sequelize.define('serv_surveys', {
    id_administrator: {
      type: Sequelize.INTEGER,
    },
    id_area_campus: {
      type: Sequelize.INTEGER,
    },
    srv_name: {
      type: Sequelize.STRING,
    },
    srv_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=SurveysModel;
  