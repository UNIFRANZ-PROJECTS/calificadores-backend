const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const AreaHeadquartersModel = sequelize.define('serv_area_headquarters', {
    id_campus: {
      type: Sequelize.INTEGER,
    },
    id_area: {
        type: Sequelize.INTEGER,
    },
    arsHdq_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=AreaHeadquartersModel;
  