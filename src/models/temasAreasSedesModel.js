const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const ThemeAreaHeadquartersModel = sequelize.define('serv_theme_area_headquarters', {
    id_area_campus: {
      type: Sequelize.INTEGER,
    },
    id_theme: {
      type: Sequelize.INTEGER,
    },
    thmArsHdq_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=ThemeAreaHeadquartersModel;
  